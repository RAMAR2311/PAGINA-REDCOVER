const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_MASTER_PASSWORD || 'admin2026*';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '..')));

// Carpeta donde se guardarán las imágenes optimizadas
const UPLOADS_DIR = path.join(__dirname, '..', 'assets', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configuración de Multer (Almacenar temporalmente en memoria para procesar con Sharp)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // Límite de 15MB por archivo
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

// Inicializar la tabla en PostgreSQL si no existe
async function initDB() {
  const query = `
    CREATE TABLE IF NOT EXISTS redcover_store_state (
      id SERIAL PRIMARY KEY,
      state_key VARCHAR(50) UNIQUE NOT NULL,
      devices JSONB NOT NULL,
      cms_data JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Tabla redcover_store_state verificada/creada en PostgreSQL');
  } catch (err) {
    console.error('❌ Error al inicializar tabla:', err.message);
  }
}

initDB();

// ==========================================
// ENDPOINT: SUBIR Y OPTIMIZAR IMAGEN A WEBP
// ==========================================
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
  try {
    const authHeader = req.headers['x-admin-password'] || req.body.password;
    if (authHeader !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'No autorizado. Contraseña de admin inválida.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo de imagen.' });
    }

    // Nombre único para la imagen WebP
    const fileName = `img-${Date.now()}-${Math.round(Math.random() * 1e5)}.webp`;
    const outputPath = path.join(UPLOADS_DIR, fileName);

    // Procesamiento y optimización con Sharp:
    // - Redimensiona a máximo 1200px de ancho/alto manteniendo proporción
    // - Convierte a formato WebP moderno (82% calidad, compresión visual sin pérdidas perceptibles)
    // - Preserva canal alfa/transparencia de PNGs
    await sharp(req.file.buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const relativeUrl = `assets/uploads/${fileName}`;

    console.log(`📸 Imagen procesada y optimizada: ${fileName} (${Math.round(stats.size / 1024)} KB)`);

    res.json({
      success: true,
      url: relativeUrl,
      sizeBytes: stats.size,
      sizeKB: Math.round(stats.size / 1024)
    });
  } catch (err) {
    console.error('Error al procesar imagen:', err);
    res.status(500).json({ error: 'Error al optimizar imagen: ' + err.message });
  }
});

// ==========================================
// 1. Obtener catálogo y CMS actual
// ==========================================
app.get('/api/catalog', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT devices, cms_data, updated_at FROM redcover_store_state WHERE state_key = $1',
      ['primary_state']
    );

    if (result.rows.length === 0) {
      return res.json({
        exists: false,
        message: 'No hay datos guardados aún en la base de datos'
      });
    }

    res.json({
      exists: true,
      devices: result.rows[0].devices,
      cmsData: result.rows[0].cms_data,
      updatedAt: result.rows[0].updated_at
    });
  } catch (err) {
    console.error('Error al obtener catálogo:', err);
    res.status(500).json({ error: 'Error interno al consultar la base de datos' });
  }
});

// ==========================================
// 2. Guardar o actualizar catálogo y CMS
// ==========================================
app.post('/api/catalog', async (req, res) => {
  try {
    const { password, devices, cmsData } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Contraseña de administrador inválida' });
    }

    if (!devices || !Array.isArray(devices)) {
      return res.status(400).json({ error: 'Formato de dispositivos inválido' });
    }

    const query = `
      INSERT INTO redcover_store_state (state_key, devices, cms_data, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (state_key)
      DO UPDATE SET
        devices = EXCLUDED.devices,
        cms_data = EXCLUDED.cms_data,
        updated_at = CURRENT_TIMESTAMP
      RETURNING updated_at;
    `;

    const result = await pool.query(query, [
      'primary_state',
      JSON.stringify(devices),
      JSON.stringify(cmsData || {})
    ]);

    console.log(`[${new Date().toISOString()}] Catálogo actualizado con éxito en PostgreSQL`);

    res.json({
      success: true,
      message: 'Catálogo y CMS actualizados exitosamente en PostgreSQL',
      updatedAt: result.rows[0].updated_at
    });
  } catch (err) {
    console.error('Error al guardar catálogo:', err);
    res.status(500).json({ error: 'Error al persistir en la base de datos: ' + err.message });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor RedCover corriendo en http://localhost:${PORT}`);
});
