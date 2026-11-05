    const IMG_IPHONE_PRO = "assets/img/iphone-pro.png";
    const IMG_IPHONE_16 = "assets/img/iphone-16.png";
    const IMG_MACBOOK = "assets/img/macbook.png";
    const IMG_IPAD = "assets/img/ipad.png";
    const IMG_WATCH = "assets/img/watch.png";
    const IMG_AIRPODS = "assets/img/airpods.png";
    const IMG_MAGSAFE = "assets/img/magsafe.png";
    const IMG_CASE = "assets/img/case.png";

    let allCatalogDevices = [
  {
    "id": "iphone-duo-fold",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama 2026 • Primer Plegable Apple",
    "price": 8999000,
    "specs": [
      "Doble pantalla: Externa 6.3\" Super Retina XDR + Interna Plegable 7.9\" Tandem OLED 120Hz",
      "Bisagra aeroespacial de Titanio y Metal Líquido con pliegue cero autorreparable",
      "Chip A20 Pro de 2nm con multitarea dividida estilo iPadOS y Apple Intelligence 3.0",
      "Sistema de triple cámara Pro de 48 MP + Face ID dual en ambas pantallas"
    ],
    "title": "iPhone Duo (Primer Smartphone Plegable de Apple)",
    "colors": [
      {
        "hex": "#1F2022",
        "name": "Titanio Negro Espacial"
      },
      {
        "hex": "#DCDFE3",
        "name": "Titanio Plata Líquido"
      },
      {
        "hex": "#8A1C27",
        "name": "Titanio Carmesí Edición Especial"
      }
    ],
    "category": "iphone",
    "variants": [
      "512 GB - Titanio Negro Espacial - $8.999.000",
      "1 TB - Titanio Plata - $10.199.000",
      "2 TB - Edición Especial Duo - $11.499.000"
    ],
    "shortDesc": "Revolución histórica 2026: El primer smartphone plegable de Apple con bisagra de Metal Líquido sin pliegue visible, pantalla desplegable Tandem OLED de 7.9\" y Chip A20 Pro."
  },
  {
    "id": "iphone-18-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama iPhone 18 (2026)",
    "price": 6999000,
    "specs": [
      "Pantalla Super Retina XDR 6.9\" ProMotion 120Hz con Face ID bajo pantalla",
      "Chip A20 Pro a 2nm con Neural Engine de 64 núcleos y 12 GB de RAM",
      "Triple cámara trasera de 48 MP con apertura variable y Teleobjetivo 10x",
      "Batería de alta densidad con hasta 38 horas de reproducción de video"
    ],
    "title": "iPhone 18 Pro Max (256GB - 2TB)",
    "colors": [
      {
        "hex": "#6E5446",
        "name": "Titanio Café Bronce"
      },
      {
        "hex": "#5B2430",
        "name": "Titanio Borgoña"
      },
      {
        "hex": "#3F334D",
        "name": "Titanio Morado Oscuro"
      },
      {
        "hex": "#222224",
        "name": "Titanio Negro Ónix"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - $6.999.000",
      "512 GB - $7.999.000",
      "1 TB - $9.199.000",
      "2 TB - $10.499.000"
    ],
    "shortDesc": "La máxima expresión tecnológica 2026: Chasis de Titanio Grado 5, Chip A20 Pro de 2nm, cámara con apertura mecánica variable y zoom periscópico 10x."
  },
  {
    "id": "iphone-18-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama iPhone 18 (2026)",
    "price": 5999000,
    "specs": [
      "Pantalla Super Retina XDR 6.3\" ProMotion con Dynamic Island ultrarreducida",
      "Chip A20 Pro de 2nm con trazado de rayos por hardware de 3.ª generación",
      "Sistema de cámaras Pro 48 MP en los 3 sensores + Control de Cámara háptico",
      "Carga ultrarrápida MagSafe de 45W y conectividad Wi-Fi 7 + Satélite"
    ],
    "title": "iPhone 18 Pro (256GB - 1TB)",
    "colors": [
      {
        "hex": "#6E5446",
        "name": "Titanio Café Bronce"
      },
      {
        "hex": "#5B2430",
        "name": "Titanio Borgoña"
      },
      {
        "hex": "#3F334D",
        "name": "Titanio Morado Oscuro"
      },
      {
        "hex": "#222224",
        "name": "Titanio Negro Ónix"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - $5.999.000",
      "512 GB - $6.999.000",
      "1 TB - $8.199.000"
    ],
    "shortDesc": "Potencia Pro insignia de 2026 en 6.3\": Chasis de titanio aeroespacial, Face ID bajo pantalla, Chip A20 Pro y grabación Spatial Video 8K."
  },
  {
    "id": "iphone-17-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama iPhone 17 (2025/2026)",
    "price": 6299000,
    "specs": [
      "Pantalla Super Retina XDR 6.9\" antirreflejo con Ceramic Shield de nueva generación",
      "Chip A19 Pro con cámara de vapor térmica y 12 GB de RAM",
      "Tres cámaras traseras de 48 MP (Principal, Ultra Gran Angular y Teleobjetivo 5x) + Frontal 24 MP",
      "Hasta 35 horas de reproducción continua de video"
    ],
    "title": "iPhone 17 Pro Max (256GB - 1TB)",
    "colors": [
      {
        "hex": "#253447",
        "name": "Titanio Azul Oscuro"
      },
      {
        "hex": "#3E5C58",
        "name": "Titanio Verde Teal"
      },
      {
        "hex": "#9B968F",
        "name": "Titanio Natural"
      },
      {
        "hex": "#2E2E30",
        "name": "Titanio Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - $6.299.000",
      "512 GB - $7.299.000",
      "1 TB - $8.499.000"
    ],
    "shortDesc": "Chip A19 Pro, 12 GB de RAM para Apple Intelligence avanzada y triple cámara trasera íntegramente de 48 MP con zoom óptico 5x."
  },
  {
    "id": "iphone-17-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama iPhone 17 (2025/2026)",
    "price": 5399000,
    "specs": [
      "Pantalla Super Retina XDR 6.3\" ProMotion Always-On 120Hz",
      "Chip A19 Pro con 12 GB de memoria unificada",
      "Grabación ProRes 4K a 120 fps y Audio Espacial de estudio",
      "Acabados: Titanio Azul Oscuro, Titanio Natural, Titanio Plata y Negro"
    ],
    "title": "iPhone 17 Pro (256GB - 1TB)",
    "colors": [
      {
        "hex": "#253447",
        "name": "Titanio Azul Oscuro"
      },
      {
        "hex": "#3E5C58",
        "name": "Titanio Verde Teal"
      },
      {
        "hex": "#9B968F",
        "name": "Titanio Natural"
      },
      {
        "hex": "#2E2E30",
        "name": "Titanio Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - $5.399.000",
      "512 GB - $6.399.000",
      "1 TB - $7.599.000"
    ],
    "shortDesc": "Diseño Pro de 6.3\" con triple sensor de 48 MP, cámara selfie TrueDepth de 24 MP y toda la potencia del Chip A19 Pro."
  },
  {
    "id": "iphone-air",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama iPhone 17 • Ultra Delgado",
    "price": 4899000,
    "specs": [
      "Chasis ultradelgado de 5.5 mm en aleación de titanio y aluminio aeroespacial",
      "Pantalla OLED Super Retina XDR de 6.6\" con ProMotion 120Hz",
      "Chip A19 + módem 5G diseñado por Apple de ultra bajo consumo",
      "Cámara Fusion de 48 MP con teleobjetivo óptico 2x integrado y frontal de 24 MP"
    ],
    "title": "iPhone Air (256GB - 512GB)",
    "colors": [
      {
        "hex": "#E5E6E8",
        "name": "Titanio Plata Estelar"
      },
      {
        "hex": "#2B2C2E",
        "name": "Titanio Negro Espacial"
      },
      {
        "hex": "#A6BCCF",
        "name": "Titanio Azul Cielo"
      },
      {
        "hex": "#EBDCC7",
        "name": "Titanio Oro Claro"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - Plata Estelar - $4.899.000",
      "512 GB - Negro Espacial - $5.599.000"
    ],
    "shortDesc": "El iPhone más delgado de la historia (5.5 mm): diseño ultraligero revolucionario con pantalla ProMotion de 6.6\" y Chip A19."
  },
  {
    "id": "iphone-17",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama iPhone 17 (2025/2026)",
    "price": 4399000,
    "specs": [
      "Pantalla Super Retina XDR de 6.3\" con tecnología ProMotion 120Hz Always-On",
      "Chip Apple A19 de 3nm de tercera generación",
      "Sistema de cámara Dual Fusion de 48 MP + cámara selfie de 24 MP",
      "Colores: Verde Salvia, Lavanda, Azul Bruma, Blanco y Negro"
    ],
    "title": "iPhone 17 (128GB - 512GB)",
    "colors": [
      {
        "hex": "#8FA691",
        "name": "Verde Salvia"
      },
      {
        "hex": "#C8BFE7",
        "name": "Lavanda"
      },
      {
        "hex": "#8CA8BE",
        "name": "Azul Bruma"
      },
      {
        "hex": "#F5F5F7",
        "name": "Blanco"
      },
      {
        "hex": "#262729",
        "name": "Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $4.399.000",
      "256 GB - $4.899.000",
      "512 GB - $5.599.000"
    ],
    "shortDesc": "Por primera vez con pantalla ProMotion de 120Hz en el modelo base, nuevo tamaño de 6.3\", Chip A19 y cámara frontal de 24 MP."
  },
  {
    "id": "iphone-17e",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama iPhone 17 (2026)",
    "price": 3499000,
    "specs": [
      "Pantalla Super Retina XDR OLED de 6.1\" con Dynamic Island",
      "Chip A19 compatible al 100% con Apple Intelligence",
      "Cámara Fusion 2 en 1 de 48 MP con teleobjetivo 2x y USB-C",
      "Batería para todo el día y resistencia al agua IP68"
    ],
    "title": "iPhone 17e (128GB - 256GB)",
    "colors": [
      {
        "hex": "#252628",
        "name": "Negro Espacial"
      },
      {
        "hex": "#F4F4F6",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#9EB2C2",
        "name": "Azul Niebla"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - Blanco / Negro - $3.499.000",
      "256 GB - Blanco / Negro - $3.999.000"
    ],
    "shortDesc": "El miembro más accesible de la familia 17 con Chip A19, Apple Intelligence completa, Face ID y extraordinaria autonomía."
  },
  {
    "id": "iphone-16-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Lanzamiento 2024/2025",
    "price": 5699000,
    "specs": [
      "Pantalla Super Retina XDR 6.9\" con los bordes más finos",
      "Chip A18 Pro de 3nm optimizado para Apple Intelligence",
      "Cámara Fusion 48 MP + Ultra Gran Angular 48 MP + Teleobjetivo 5x",
      "Acabados: Titanio Desierto, Titanio Natural, Blanco y Negro"
    ],
    "title": "iPhone 16 Pro Max (256GB - 1TB)",
    "colors": [
      {
        "hex": "#C5B29F",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXQCduY9KlZvDYMM12SNOKJ-UC7ud1w54GbunUI6a2Q6SQabwiz8Q2kaJBmntthx-YaCV8Wy8kQSKZmqDGQNYE9KcWrlbHdYwS8a_Ik-HauhOP6ewcTQJvWq3bt3UskJGN3TrdEt9BCFmGItcuKAUfBFXsjs8lfmRrz8yRzae409mM-WE221baiPBrvHCkacPhhb7xNklcGToW038Ak9jS7ImnRihPrS4ETqWMiTot3fPVgnVc_FZM",
        "name": "Titanio Desierto"
      },
      {
        "hex": "#9B968F",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Vbp8i7NcqJPqqwjnib7N5kojQ12qGEvJgIy1wgV3-32WO0IHIp3LcK4Ii52b8UHFqKq4nvW7NQozR1cqvE9Qi9YJvFMfEglIWYtutmYXcOCAHk7kKQ1fAZlk8G6cnyTsgxyq8-axeHjd0Kz_VsZNFP_I2DfY1IYtOchlgLNey5Za6e4zt0u21jvBsIQptmckP2q5sEk66EL0qAqhSdjjneDIX9ws4Uhh05RrKjuOfyasw9Bl-f51",
        "name": "Titanio Natural"
      },
      {
        "hex": "#E8E8E6",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKpi-7626i_BJoAesODslUPkoHF04It4WQfIRb2gDCzY-XPTt0M4AWO3WivVPvllUKPqKO1qhdw_EkyK6IsQgqWFmrYCyz666iavAdl6p3SM5Rd7J82vr0lZhy3YDHo9sPYN5PQUCyWDPW9pdYh6VzFQp3QVDOIaAfKgJXAz2givYj5_BDYXPsmJsCXvxGgS-JuiYI6ziK3EGAf1dO_3gPjpA3eRj_FrcGJ__DTBAC1ChH96IN4DBt",
        "name": "Titanio Blanco"
      },
      {
        "hex": "#343332",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCMv6ybGEqgj4q7JB0905STGqvKkmeSjkOwJKHIsW3lZQs4t7J9z3Amool_EzZPhTuq47-VhCiR1KPVV_-avHCio8xc3fr8wI60m9tDqXziuhwgWSjPM1LTVzemNhlB7eDtEfWXuEjN91U0oRvU3KQv-a9Q-5xFxWdZlqEEJzeVWzKrhgXeEuRV3YEQMRl6YOAUBssA02c0rygPJNmzDND3-L9BBigYBXR_GsW5GtkuUN7mn8VyrNqi",
        "name": "Titanio Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - $5.699.000",
      "512 GB - $6.799.000",
      "1 TB - $7.899.000"
    ],
    "shortDesc": "Pantalla gigante de 6.9\", chasis de Titanio Grado 5, Chip A18 Pro, Control de Cámara y teleobjetivo tetraprisma 5x."
  },
  {
    "id": "iphone-16-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Lanzamiento 2024/2025",
    "price": 4899000,
    "specs": [
      "Pantalla Super Retina XDR 6.3\" ProMotion 120Hz",
      "Chip A18 Pro (GPU de 6 núcleos y Neural Engine de 16 núcleos)",
      "Sistema de cámaras Pro 48 MP + Zoom Óptico 5x tetraprisma",
      "4 micrófonos con calidad de estudio y Mezcla de Audio"
    ],
    "title": "iPhone 16 Pro (128GB - 1TB)",
    "colors": [
      {
        "hex": "#C5B29F",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXQCduY9KlZvDYMM12SNOKJ-UC7ud1w54GbunUI6a2Q6SQabwiz8Q2kaJBmntthx-YaCV8Wy8kQSKZmqDGQNYE9KcWrlbHdYwS8a_Ik-HauhOP6ewcTQJvWq3bt3UskJGN3TrdEt9BCFmGItcuKAUfBFXsjs8lfmRrz8yRzae409mM-WE221baiPBrvHCkacPhhb7xNklcGToW038Ak9jS7ImnRihPrS4ETqWMiTot3fPVgnVc_FZM",
        "name": "Titanio Desierto"
      },
      {
        "hex": "#9B968F",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Vbp8i7NcqJPqqwjnib7N5kojQ12qGEvJgIy1wgV3-32WO0IHIp3LcK4Ii52b8UHFqKq4nvW7NQozR1cqvE9Qi9YJvFMfEglIWYtutmYXcOCAHk7kKQ1fAZlk8G6cnyTsgxyq8-axeHjd0Kz_VsZNFP_I2DfY1IYtOchlgLNey5Za6e4zt0u21jvBsIQptmckP2q5sEk66EL0qAqhSdjjneDIX9ws4Uhh05RrKjuOfyasw9Bl-f51",
        "name": "Titanio Natural"
      },
      {
        "hex": "#E8E8E6",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKpi-7626i_BJoAesODslUPkoHF04It4WQfIRb2gDCzY-XPTt0M4AWO3WivVPvllUKPqKO1qhdw_EkyK6IsQgqWFmrYCyz666iavAdl6p3SM5Rd7J82vr0lZhy3YDHo9sPYN5PQUCyWDPW9pdYh6VzFQp3QVDOIaAfKgJXAz2givYj5_BDYXPsmJsCXvxGgS-JuiYI6ziK3EGAf1dO_3gPjpA3eRj_FrcGJ__DTBAC1ChH96IN4DBt",
        "name": "Titanio Blanco"
      },
      {
        "hex": "#343332",
        "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCMv6ybGEqgj4q7JB0905STGqvKkmeSjkOwJKHIsW3lZQs4t7J9z3Amool_EzZPhTuq47-VhCiR1KPVV_-avHCio8xc3fr8wI60m9tDqXziuhwgWSjPM1LTVzemNhlB7eDtEfWXuEjN91U0oRvU3KQv-a9Q-5xFxWdZlqEEJzeVWzKrhgXeEuRV3YEQMRl6YOAUBssA02c0rygPJNmzDND3-L9BBigYBXR_GsW5GtkuUN7mn8VyrNqi",
        "name": "Titanio Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $4.899.000",
      "256 GB - $5.399.000",
      "512 GB - $6.399.000",
      "1 TB - $7.499.000"
    ],
    "shortDesc": "Chasis de Titanio Grado 5, Chip A18 Pro, botón Control de Cámara táctil y grabación 4K a 120 fps en Dolby Vision."
  },
  {
    "id": "iphone-16-plus",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2024/2025",
    "price": 4399000,
    "specs": [
      "Pantalla Super Retina XDR de 6.7\" hasta 2000 nits en exteriores",
      "Chip A18 con salto de dos generaciones para Apple Intelligence",
      "Cámara Fusion de 48 MP + Fotografía Macro y Espacial",
      "Hasta 27 horas de reproducción de video"
    ],
    "title": "iPhone 16 Plus (128GB - 512GB)",
    "colors": [
      {
        "hex": "#6374B6",
        "name": "Ultramarino"
      },
      {
        "hex": "#82ADAA",
        "name": "Verde Azulado"
      },
      {
        "hex": "#E6A8C5",
        "name": "Rosa"
      },
      {
        "hex": "#F4F4F4",
        "name": "Blanco"
      },
      {
        "hex": "#2C2D30",
        "name": "Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $4.399.000",
      "256 GB - $4.899.000",
      "512 GB - $5.599.000"
    ],
    "shortDesc": "Gran pantalla de 6.7 pulgadas con batería colosal, Chip A18, Botón de Acción y nuevo Control de Cámara lateral."
  },
  {
    "id": "iphone-16",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2024/2025",
    "price": 3999000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" con Ceramic Shield",
      "Chip A18 de alto rendimiento y eficiencia energética",
      "Cámara Fusion de 48 MP con teleobjetivo 2x de calidad óptica",
      "Colores: Ultramarino, Verde Azulado, Rosa, Blanco y Negro"
    ],
    "title": "iPhone 16 (128GB - 512GB)",
    "colors": [
      {
        "hex": "#6374B6",
        "name": "Ultramarino"
      },
      {
        "hex": "#82ADAA",
        "name": "Verde Azulado"
      },
      {
        "hex": "#E6A8C5",
        "name": "Rosa"
      },
      {
        "hex": "#F4F4F4",
        "name": "Blanco"
      },
      {
        "hex": "#2C2D30",
        "name": "Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $3.999.000",
      "256 GB - $4.499.000",
      "512 GB - $5.199.000"
    ],
    "shortDesc": "Diseñado para Apple Intelligence con Chip A18, Botón de Acción personalizable, Control de Cámara y colores vibrantes."
  },
  {
    "id": "iphone-16e",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2025 • Chip A18",
    "price": 2999000,
    "specs": [
      "Pantalla Super Retina XDR OLED de 6.1\" de borde a borde con Face ID",
      "Chip A18 + Primer módem celular Apple C1 con la mejor batería en 6.1\"",
      "Sistema de cámara 2 en 1 Fusion de 48 MP con teleobjetivo 2x integrado",
      "Botón de Acción, puerto USB-C y emergencia SOS vía satélite"
    ],
    "title": "iPhone 16e (128GB - 512GB)",
    "colors": [
      {
        "hex": "#28282B",
        "name": "Negro Mate"
      },
      {
        "hex": "#F5F5F7",
        "name": "Blanco Mate"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - Negro Mate / Blanco - $2.999.000",
      "256 GB - $3.499.000",
      "512 GB - $4.199.000"
    ],
    "shortDesc": "Potencia del Chip A18 y Apple Intelligence a un precio extraordinario, con pantalla OLED de 6.1\", Face ID, Botón de Acción y módem Apple C1."
  },
  {
    "id": "iphone-15-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Serie iPhone 15 (2023)",
    "price": 4999000,
    "specs": [
      "Pantalla Super Retina XDR 6.7\" ProMotion 120Hz Always-On",
      "Chip A17 Pro de 3nm compatible con Apple Intelligence",
      "Cámara principal 48 MP con teleobjetivo tetraprisma 5x (120 mm)",
      "Botón de Acción personalizable y chasis de Titanio Grado 5"
    ],
    "title": "iPhone 15 Pro Max (256GB - 1TB)",
    "colors": [
      {
        "hex": "#9A958D",
        "name": "Titanio Natural"
      },
      {
        "hex": "#3D4552",
        "name": "Titanio Azul"
      },
      {
        "hex": "#F2F1ED",
        "name": "Titanio Blanco"
      },
      {
        "hex": "#3E3F41",
        "name": "Titanio Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "256 GB - $4.999.000",
      "512 GB - $5.799.000",
      "1 TB - $6.599.000"
    ],
    "shortDesc": "Forjado en titanio aeroespacial con el Chip A17 Pro, conector USB-C con velocidad USB 3 y zoom óptico 5x."
  },
  {
    "id": "iphone-15-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Serie iPhone 15 (2023)",
    "price": 4299000,
    "specs": [
      "Pantalla Super Retina XDR 6.1\" ProMotion 120Hz con Dynamic Island",
      "Chip A17 Pro compatible con Apple Intelligence y juegos de consola",
      "Cámara Pro de 48 MP con 7 distancias focales y zoom óptico 3x",
      "Conector USB-C con transferencia de hasta 10 Gb/s"
    ],
    "title": "iPhone 15 Pro (128GB - 512GB)",
    "colors": [
      {
        "hex": "#9A958D",
        "name": "Titanio Natural"
      },
      {
        "hex": "#3D4552",
        "name": "Titanio Azul"
      },
      {
        "hex": "#F2F1ED",
        "name": "Titanio Blanco"
      },
      {
        "hex": "#3E3F41",
        "name": "Titanio Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $4.299.000",
      "256 GB - $4.799.000",
      "512 GB - $5.399.000"
    ],
    "shortDesc": "El Pro más ligero en titanio aeroespacial de 6.1\", con Botón de Acción, Chip A17 Pro y puerto USB-C 3.0."
  },
  {
    "id": "iphone-15-plus",
    "img": "assets/img/iphone-16.png",
    "badge": "Serie iPhone 15 (2023)",
    "price": 3699000,
    "specs": [
      "Pantalla Super Retina XDR de 6.7\" hasta 2000 nits",
      "Chip A16 Bionic de 6 núcleos de alta eficiencia",
      "Cámara gran angular de 48 MP con teleobjetivo 2x de calidad óptica",
      "Puerto USB-C y hasta 26 horas de reproducción de video"
    ],
    "title": "iPhone 15 Plus (128GB - 256GB)",
    "colors": [
      {
        "hex": "#EBD3D4",
        "name": "Rosa"
      },
      {
        "hex": "#F5EFC9",
        "name": "Amarillo"
      },
      {
        "hex": "#D5DFD0",
        "name": "Verde"
      },
      {
        "hex": "#D6E1E8",
        "name": "Azul"
      },
      {
        "hex": "#3C3D3A",
        "name": "Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $3.699.000",
      "256 GB - $4.199.000"
    ],
    "shortDesc": "Gran pantalla de 6.7 pulgadas con Dynamic Island, cámara de 48 MP, vidrio con infusión de color y enorme batería."
  },
  {
    "id": "iphone-15",
    "img": "assets/img/iphone-16.png",
    "badge": "Serie iPhone 15 (2023)",
    "price": 3299000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" con Dynamic Island",
      "Chip A16 Bionic ultrarrápido",
      "Vidrio trasero mate con infusión de color y bordes contorneados",
      "Colores: Negro, Azul, Verde, Amarillo y Rosa"
    ],
    "title": "iPhone 15 (128GB - 256GB)",
    "colors": [
      {
        "hex": "#EBD3D4",
        "name": "Rosa"
      },
      {
        "hex": "#F5EFC9",
        "name": "Amarillo"
      },
      {
        "hex": "#D5DFD0",
        "name": "Verde"
      },
      {
        "hex": "#D6E1E8",
        "name": "Azul"
      },
      {
        "hex": "#3C3D3A",
        "name": "Negro"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $3.299.000",
      "256 GB - $3.799.000"
    ],
    "shortDesc": "Dynamic Island, cámara principal de 48 MP con retratos de última generación, Chip A16 Bionic y conector USB-C."
  },
  {
    "id": "iphone-14-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Lanzamiento 2022",
    "price": 3999000,
    "specs": [
      "Pantalla Super Retina XDR de 6.7\" ProMotion Always-On",
      "Chip A16 Bionic de 4 nanómetros",
      "Cámara Pro de 48 MP con sensor quad-pixel y Photonic Engine",
      "Detección de Choques y Emergencia SOS vía satélite"
    ],
    "title": "iPhone 14 Pro Max (128GB - 512GB)",
    "colors": [
      {
        "hex": "#594F63",
        "name": "Morado Oscuro"
      },
      {
        "hex": "#F4E8CE",
        "name": "Oro"
      },
      {
        "hex": "#F0F2F2",
        "name": "Plata"
      },
      {
        "hex": "#403E3D",
        "name": "Negro Espacial"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $3.999.000",
      "256 GB - $4.499.000",
      "512 GB - $4.999.000"
    ],
    "shortDesc": "El debut de Dynamic Island y la pantalla siempre activa en 6.7\", con cámara Pro de 48 MP y acero inoxidable."
  },
  {
    "id": "iphone-14-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Lanzamiento 2022",
    "price": 3499000,
    "specs": [
      "Pantalla Super Retina XDR 6.1\" ProMotion 120Hz Always-On",
      "Chip A16 Bionic con GPU de 5 núcleos",
      "Triple cámara Pro de 48 MP + Teleobjetivo 3x + Escáner LiDAR",
      "Acabados: Morado Oscuro, Oro, Plata y Negro Espacial"
    ],
    "title": "iPhone 14 Pro (128GB - 256GB)",
    "colors": [
      {
        "hex": "#594F63",
        "name": "Morado Oscuro"
      },
      {
        "hex": "#F4E8CE",
        "name": "Oro"
      },
      {
        "hex": "#F0F2F2",
        "name": "Plata"
      },
      {
        "hex": "#403E3D",
        "name": "Negro Espacial"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $3.499.000",
      "256 GB - $3.899.000"
    ],
    "shortDesc": "Dynamic Island interactiva en 6.1\", cámara principal de 48 MP ProRAW y grabación Modo Cine en 4K HDR."
  },
  {
    "id": "iphone-14-plus",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2022",
    "price": 2899000,
    "specs": [
      "Pantalla Super Retina XDR OLED de 6.7\"",
      "Chip A15 Bionic con GPU de 5 núcleos",
      "Cámara dual avanzada con Photonic Engine y Modo Acción",
      "Hasta 26 horas de reproducción de video"
    ],
    "title": "iPhone 14 Plus (128GB - 256GB)",
    "colors": [
      {
        "hex": "#A0B4C7",
        "name": "Azul"
      },
      {
        "hex": "#E5DDEA",
        "name": "Morado"
      },
      {
        "hex": "#F9E479",
        "name": "Amarillo"
      },
      {
        "hex": "#222930",
        "name": "Medianoche"
      },
      {
        "hex": "#FAF6F2",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#FC0324",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $2.899.000",
      "256 GB - $3.299.000"
    ],
    "shortDesc": "Pantalla grande de 6.7 pulgadas en un cuerpo de aluminio ligero con modo Acción y batería para todo el día."
  },
  {
    "id": "iphone-14",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2022",
    "price": 2599000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" OLED con Ceramic Shield",
      "Chip A15 Bionic con GPU de 5 núcleos",
      "Cámara dual de 12 MP con Modo Cine en 4K Dolby Vision",
      "Conectividad 5G y accesorios magnéticos MagSafe"
    ],
    "title": "iPhone 14 (128GB - 256GB)",
    "colors": [
      {
        "hex": "#A0B4C7",
        "name": "Azul"
      },
      {
        "hex": "#E5DDEA",
        "name": "Morado"
      },
      {
        "hex": "#F9E479",
        "name": "Amarillo"
      },
      {
        "hex": "#222930",
        "name": "Medianoche"
      },
      {
        "hex": "#FAF6F2",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#FC0324",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $2.599.000",
      "256 GB - $2.999.000"
    ],
    "shortDesc": "Equilibrio ideal de tamaño de 6.1\", cámaras mejoradas en baja luz con Photonic Engine y Detección de Choques."
  },
  {
    "id": "iphone-se-3",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2022 • Touch ID",
    "price": 1599000,
    "specs": [
      "Pantalla Retina HD de 4.7\" compacta y cómoda en mano",
      "Chip A15 Bionic de 6 núcleos con conectividad 5G",
      "Botón de inicio con sensor de huella Touch ID seguro",
      "Cámara de 12 MP con Deep Fusion, HDR Inteligente 4 y Estilos Fotográficos"
    ],
    "title": "iPhone SE (3.ª generación - 2022)",
    "colors": [
      {
        "hex": "#232A31",
        "name": "Medianoche"
      },
      {
        "hex": "#F9F3EE",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#BF0013",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - Medianoche / Blanco Estelar / (PRODUCT)RED - $1.599.000",
      "128 GB - $1.799.000"
    ],
    "shortDesc": "El clásico botón de inicio con Touch ID potenciado con el Chip A15 Bionic del iPhone 13 y conectividad 5G."
  },
  {
    "id": "iphone-13-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Serie iPhone 13 (2021)",
    "price": 3299000,
    "specs": [
      "Pantalla Super Retina XDR de 6.7\" con ProMotion de 120Hz",
      "Chip A15 Bionic con GPU de 5 núcleos",
      "Sistema de cámaras Pro con Macro, Teleobjetivo 3x y LiDAR",
      "Chasis de acero inoxidable quirúrgico y Ceramic Shield"
    ],
    "title": "iPhone 13 Pro Max (128GB - 256GB)",
    "colors": [
      {
        "hex": "#A7C1D9",
        "name": "Azul Sierra"
      },
      {
        "hex": "#576856",
        "name": "Verde Alpino"
      },
      {
        "hex": "#54524F",
        "name": "Grafito"
      },
      {
        "hex": "#FAE7CF",
        "name": "Oro"
      },
      {
        "hex": "#F1F2ED",
        "name": "Plata"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $3.299.000",
      "256 GB - $3.699.000"
    ],
    "shortDesc": "Legendario por su batería y fluidez: pantalla ProMotion de 120Hz de 6.7\", fotografía macro y teleobjetivo 3x."
  },
  {
    "id": "iphone-13-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Serie iPhone 13 (2021)",
    "price": 2899000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" ProMotion 120Hz",
      "Chip A15 Bionic con GPU de 5 núcleos",
      "Grabación de video ProRes y Modo Cine con enfoque dinámico",
      "Acabados: Azul Sierra, Verde Alpino, Grafito, Oro y Plata"
    ],
    "title": "iPhone 13 Pro (128GB - 256GB)",
    "colors": [
      {
        "hex": "#A7C1D9",
        "name": "Azul Sierra"
      },
      {
        "hex": "#576856",
        "name": "Verde Alpino"
      },
      {
        "hex": "#54524F",
        "name": "Grafito"
      },
      {
        "hex": "#FAE7CF",
        "name": "Oro"
      },
      {
        "hex": "#F1F2ED",
        "name": "Plata"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $2.899.000",
      "256 GB - $3.299.000"
    ],
    "shortDesc": "Pantalla ProMotion de 120Hz en 6.1\", triple cámara profesional con grabación ProRes y fotografía macro."
  },
  {
    "id": "iphone-13",
    "img": "assets/img/iphone-16.png",
    "badge": "Serie iPhone 13 (2021)",
    "price": 2199000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" OLED brillante",
      "Chip A15 Bionic rápido y eficiente con 5G",
      "Cámara dual de 12 MP con estabilización por desplazamiento de sensor",
      "Modo Cine 1080p y compatibilidad total con MagSafe"
    ],
    "title": "iPhone 13 (128GB - 256GB)",
    "colors": [
      {
        "hex": "#FADDD7",
        "name": "Rosa"
      },
      {
        "hex": "#276787",
        "name": "Azul"
      },
      {
        "hex": "#232A31",
        "name": "Medianoche"
      },
      {
        "hex": "#F9F3EE",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#394C38",
        "name": "Verde"
      },
      {
        "hex": "#BF0013",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $2.199.000",
      "256 GB - $2.599.000"
    ],
    "shortDesc": "Uno de los iPhones más populares de la historia: cámara dual en diagonal con Sensor-Shift OIS y gran autonomía."
  },
  {
    "id": "iphone-13-mini",
    "img": "assets/img/iphone-16.png",
    "badge": "Serie iPhone 13 (2021)",
    "price": 1999000,
    "specs": [
      "Pantalla Super Retina XDR de 5.4\" OLED de borde a borde",
      "Chip A15 Bionic idéntico al iPhone 13",
      "Cámara dual con Modo Cine y Modo Noche",
      "Ultrahoja de 140 gramos con resistencia IP68 y MagSafe"
    ],
    "title": "iPhone 13 mini (128GB - 256GB)",
    "colors": [
      {
        "hex": "#FADDD7",
        "name": "Rosa"
      },
      {
        "hex": "#276787",
        "name": "Azul"
      },
      {
        "hex": "#232A31",
        "name": "Medianoche"
      },
      {
        "hex": "#F9F3EE",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#394C38",
        "name": "Verde"
      },
      {
        "hex": "#BF0013",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $1.999.000",
      "256 GB - $2.399.000"
    ],
    "shortDesc": "El último mini de Apple: toda la potencia del Chip A15 Bionic y pantalla OLED en un tamaño compacto de 5.4\"."
  },
  {
    "id": "iphone-12-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Lanzamiento 2020",
    "price": 2499000,
    "specs": [
      "Pantalla Super Retina XDR de 6.7\" OLED",
      "Chip A14 Bionic (primer chip de 5 nanómetros)",
      "Triple cámara Pro con zoom óptico 2.5x y Apple ProRAW",
      "Tecnología MagSafe y frente de Ceramic Shield"
    ],
    "title": "iPhone 12 Pro Max (128GB - 256GB)",
    "colors": [
      {
        "hex": "#2D4E5C",
        "name": "Azul Pacífico"
      },
      {
        "hex": "#52514F",
        "name": "Grafito"
      },
      {
        "hex": "#F9E5C9",
        "name": "Oro"
      },
      {
        "hex": "#F1F2ED",
        "name": "Plata"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $2.499.000",
      "256 GB - $2.799.000"
    ],
    "shortDesc": "El primer Pro Max con 5G, bordes planos en acero inoxidable, pantalla de 6.7\" y escáner LiDAR."
  },
  {
    "id": "iphone-12-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Lanzamiento 2020",
    "price": 2199000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" OLED",
      "Chip A14 Bionic con conectividad 5G",
      "Triple cámara de 12 MP con retratos en Modo Noche asistidos por LiDAR",
      "Acabados: Azul Pacífico, Grafito, Oro y Plata"
    ],
    "title": "iPhone 12 Pro (128GB - 256GB)",
    "colors": [
      {
        "hex": "#2D4E5C",
        "name": "Azul Pacífico"
      },
      {
        "hex": "#52514F",
        "name": "Grafito"
      },
      {
        "hex": "#F9E5C9",
        "name": "Oro"
      },
      {
        "hex": "#F1F2ED",
        "name": "Plata"
      }
    ],
    "category": "iphone",
    "variants": [
      "128 GB - $2.199.000",
      "256 GB - $2.499.000"
    ],
    "shortDesc": "Diseño en acero inoxidable quirúrgico de 6.1\", triple cámara con sensor LiDAR y grabación HDR en Dolby Vision."
  },
  {
    "id": "iphone-12",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2020",
    "price": 1699000,
    "specs": [
      "Pantalla Super Retina XDR de 6.1\" OLED con Ceramic Shield",
      "Chip A14 Bionic de alto desempeño",
      "Cámara dual de 12 MP con Modo Noche en ultra gran angular y frontal",
      "Carga inalámbrica magnética MagSafe"
    ],
    "title": "iPhone 12 (64GB - 128GB)",
    "colors": [
      {
        "hex": "#201D24",
        "name": "Negro"
      },
      {
        "hex": "#F6F2EF",
        "name": "Blanco"
      },
      {
        "hex": "#043458",
        "name": "Azul"
      },
      {
        "hex": "#D8EFD5",
        "name": "Verde"
      },
      {
        "hex": "#B7AFE6",
        "name": "Morado"
      },
      {
        "hex": "#E23636",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - $1.699.000",
      "128 GB - $1.899.000"
    ],
    "shortDesc": "Pionero del diseño de bordes planos con pantalla OLED Super Retina XDR de 6.1\", 5G y accesorios MagSafe."
  },
  {
    "id": "iphone-12-mini",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2020",
    "price": 1499000,
    "specs": [
      "Pantalla Super Retina XDR de 5.4\" OLED",
      "Chip A14 Bionic con Neural Engine de 16 núcleos",
      "Cámara dual de 12 MP con grabación 4K Dolby Vision",
      "Resistencia al agua IP68 y Ceramic Shield"
    ],
    "title": "iPhone 12 mini (64GB - 128GB)",
    "colors": [
      {
        "hex": "#201D24",
        "name": "Negro"
      },
      {
        "hex": "#F6F2EF",
        "name": "Blanco"
      },
      {
        "hex": "#043458",
        "name": "Azul"
      },
      {
        "hex": "#D8EFD5",
        "name": "Verde"
      },
      {
        "hex": "#B7AFE6",
        "name": "Morado"
      },
      {
        "hex": "#E23636",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - $1.499.000",
      "128 GB - $1.699.000"
    ],
    "shortDesc": "Compacto de 5.4 pulgadas con pantalla OLED de borde a borde, conectividad 5G, MagSafe y Chip A14 Bionic."
  },
  {
    "id": "iphone-se-2",
    "img": "assets/img/iphone-16.png",
    "badge": "Lanzamiento 2020 • Touch ID",
    "price": 1099000,
    "specs": [
      "Pantalla Retina HD de 4.7\" con True Tone y Haptic Touch",
      "Chip A13 Bionic de 64 bits con Neural Engine de 3.ª generación",
      "Botón de inicio de cristal de zafiro con Touch ID",
      "Modo Retrato con control de profundidad, carga inalámbrica Qi y resistencia IP67"
    ],
    "title": "iPhone SE (2.ª generación - 2020)",
    "colors": [
      {
        "hex": "#1F2020",
        "name": "Negro"
      },
      {
        "hex": "#F9F6EF",
        "name": "Blanco"
      },
      {
        "hex": "#BA0C2E",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - Negro / Blanco / (PRODUCT)RED - $1.099.000",
      "128 GB - $1.249.000"
    ],
    "shortDesc": "El diseño clásico de 4.7 pulgadas con botón Touch ID y el corazón del iPhone 11 Pro (Chip A13 Bionic) al precio más económico."
  },
  {
    "id": "iphone-11-pro-max",
    "img": "assets/img/iphone-pro.png",
    "badge": "Serie iPhone 11 (2019)",
    "price": 1899000,
    "specs": [
      "Pantalla Super Retina XDR de 6.5\" OLED",
      "Chip A13 Bionic con motor neuronal de 8 núcleos",
      "Triple cámara: Ultra Gran Angular, Gran Angular y Teleobjetivo 2x",
      "Acero inoxidable quirúrgico y resistencia al agua IP68 (4 metros)"
    ],
    "title": "iPhone 11 Pro Max (64GB - 256GB)",
    "colors": [
      {
        "hex": "#4E5851",
        "name": "Verde Medianoche"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      },
      {
        "hex": "#EBEEF0",
        "name": "Plata"
      },
      {
        "hex": "#F5E0C8",
        "name": "Oro"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - Verde Medianoche / Gris Espacial / Oro / Plata - $1.899.000",
      "256 GB - $2.199.000"
    ],
    "shortDesc": "El primer Pro Max de Apple con triple cámara de 12 MP, pantalla OLED de 6.5\" y vidrio mate texturizado."
  },
  {
    "id": "iphone-11-pro",
    "img": "assets/img/iphone-pro.png",
    "badge": "Serie iPhone 11 (2019)",
    "price": 1699000,
    "specs": [
      "Pantalla Super Retina XDR de 5.8\" OLED con HDR10 y Dolby Vision",
      "Chip A13 Bionic de alto rendimiento",
      "Sistema de triple cámara de 12 MP con Modo Noche y Deep Fusion",
      "Face ID rápido y grabación 4K a 60 fps en todas las cámaras"
    ],
    "title": "iPhone 11 Pro (64GB - 256GB)",
    "colors": [
      {
        "hex": "#4E5851",
        "name": "Verde Medianoche"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      },
      {
        "hex": "#EBEEF0",
        "name": "Plata"
      },
      {
        "hex": "#F5E0C8",
        "name": "Oro"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - $1.699.000",
      "256 GB - $1.999.000"
    ],
    "shortDesc": "Formato Pro compacto de 5.8 pulgadas con pantalla Super Retina XDR OLED, acero inoxidable y triple cámara."
  },
  {
    "id": "iphone-11",
    "img": "assets/img/iphone-16.png",
    "badge": "Serie iPhone 11 (2019)",
    "price": 1349000,
    "specs": [
      "Pantalla Liquid Retina HD de 6.1\" con True Tone",
      "Chip A13 Bionic fluido y confiable en iOS",
      "Cámara dual de 12 MP (Gran Angular y Ultra Gran Angular 120°)",
      "Colores: Negro, Blanco, Morado, Verde, Amarillo y (PRODUCT)RED"
    ],
    "title": "iPhone 11 (64GB - 128GB)",
    "colors": [
      {
        "hex": "#1F2020",
        "name": "Negro"
      },
      {
        "hex": "#F9F6EF",
        "name": "Blanco"
      },
      {
        "hex": "#ADE0CD",
        "name": "Verde"
      },
      {
        "hex": "#FFE681",
        "name": "Amarillo"
      },
      {
        "hex": "#D1CDDA",
        "name": "Morado"
      },
      {
        "hex": "#BA0C2E",
        "name": "(PRODUCT)RED"
      }
    ],
    "category": "iphone",
    "variants": [
      "64 GB - $1.349.000",
      "128 GB - $1.549.000"
    ],
    "shortDesc": "Clásico imbatible: pantalla Liquid Retina de 6.1\", cámara dual con Ultra Gran Angular y Modo Noche, Face ID y Chip A13 Bionic."
  },
  {
    "id": "macbook-pro-m5",
    "img": "assets/img/macbook.png",
    "badge": "Nuevo 2026 • Chip M5",
    "price": 8999000,
    "specs": [
      "Chips Apple M5, M5 Pro y M5 Max con Neural Engine cuántico de 32 núcleos",
      "Pantalla Liquid Retina XDR con opción Nano-Texturizada antirreflejo",
      "Puertos Thunderbolt 5, HDMI 2.1 (8K), lector SDXC y MagSafe 3",
      "Hasta 128 GB de memoria unificada y Wi-Fi 7 ultrarrápido"
    ],
    "title": "MacBook Pro 14\" y 16\" (M5 / M5 Pro / M5 Max)",
    "colors": [
      {
        "hex": "#2E3033",
        "name": "Negro Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "mac",
    "variants": [
      "14\" M5 (16GB/512GB) - $8.999.000",
      "14\" M5 Pro (24GB/1TB) - $10.499.000",
      "16\" M5 Max (48GB/1TB) - $15.999.000"
    ],
    "shortDesc": "La estación de trabajo portátil definitiva 2026: arquitectura de 2nm, Thunderbolt 5 de 120 Gb/s y hasta 24 horas de batería."
  },
  {
    "id": "macbook-air-m5",
    "img": "assets/img/macbook.png",
    "badge": "Nuevo 2026 • Ultraligera",
    "price": 5899000,
    "specs": [
      "Chip Apple M5 de 10 núcleos con aceleración de IA para Apple Intelligence 3.0",
      "16 GB de memoria unificada de serie en todos los modelos",
      "Soporte nativo para dos monitores externos 6K con la tapa abierta",
      "Colores: Medianoche, Blanco Estelar, Azul Cielo y Plata"
    ],
    "title": "MacBook Air 13\" y 15\" (Chip M5)",
    "colors": [
      {
        "hex": "#1C2331",
        "name": "Medianoche"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#A8BDD4",
        "name": "Azul Cielo"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "mac",
    "variants": [
      "13\" M5 (16GB/256GB) - $5.899.000",
      "13\" M5 (16GB/512GB) - $6.899.000",
      "15\" M5 (16GB/512GB) - $7.799.000"
    ],
    "shortDesc": "La laptop más amada del mundo ahora con Chip M5, cámara Center Stage de 12 MP, 16GB de RAM base y hasta 20 horas de autonomía."
  },
  {
    "id": "macbook-pro-m4",
    "img": "assets/img/macbook.png",
    "badge": "Potencia Pro M4",
    "price": 7999000,
    "specs": [
      "Chip Apple M4, M4 Pro o M4 Max de hasta 16 núcleos de CPU y 40 de GPU",
      "Brillo SDR de hasta 1000 nits en exteriores y 1600 nits HDR",
      "3 puertos Thunderbolt 5, HDMI, ranura SDXC y carga rápida MagSafe 3",
      "Acabados: Negro Espacial (Space Black) y Plata"
    ],
    "title": "MacBook Pro 14\" y 16\" (M4 / M4 Pro / M4 Max)",
    "colors": [
      {
        "hex": "#2E3033",
        "name": "Negro Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "mac",
    "variants": [
      "14\" M4 (16GB/512GB) - $7.999.000",
      "14\" M4 Pro (24GB/512GB) - $9.699.000",
      "16\" M4 Max (36GB/1TB) - $14.499.000"
    ],
    "shortDesc": "Rendimiento profesional extraordinario con conectividad Thunderbolt 5, cámara 12MP Center Stage y batería de 24 horas."
  },
  {
    "id": "macbook-air-m4",
    "img": "assets/img/macbook.png",
    "badge": "Best Seller Portátil",
    "price": 5199000,
    "specs": [
      "Chip Apple M4 de 10 núcleos CPU y 10 núcleos GPU",
      "Pantalla Liquid Retina de 13.6\" o 15.3\" con 500 nits de brillo",
      "Cámara 12MP Center Stage con Vista Cenital de escritorio",
      "Batería de hasta 18 horas y carga MagSafe 3"
    ],
    "title": "MacBook Air 13\" y 15\" (Chip M4)",
    "colors": [
      {
        "hex": "#1C2331",
        "name": "Medianoche"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "mac",
    "variants": [
      "13\" M4 (16GB/256GB) - $5.199.000",
      "13\" M4 (16GB/512GB) - $6.199.000",
      "15\" M4 (16GB/512GB) - $6.999.000"
    ],
    "shortDesc": "Diseño silencioso sin ventilador con chip M4, 16 GB de memoria RAM base y potencia sobrada para universidad y trabajo."
  },
  {
    "id": "imac-24-m4",
    "img": "assets/img/macbook.png",
    "badge": "Todo en Uno 4.5K",
    "price": 6699000,
    "specs": [
      "Pantalla Retina 4.5K de 24\" con opción Nano-Texturizada antirreflejo",
      "Chip Apple M4 y cámara 12MP Center Stage con Encuadre Centrado",
      "Incluye Magic Keyboard con Touch ID y Magic Mouse con puerto USB-C",
      "Hasta 4 puertos Thunderbolt 4 y Gigabit Ethernet"
    ],
    "title": "iMac 24\" Pantalla Retina 4.5K (Chip M4)",
    "colors": [
      {
        "hex": "#456987",
        "name": "Azul Océano"
      },
      {
        "hex": "#638977",
        "name": "Verde Menta"
      },
      {
        "hex": "#B86877",
        "name": "Rosa Suave"
      },
      {
        "hex": "#DCDFE3",
        "name": "Plata Clásica"
      },
      {
        "hex": "#DEB340",
        "name": "Amarillo"
      },
      {
        "hex": "#D97543",
        "name": "Naranja"
      },
      {
        "hex": "#776E94",
        "name": "Morado"
      }
    ],
    "category": "mac",
    "variants": [
      "M4 8-GPU (16GB/256GB) - $6.699.000",
      "M4 10-GPU (16GB/512GB) - $7.899.000",
      "M4 (24GB/1TB) - $9.199.000"
    ],
    "shortDesc": "El todo en uno definitivo con chip M4, 16 GB de RAM base, opción de vidrio nano-texturizado y accesorios USB-C a juego."
  },
  {
    "id": "mac-mini-m4",
    "img": "assets/img/macbook.png",
    "badge": "Rediseño Ultracompacto",
    "price": 2999000,
    "specs": [
      "Nuevo diseño cuadrado de apenas 12.7 cm por lado con huella de carbono neutra",
      "16 GB de memoria unificada base (expandible hasta 64 GB en M4 Pro)",
      "2 puertos USB-C frontales + 3 puertos Thunderbolt 4/5 traseros + HDMI + Ethernet",
      "Ideal para desarrolladores, estudios creativos y servidores de IA local"
    ],
    "title": "Mac mini (Chip M4 y M4 Pro)",
    "colors": [
      {
        "hex": "#DCDFE3",
        "name": "Plata Clásica"
      }
    ],
    "category": "mac",
    "variants": [
      "Mac mini M4 (16GB/256GB) - $2.999.000",
      "Mac mini M4 (16GB/512GB) - $3.899.000",
      "Mac mini M4 Pro (24GB/512GB) - $6.699.000"
    ],
    "shortDesc": "Increíblemente pequeño (12.7 x 12.7 cm) y descomunalmente potente con puertos frontales USB-C y Thunderbolt 5 en M4 Pro."
  },
  {
    "id": "mac-studio-m4",
    "img": "assets/img/macbook.png",
    "badge": "Supercomputadora IA",
    "price": 9999000,
    "specs": [
      "Chips M4 Max (16 núcleos CPU) o M4 Ultra (hasta 32 núcleos CPU y 80 GPU)",
      "Hasta 256 GB de memoria unificada de ultra alto ancho de banda",
      "6 puertos Thunderbolt 5, Ethernet de 10 Gb, lector SDXC frontal y HDMI 2.1",
      "Sistema térmico silencioso de doble turbina en aluminio extruido"
    ],
    "title": "Mac Studio (M4 Max / M4 Ultra)",
    "colors": [
      {
        "hex": "#DCDFE3",
        "name": "Plata Clásica"
      }
    ],
    "category": "mac",
    "variants": [
      "M4 Max (36GB/512GB) - $9.999.000",
      "M4 Max (64GB/1TB) - $12.999.000",
      "M4 Ultra (128GB/2TB) - $21.999.000"
    ],
    "shortDesc": "La bestia de escritorio para producción cinematográfica 8K, compilación masiva y entrenamiento de modelos LLM locales."
  },
  {
    "id": "macbook-pro-m3",
    "img": "assets/img/macbook.png",
    "badge": "Oportunidad Pro",
    "price": 7299000,
    "specs": [
      "Chip Apple M3 Pro o M3 Max con trazado de rayos por hardware",
      "18 GB o 36 GB de memoria unificada ultrarrápida",
      "Puertos HDMI, lector SDXC, MagSafe 3 y 3x Thunderbolt 4",
      "Acabado Negro Espacial (Space Black) o Plata"
    ],
    "title": "MacBook Pro 14\" y 16\" (M3 Pro / Max)",
    "colors": [
      {
        "hex": "#2E3033",
        "name": "Negro Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "mac",
    "variants": [
      "14\" M3 Pro (18GB/512GB) - $7.299.000",
      "16\" M3 Pro (18GB/512GB) - $8.999.000"
    ],
    "shortDesc": "Pantalla Liquid Retina XDR, hasta 22 horas de batería y todos los puertos profesionales a precio especial de liquidación."
  },
  {
    "id": "macbook-air-m3",
    "img": "assets/img/macbook.png",
    "badge": "Favorita Estudiantes",
    "price": 4299000,
    "specs": [
      "Chip Apple M3 o M2 de 8 núcleos con diseño delgado de aluminio reciclado",
      "Pantalla Liquid Retina de 13.6\" o 15.3\" con True Tone",
      "Cámara FaceTime HD 1080p y Touch ID integrado",
      "Colores: Medianoche, Blanco Estelar, Gris Espacial y Plata"
    ],
    "title": "MacBook Air 13\" y 15\" (Chip M3 / M2)",
    "colors": [
      {
        "hex": "#1C2331",
        "name": "Medianoche"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "mac",
    "variants": [
      "13\" M2 (8GB/256GB) - $4.299.000",
      "13\" M3 (16GB/256GB) - $4.699.000",
      "15\" M3 (16GB/512GB) - $5.899.000"
    ],
    "shortDesc": "El ingreso ideal al mundo MacBook: ultraligera, silenciosa, con Wi-Fi 6E y hasta 18 horas de batería."
  },
  {
    "id": "ipad-pro-m5",
    "img": "assets/img/ipad.png",
    "badge": "Nuevo 2026 • Tandem OLED",
    "price": 6499000,
    "specs": [
      "Pantalla Ultra Retina XDR OLED en tándem con ProMotion 120Hz y opción Nano-Texturizada",
      "Chip Apple M5 con 16 GB de RAM base y motor neuronal para Apple Intelligence 3.0",
      "Conectividad Thunderbolt 5 / USB 4 y soporte para Apple Pencil Pro",
      "Escáner LiDAR de nueva generación y 4 micrófonos con calidad de estudio"
    ],
    "title": "iPad Pro 11\" y 13\" (Chip M5)",
    "colors": [
      {
        "hex": "#2E3033",
        "name": "Negro Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "ipad",
    "variants": [
      "11\" M5 Wi-Fi 256GB - $6.499.000",
      "11\" M5 Wi-Fi 512GB - $7.499.000",
      "13\" M5 Wi-Fi 256GB - $7.999.000"
    ],
    "shortDesc": "La cúspide de las tablets en 2026: Chip M5 de 2nm, pantalla Ultra Retina XDR Tandem OLED 2.0 y Wi-Fi 7 en solo 5.0 mm."
  },
  {
    "id": "ipad-pro-m4",
    "img": "assets/img/ipad.png",
    "badge": "Ultra Fino 5.1mm",
    "price": 5499000,
    "specs": [
      "Pantalla Ultra Retina XDR con brillo pico de 1600 nits HDR",
      "Chip M4 con motor neuronal de 38 billones de operaciones por segundo",
      "Compatible con Apple Pencil Pro y Magic Keyboard de aluminio con trackpad háptico",
      "Colores: Negro Espacial y Plata"
    ],
    "title": "iPad Pro 11\" y 13\" (Chip M4)",
    "colors": [
      {
        "hex": "#2E3033",
        "name": "Negro Espacial"
      },
      {
        "hex": "#E3E4E6",
        "name": "Plata"
      }
    ],
    "category": "ipad",
    "variants": [
      "11\" M4 Wi-Fi 256GB - $5.499.000",
      "11\" M4 Wi-Fi 512GB - $6.399.000",
      "13\" M4 Wi-Fi 256GB - $6.999.000"
    ],
    "shortDesc": "Pantalla Ultra Retina XDR OLED en tándem y el potente Chip M4 para diseño 3D, arquitectura y edición de video ProRes."
  },
  {
    "id": "ipad-air-m4",
    "img": "assets/img/ipad.png",
    "badge": "Nuevo 2026 • 11\" y 13\"",
    "price": 3599000,
    "specs": [
      "Chip Apple M4 de 8 núcleos CPU y 10 núcleos GPU con Ray Tracing",
      "Disponible en 11 pulgadas portátil y 13 pulgadas de gran formato",
      "Cámara frontal ultra gran angular de 12 MP en orientación horizontal",
      "Compatible con el nuevo Magic Keyboard y Apple Pencil Pro"
    ],
    "title": "iPad Air 11\" y 13\" (Chip M4)",
    "colors": [
      {
        "hex": "#9BB8D3",
        "name": "Azul Cielo"
      },
      {
        "hex": "#C6BEE2",
        "name": "Morado Pastel"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      }
    ],
    "category": "ipad",
    "variants": [
      "11\" M4 128GB Wi-Fi - $3.599.000",
      "11\" M4 256GB Wi-Fi - $4.199.000",
      "13\" M4 128GB Wi-Fi - $4.699.000"
    ],
    "shortDesc": "El iPad Air más veloz de la historia ahora con Chip M4, pantalla de alto brillo de 600 nits y soporte completo para Apple Pencil Pro."
  },
  {
    "id": "ipad-air-m2",
    "img": "assets/img/ipad.png",
    "badge": "Potencia M2",
    "price": 2999000,
    "specs": [
      "Chip Apple M2 con 8 GB de memoria unificada para Apple Intelligence",
      "Pantalla Liquid Retina con gama cromática P3 y revestimiento antirreflejo",
      "Touch ID integrado en el botón superior y Wi-Fi 6E",
      "Colores: Azul, Morado, Blanco Estelar y Gris Espacial"
    ],
    "title": "iPad Air 11\" y 13\" (Chip M2)",
    "colors": [
      {
        "hex": "#9BB8D3",
        "name": "Azul"
      },
      {
        "hex": "#C6BEE2",
        "name": "Morado"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      }
    ],
    "category": "ipad",
    "variants": [
      "11\" M2 128GB Wi-Fi - $2.999.000",
      "11\" M2 256GB Wi-Fi - $3.499.000",
      "13\" M2 128GB Wi-Fi - $3.999.000"
    ],
    "shortDesc": "Rendimiento M2 extraordinario en dos tamaños con pantalla Liquid Retina laminada y diseño en aluminio reciclado."
  },
  {
    "id": "ipad-mini-a17-pro",
    "img": "assets/img/ipad.png",
    "badge": "IA Ultraportátil 8.3\"",
    "price": 2699000,
    "specs": [
      "Chip A17 Pro con GPU de 5 núcleos y trazado de rayos por hardware",
      "Pantalla Liquid Retina de 8.3 pulgadas con True Tone y gama P3",
      "Compatible con Apple Pencil Pro (gesto de apretar y rotación)",
      "Puerto USB-C el doble de rápido (10 Gbps) y 128 GB de almacenamiento base"
    ],
    "title": "iPad mini (7.ª Gen - Chip A17 Pro)",
    "colors": [
      {
        "hex": "#A3B9D1",
        "name": "Azul Suave"
      },
      {
        "hex": "#C9C2DF",
        "name": "Morado"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#535150",
        "name": "Gris Espacial"
      }
    ],
    "category": "ipad",
    "variants": [
      "128 GB Wi-Fi - $2.699.000",
      "256 GB Wi-Fi - $3.199.000",
      "128 GB Wi-Fi + Cellular - $3.499.000"
    ],
    "shortDesc": "Toda la potencia del Chip A17 Pro y Apple Intelligence en un diseño compacto de 8.3 pulgadas compatible con Apple Pencil Pro."
  },
  {
    "id": "ipad-11-gen",
    "img": "assets/img/ipad.png",
    "badge": "Nuevo 2026 • Apple Intelligence",
    "price": 2199000,
    "specs": [
      "Pantalla Liquid Retina de 10.9 pulgadas de borde a borde",
      "Chip de nueva generación con 8 GB de RAM para multitarea fluida",
      "Cámara frontal horizontal de 12 MP con Encuadre Centrado",
      "Compatible con Magic Keyboard Folio y Apple Pencil (USB-C)"
    ],
    "title": "iPad (11.ª Generación - Chip A16 / A17)",
    "colors": [
      {
        "hex": "#5487B2",
        "name": "Azul Vivo"
      },
      {
        "hex": "#E4A2B6",
        "name": "Rosa Pastel"
      },
      {
        "hex": "#F3D458",
        "name": "Amarillo Solar"
      },
      {
        "hex": "#DCDFE3",
        "name": "Plata Clásica"
      }
    ],
    "category": "ipad",
    "variants": [
      "128 GB Wi-Fi - $2.199.000",
      "256 GB Wi-Fi - $2.699.000"
    ],
    "shortDesc": "El iPad más popular se renueva en 2026 con el doble de almacenamiento base (128 GB), chip preparado para IA y pantalla de 10.9\"."
  },
  {
    "id": "ipad-10-gen",
    "img": "assets/img/ipad.png",
    "badge": "Precio Especial",
    "price": 1799000,
    "specs": [
      "Pantalla Liquid Retina de 10.9\" con True Tone",
      "Chip A14 Bionic, conector USB-C y Touch ID en botón superior",
      "Cámaras de 12 MP y altavoces estéreo en horizontal",
      "Colores vibrantes: Azul, Rosa, Amarillo y Plata"
    ],
    "title": "iPad (10.ª Generación)",
    "colors": [
      {
        "hex": "#5487B2",
        "name": "Azul Vivo"
      },
      {
        "hex": "#DE6483",
        "name": "Rosa"
      },
      {
        "hex": "#F2D357",
        "name": "Amarillo"
      },
      {
        "hex": "#DCDFE3",
        "name": "Plata"
      }
    ],
    "category": "ipad",
    "variants": [
      "64 GB Wi-Fi - $1.799.000",
      "256 GB Wi-Fi - $2.399.000"
    ],
    "shortDesc": "Diseño moderno todo pantalla colorido ideal para colegio, universidad, lectura, streaming y notas digitales."
  },
  {
    "id": "watch-ultra-3",
    "img": "assets/img/watch.png",
    "badge": "Nuevo 2026 • Satelital",
    "price": 4499000,
    "specs": [
      "Caja de titanio aeroespacial de 49 mm (Titanio Natural o Titanio Negro Satinado)",
      "Chip S11 SiP con mensajes vía satélite sin necesidad de llevar el iPhone",
      "Detección de tendencias de presión arterial (hipertensión) y apnea del sueño",
      "Batería extrema de hasta 48 horas de uso normal y 96 horas en modo ahorro"
    ],
    "title": "Apple Watch Ultra 3 (49mm Titanio)",
    "colors": [
      {
        "hex": "#9E978E",
        "name": "Titanio Natural"
      },
      {
        "hex": "#222224",
        "name": "Titanio Negro Satinado"
      }
    ],
    "category": "watch",
    "variants": [
      "Titanio Natural 49mm - $4.499.000",
      "Titanio Negro 49mm - $4.599.000",
      "Con Correa Milanese de Titanio - $4.999.000"
    ],
    "shortDesc": "El reloj deportivo y de expedición definitivo 2026: conexión satelital fuera de red, alertas de hipertensión y pantalla OLED de 3500 nits."
  },
  {
    "id": "watch-series-12",
    "img": "assets/img/watch.png",
    "badge": "Nuevo 2026 • Salud IA",
    "price": 2499000,
    "specs": [
      "Diseño ultradelgado de 9.5 mm con cristal frontal de zafiro o Ion-X reforzado",
      "Chip S12 SiP con procesamiento neuronal en la muñeca y gesto de doble toque 2.0",
      "Monitoreo continuo de presión arterial, apnea del sueño, ECG y oxígeno en sangre",
      "Carga ultrarrápida: de 0 a 80% en apenas 20 minutos"
    ],
    "title": "Apple Watch Series 12 (42mm / 46mm)",
    "colors": [
      {
        "hex": "#111213",
        "name": "Negro Azabache (Jet Black)"
      },
      {
        "hex": "#E4C3B7",
        "name": "Oro Rosa"
      },
      {
        "hex": "#E4E5E7",
        "name": "Plata"
      },
      {
        "hex": "#44464B",
        "name": "Titanio Gris Pizarra"
      }
    ],
    "category": "watch",
    "variants": [
      "Aluminio 42mm GPS - $2.499.000",
      "Aluminio 46mm GPS - $2.699.000",
      "Titanio Pulido 46mm GPS+Cell - $3.899.000"
    ],
    "shortDesc": "Nuevo lanzamiento 2026: pantalla Micro-LED/LTPO3 ultrabrillante, sensor de presión arterial y entrenador de salud con Apple Intelligence."
  },
  {
    "id": "watch-series-11",
    "img": "assets/img/watch.png",
    "badge": "5G RedCap & Salud",
    "price": 2199000,
    "specs": [
      "Pantalla OLED de gran ángulo un 40% más brillante al mirarla de lado",
      "Chip S11 SiP con detección de caídas, choques y signos vitales nocturnos",
      "Sensores de profundidad y temperatura del agua para snorkel y natación",
      "Acabados: Negro Azabache brillante, Oro Rosa, Plata y Titanio"
    ],
    "title": "Apple Watch Series 11 (42mm / 46mm)",
    "colors": [
      {
        "hex": "#111213",
        "name": "Negro Azabache"
      },
      {
        "hex": "#E4C3B7",
        "name": "Oro Rosa"
      },
      {
        "hex": "#E4E5E7",
        "name": "Plata"
      }
    ],
    "category": "watch",
    "variants": [
      "Aluminio 42mm GPS - $2.199.000",
      "Aluminio 46mm GPS - $2.399.000",
      "Titanio 46mm GPS+Cell - $3.599.000"
    ],
    "shortDesc": "Gran pantalla de ángulo amplio, conectividad celular 5G RedCap de bajo consumo y métricas avanzadas de entrenamiento."
  },
  {
    "id": "watch-ultra-2",
    "img": "assets/img/watch.png",
    "badge": "Titanio Negro & Natural",
    "price": 3899000,
    "specs": [
      "Caja de titanio de 49 mm resistente a la corrosión con cristal de zafiro plano",
      "Botón de Acción personalizable en Naranja Internacional",
      "Hasta 36 horas de autonomía normal y 72 horas en modo bajo consumo",
      "Correas: Alpine Loop, Trail Loop, Ocean Band y Milanese de Titanio"
    ],
    "title": "Apple Watch Ultra 2 (49mm GPS + Cellular)",
    "colors": [
      {
        "hex": "#9E978E",
        "name": "Titanio Natural"
      },
      {
        "hex": "#222224",
        "name": "Titanio Negro"
      }
    ],
    "category": "watch",
    "variants": [
      "Titanio Natural 49mm - $3.899.000",
      "Titanio Negro Satinado 49mm - $3.999.000"
    ],
    "shortDesc": "Resistencia militar MIL-STD 810H, sirena de 86 decibeles, GPS de doble frecuencia L1+L5 y buceo recreativo hasta 40 metros."
  },
  {
    "id": "watch-series-10",
    "img": "assets/img/watch.png",
    "badge": "Diseño Delgado",
    "price": 1899000,
    "specs": [
      "Chip S10 SiP de 4 núcleos neuronales",
      "Sensores de temperatura del agua, profundidad, ECG y ciclo menstrual",
      "Notificaciones de apnea del sueño y frecuencia cardíaca alta/baja",
      "Acabados: Negro Azabache brillante, Oro Rosa y Plata"
    ],
    "title": "Apple Watch Series 10 (42mm / 46mm)",
    "colors": [
      {
        "hex": "#111213",
        "name": "Negro Azabache"
      },
      {
        "hex": "#E4C3B7",
        "name": "Oro Rosa"
      },
      {
        "hex": "#E4E5E7",
        "name": "Plata"
      }
    ],
    "category": "watch",
    "variants": [
      "Aluminio 42mm GPS - $1.899.000",
      "Aluminio 46mm GPS - $2.099.000"
    ],
    "shortDesc": "El rediseño clásico con pantalla amplia, reproducción de música por el altavoz integrado y carga rápida en 30 minutos."
  },
  {
    "id": "watch-se-3",
    "img": "assets/img/watch.png",
    "badge": "Nuevo 2026 • Calidad/Precio",
    "price": 1399000,
    "specs": [
      "Pantallas actualizadas de 41 mm y 45 mm con mayor área activa",
      "Chip S10 SiP ultrarrápido compatible con gestos y Siri en el dispositivo",
      "Resistencia al agua 50m, control del sueño y Configuración Familiar para niños",
      "Colores: Medianoche, Blanco Estelar, Azul y Plata"
    ],
    "title": "Apple Watch SE (3.ª Generación - 2026)",
    "colors": [
      {
        "hex": "#1C2331",
        "name": "Medianoche"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#E4E5E7",
        "name": "Plata"
      }
    ],
    "category": "watch",
    "variants": [
      "41mm GPS - $1.399.000",
      "45mm GPS - $1.549.000"
    ],
    "shortDesc": "El reloj inteligente esencial renovado con pantalla más grande de bordes delgados, chip S10 rápido y Detección de Choques."
  },
  {
    "id": "watch-se-2",
    "img": "assets/img/watch.png",
    "badge": "Acceso Apple Watch",
    "price": 1099000,
    "specs": [
      "Chip S8 SiP de doble núcleo",
      "Resistencia al agua hasta 50 metros para natación",
      "Monitoreo de frecuencia cardíaca, fases del sueño y llamadas de emergencia",
      "Cajas de 40 mm y 44 mm en Medianoche, Estelar y Plata"
    ],
    "title": "Apple Watch SE (2.ª Generación)",
    "colors": [
      {
        "hex": "#1C2331",
        "name": "Medianoche"
      },
      {
        "hex": "#F3EFE0",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#E4E5E7",
        "name": "Plata"
      }
    ],
    "category": "watch",
    "variants": [
      "40mm GPS - $1.099.000",
      "44mm GPS - $1.249.000"
    ],
    "shortDesc": "La forma más económica de estrenar Apple Watch original con todas las funciones de actividad, salud cardíaca y seguridad."
  },
  {
    "id": "airpods-pro-3",
    "img": "assets/img/airpods.png",
    "badge": "Nuevo 2026 • Chip H3 + Salud",
    "price": 1399000,
    "specs": [
      "Nuevo Chip H3 de ultra baja latencia y Audio Lossless inalámbrico",
      "Sensores biométricos de ritmo cardíaco y temperatura corporal integrados",
      "Cancelación Activa de Ruido (ANC) 4x y Modo Audífono Clínico 2.0",
      "Estuche MagSafe USB-C con altavoz, chip U2 de rastreo milimétrico y 36h de batería"
    ],
    "title": "AirPods Pro 3 (Estuche MagSafe USB-C con Pantalla Táctil)",
    "colors": [
      {
        "hex": "#FFFFFF",
        "name": "Blanco Brillante Original"
      },
      {
        "hex": "#27282A",
        "name": "Negro Titanio Hi-Fi"
      }
    ],
    "category": "airpods",
    "variants": [
      "AirPods Pro 3 (USB-C MagSafe 2026) - $1.399.000"
    ],
    "shortDesc": "La nueva generación 2026 con Chip H3, Cancelación Activa de Ruido 4x superior, sensor de frecuencia cardíaca y temperatura en oído, y traducción en vivo con Apple Intelligence."
  },
  {
    "id": "airpods-max-2",
    "img": "assets/img/airpods.png",
    "badge": "Nuevo 2026 • Studio Hi-Fi",
    "price": 2899000,
    "specs": [
      "Doble Chip H3 (uno en cada auricular) con ecualización computacional de 10 bandas",
      "Audio Lossless de 24 bits / 48 kHz sin latencia y Audio Espacial con seguimiento dinámico",
      "Cancelación Activa de Ruido profesional de nueva generación",
      "Colores 2026: Negro Titanio, Plata Estelar, Carmesí, Azul Medianoche y Morado"
    ],
    "title": "AirPods Max 2 (Chip H3 + Audio Lossless USB-C)",
    "colors": [
      {
        "hex": "#28292B",
        "name": "Negro Titanio"
      },
      {
        "hex": "#E4E5E7",
        "name": "Plata Estelar"
      },
      {
        "hex": "#2B3547",
        "name": "Azul Medianoche"
      },
      {
        "hex": "#A81C28",
        "name": "Carmesí RedCover"
      },
      {
        "hex": "#584C66",
        "name": "Morado Profundo"
      }
    ],
    "category": "airpods",
    "variants": [
      "Negro Titanio - $2.899.000",
      "Plata Estelar - $2.899.000",
      "Azul Medianoche - $2.899.000",
      "Carmesí Especial - $2.999.000"
    ],
    "shortDesc": "Diadema de alta fidelidad rediseñada en 2026: 30% más ligeros, Chip H3 dual en cada casco, Audio Adaptativo, Audio sin pérdida por USB-C y nuevos acabados en Titanio."
  },
  {
    "id": "airpods-4-anc",
    "img": "assets/img/airpods.png",
    "badge": "Best Seller • Diseño Abierto ANC",
    "price": 899000,
    "specs": [
      "Chip H2 con Cancelación Activa de Ruido y Aislamiento de Voz en llamadas",
      "Estuche de carga inalámbrica compatible con MagSafe, Apple Watch y USB-C con altavoz",
      "Audio Espacial personalizado con seguimiento dinámico de la cabeza",
      "Resistencia al polvo, al sudor y al agua (IP54) con hasta 30 horas de batería"
    ],
    "title": "AirPods 4 con Cancelación Activa de Ruido (ANC)",
    "colors": [
      {
        "hex": "#FFFFFF",
        "name": "Blanco Brillante Original"
      }
    ],
    "category": "airpods",
    "variants": [
      "AirPods 4 con ANC (Estuche Inalámbrico USB-C) - $899.000"
    ],
    "shortDesc": "Por primera vez, Cancelación Activa de Ruido, Audio Adaptativo y Modo Ambiente en un diseño abierto sin almohadillas de silicona."
  },
  {
    "id": "airpods-4",
    "img": "assets/img/airpods.png",
    "badge": "Gama Actual • Chip H2",
    "price": 679000,
    "specs": [
      "Chip H2 diseñado por Apple con graves profundos y agudos cristalinos",
      "Audio Espacial personalizado y gestos con la cabeza para responder a Siri",
      "Estuche de carga compacto USB-C con hasta 30 horas de autonomía total",
      "Certificación IP54 contra agua, sudor y polvo"
    ],
    "title": "AirPods 4 (Con Estuche de Carga USB-C)",
    "colors": [
      {
        "hex": "#FFFFFF",
        "name": "Blanco Brillante Original"
      }
    ],
    "category": "airpods",
    "variants": [
      "AirPods 4 Estándar (USB-C) - $679.000"
    ],
    "shortDesc": "Contorno ergonómico totalmente rediseñado para ofrecer comodidad todo el día, acústica superior con Chip H2 y llamadas nítidas."
  },
  {
    "id": "airpods-pro-2",
    "img": "assets/img/airpods.png",
    "badge": "Audio Pro • USB-C",
    "price": 1129000,
    "specs": [
      "Chip H2 con arquitectura acústica a medida y control táctil de volumen en el vástago",
      "Cuatro tamaños de almohadillas de silicona (XS, S, M, L) para sellado acústico",
      "Estuche de carga MagSafe (USB-C) con Rastreo Preciso y enganche para correa",
      "Protección IP54 y hasta 6 horas de escucha con una sola carga"
    ],
    "title": "AirPods Pro (2.ª Generación) con MagSafe USB-C",
    "colors": [
      {
        "hex": "#FFFFFF",
        "name": "Blanco Brillante Original"
      }
    ],
    "category": "airpods",
    "variants": [
      "AirPods Pro 2 (Estuche MagSafe USB-C) - $1.129.000"
    ],
    "shortDesc": "Cancelación Activa de Ruido de referencia, Audio Adaptativo, Detección de Conversación y funciones certificadas de Salud Auditiva."
  },
  {
    "id": "airpods-max-usbc",
    "img": "assets/img/airpods.png",
    "badge": "Alta Fidelidad • USB-C",
    "price": 2499000,
    "specs": [
      "Transductor dinámico de 40 mm con doble imán de neodimio sin distorsión",
      "9 micrófonos para Cancelación Activa de Ruido líder y Modo Ambiente",
      "Digital Crown para control preciso de volumen, pistas y llamadas",
      "Colores: Medianoche, Blanco Estelar, Azul, Morado y Naranja"
    ],
    "title": "AirPods Max (Edición USB-C)",
    "colors": [
      {
        "hex": "#1F242E",
        "name": "Medianoche"
      },
      {
        "hex": "#EDE8DD",
        "name": "Blanco Estelar"
      },
      {
        "hex": "#7799B5",
        "name": "Azul Cielo"
      },
      {
        "hex": "#887E98",
        "name": "Morado"
      },
      {
        "hex": "#DC6C4C",
        "name": "Naranja"
      }
    ],
    "category": "airpods",
    "variants": [
      "Medianoche USB-C - $2.499.000",
      "Blanco Estelar USB-C - $2.499.000",
      "Azul USB-C - $2.499.000"
    ],
    "shortDesc": "La experiencia definitiva de auriculares de diadema con transductores dinámicos diseñados por Apple, malla transpirable y aluminio anodizado."
  },
  {
    "id": "airpods-3",
    "img": "assets/img/airpods.png",
    "badge": "Clásico MagSafe",
    "price": 589000,
    "specs": [
      "Ecualización Adaptativa que ajusta la música en tiempo real a tu oído",
      "Audio Espacial tridimensional para música, películas y llamadas FaceTime",
      "Resistencia al agua y al sudor (IPX4) en auriculares y estuche",
      "Hasta 6 horas de reproducción continua y 30 horas con el estuche MagSafe"
    ],
    "title": "AirPods (3.ª Generación) con Estuche MagSafe",
    "colors": [
      {
        "hex": "#FFFFFF",
        "name": "Blanco Brillante Original"
      }
    ],
    "category": "airpods",
    "variants": [
      "AirPods 3.ª Gen (Estuche MagSafe) - $589.000"
    ],
    "shortDesc": "Audio Espacial con seguimiento dinámico de la cabeza, ecualización adaptativa y sensor de presión en un formato ligero."
  },
  {
    "id": "samsung-s26-ultra",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama 2026 • Buque Insignia Galaxy",
    "price": 6499000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.9\" QHD+ 120Hz con Gorilla Glass Armor 2 antirreflejo",
      "Procesador Snapdragon 8 Elite Gen 2 for Galaxy (2nm) con 16 GB de RAM",
      "Sistema Cuádruple: Principal 200 MP + Ultra Gran Angular 50 MP + Tele 50 MP (5x) + Tele 50 MP (3x)",
      "S-Pen integrado con Bluetooth, batería de 5.500 mAh con carga de 65W y 7 años de actualizaciones"
    ],
    "title": "Samsung Galaxy S26 Ultra 5G (256GB - 1TB • S-Pen)",
    "colors": [
      {
        "hex": "#242528",
        "name": "Titanio Negro"
      },
      {
        "hex": "#CED2D8",
        "name": "Titanio Plata Sombra"
      },
      {
        "hex": "#374B63",
        "name": "Titanio Azul Índigo"
      },
      {
        "hex": "#4B6358",
        "name": "Titanio Verde Jade"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB / 16GB RAM - Titanio Negro - $6.499.000",
      "512 GB / 16GB RAM - Titanio Plata - $7.199.000",
      "1 TB / 16GB RAM - Titanio Azul - $8.199.000"
    ],
    "shortDesc": "El nuevo rey Android de 2026: Chasis de Titanio Grado 5 con esquinas ergonómicas, procesador Snapdragon 8 Elite Gen 2 for Galaxy, cámara cuádruple de 200 MP + Periscopio 50 MP y Galaxy AI 3.0."
  },
  {
    "id": "samsung-s26-plus",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama 2026 • Gran Pantalla QHD+",
    "price": 5199000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ de hasta 2.800 nits y 1-120Hz",
      "Procesador de 2 nanómetros con cámara de vapor un 40% mayor y 12 GB de RAM",
      "Triple cámara ProVisual Engine de 50 MP con Nightography 2026 y grabación 8K",
      "Carga superrápida de 45W, carga inalámbrica Qi2 y certificación IP68"
    ],
    "title": "Samsung Galaxy S26+ 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#BDD2E2",
        "name": "Azul Hielo"
      },
      {
        "hex": "#222325",
        "name": "Negro Ónix"
      },
      {
        "hex": "#E0E2E5",
        "name": "Plata"
      },
      {
        "hex": "#9CB2A4",
        "name": "Verde Salvia"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Azul Hielo / Negro / Plata - $5.199.000",
      "512 GB - $5.799.000"
    ],
    "shortDesc": "Pantalla inmersiva QHD+ de 6.7 pulgadas con biseles ultradelgados, batería de 5.000 mAh de silicio-carbono y toda la suite Galaxy AI 3.0."
  },
  {
    "id": "samsung-s26",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama 2026 • Compacto Flagship",
    "price": 4299000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.2\" FHD+ LTPO 1-120Hz",
      "Procesador de nueva generación de 2nm con 12 GB de memoria RAM",
      "Triple cámara trasera de 50 MP + Teleobjetivo óptico 3x + Ultra Gran Angular 12 MP",
      "Batería de 4.300 mAh de alta densidad y resistencia al agua IP68"
    ],
    "title": "Samsung Galaxy S26 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#222325",
        "name": "Negro Ónix"
      },
      {
        "hex": "#B8DFD1",
        "name": "Menta Fresca"
      },
      {
        "hex": "#BDD2E2",
        "name": "Azul Hielo"
      },
      {
        "hex": "#E0E2E5",
        "name": "Plata"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Negro Ónix / Menta / Plata - $4.299.000",
      "512 GB - $4.799.000"
    ],
    "shortDesc": "Potencia de buque insignia en un formato compacto y ligero de 6.2\", con 12 GB de RAM base, Armor Aluminum y funciones completas de Galaxy AI."
  },
  {
    "id": "samsung-s26-slim",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama 2026 • Ultra Delgado 5.6mm",
    "price": 5599000,
    "specs": [
      "Chasis ultradelgado de 5.6 mm y solo 162 gramos con estructura de Titanio",
      "Pantalla Dynamic AMOLED 2X de 6.7\" 120Hz con Gorilla Glass Ceramic",
      "Cámara principal ISOCELL de 200 MP con zoom de calidad óptica 2x y 4x",
      "Procesador Snapdragon 8 Elite Gen 2 y Galaxy AI integrada"
    ],
    "title": "Samsung Galaxy S26 Slim / Edge 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#D2D5DA",
        "name": "Titanio Plata Ultra"
      },
      {
        "hex": "#202123",
        "name": "Titanio Carbón"
      },
      {
        "hex": "#E8DCC8",
        "name": "Titanio Oro Champagne"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Titanio Plata / Titanio Carbón - $5.599.000",
      "512 GB - $6.199.000"
    ],
    "shortDesc": "Ingeniería extrema en solo 5.6 mm de grosor con cámara principal de 200 MP, marco de titanio cepillado y pantalla de 6.7 pulgadas."
  },
  {
    "id": "samsung-z-fold-7",
    "img": "assets/img/iphone-pro.png",
    "badge": "Plegable Insignia 2026",
    "price": 8299000,
    "specs": [
      "Pantalla principal desplegable de 8.0\" Dynamic AMOLED 2X + Externa de 6.5\" formato 21:9",
      "Grosor plegado de apenas 8.9 mm con bisagra FlexHinge de titanio",
      "Cámara principal de 200 MP heredada de la línea Ultra + 12 GB / 16 GB de RAM",
      "Compatibilidad con S-Pen Fold Edition, resistencia IP48 y Galaxy AI para pantallas grandes"
    ],
    "title": "Samsung Galaxy Z Fold 7 5G (256GB - 1TB)",
    "colors": [
      {
        "hex": "#9D9FA2",
        "name": "Plata Sombra"
      },
      {
        "hex": "#1E1E20",
        "name": "Negro Jet"
      },
      {
        "hex": "#253549",
        "name": "Azul Marino Oscuro"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Plata Sombra / Negro - $8.299.000",
      "512 GB - $8.999.000",
      "1 TB - $9.999.000"
    ],
    "shortDesc": "El plegable más delgado y potente de Samsung: pantalla interna de 8.0\" sin pliegue perceptible, cámara Ultra de 200 MP y multitarea de escritorio DeX."
  },
  {
    "id": "samsung-z-flip-7",
    "img": "assets/img/iphone-16.png",
    "badge": "Plegable Compacto 2026",
    "price": 4999000,
    "specs": [
      "Pantalla externa Super AMOLED de 4.0\" 120Hz + Interna plegable de 6.8\" FHD+ 120Hz",
      "Cámara principal de 50 MP con Auto Zoom inteligente para manos libres en FlexCam",
      "Batería ampliada de 4.300 mAh y procesador de 3nm de alto rendimiento",
      "Colores: Azul Hielo, Verde Menta, Plata Sombra y Grafito"
    ],
    "title": "Samsung Galaxy Z Flip 7 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#A9C5D9",
        "name": "Azul Hielo"
      },
      {
        "hex": "#B8E0CE",
        "name": "Verde Menta"
      },
      {
        "hex": "#9D9FA2",
        "name": "Plata Sombra"
      },
      {
        "hex": "#D2CCE3",
        "name": "Lavanda Suave"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - $4.999.000",
      "512 GB - $5.499.000"
    ],
    "shortDesc": "Estilo icónico de bolsillo con nueva pantalla externa FlexWindow de borde a borde de 4.0\", cámara FlexCam de 50 MP con IA y batería de 4.300 mAh."
  },
  {
    "id": "samsung-s25-ultra",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama S25 (2025) • Titanio",
    "price": 5599000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.9\" QHD+ con Corning Gorilla Armor 2 antirreflejo",
      "Procesador Snapdragon 8 Elite for Galaxy (3nm) con NPU un 40% más rápida",
      "Cámara 200 MP + Nuevo Ultra Gran Angular 50 MP Macro + Teleobjetivos 50 MP (5x) y 10 MP (3x)",
      "Grabación de video Log profesional de 10 bits, Audio Eraser con IA y S-Pen integrado"
    ],
    "title": "Samsung Galaxy S25 Ultra 5G (256GB - 1TB • S-Pen)",
    "colors": [
      {
        "hex": "#8EA2B4",
        "name": "Azul Plata Titanio"
      },
      {
        "hex": "#29292B",
        "name": "Negro Titanio"
      },
      {
        "hex": "#9C9891",
        "name": "Gris Titanio"
      },
      {
        "hex": "#E6E7E9",
        "name": "Blanco Plata Titanio"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Azul Titanio / Negro Titanio / Gris Titanio - $5.599.000",
      "512 GB - $6.199.000",
      "1 TB - $7.199.000"
    ],
    "shortDesc": "Diseño de titanio con bordes redondeados, procesador Snapdragon 8 Elite for Galaxy, nueva cámara Ultra Gran Angular de 50 MP + Principal de 200 MP y S-Pen."
  },
  {
    "id": "samsung-s25-edge",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama S25 (2025) • 5.8mm Titanio",
    "price": 4899000,
    "specs": [
      "Perfil ultradelgado de 5.8 mm con marco de Titanio y Gorilla Glass Ceramic 2",
      "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ 120Hz",
      "Cámara principal de 200 MP con Nightography y Snapdragon 8 Elite for Galaxy",
      "12 GB de RAM y todas las funciones de agentes multimodales Galaxy AI"
    ],
    "title": "Samsung Galaxy S25 Edge 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#CED1D6",
        "name": "Plata Titanio"
      },
      {
        "hex": "#1E1F21",
        "name": "Negro Jet Titanio"
      },
      {
        "hex": "#B8CAD8",
        "name": "Azul Hielo Titanio"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Plata Titanio / Negro Jet / Azul Hielo - $4.899.000",
      "512 GB - $5.399.000"
    ],
    "shortDesc": "El Galaxy S25 ultradelgado de 5.8 mm y 163 gramos con chasis de titanio, pantalla QHD+ de 6.7\" y sensor principal de 200 MP."
  },
  {
    "id": "samsung-s25-plus",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama S25 (2025)",
    "price": 4499000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ (3120 x 1440) 120Hz",
      "Snapdragon 8 Elite for Galaxy en todas las versiones con 12 GB de RAM",
      "Triple cámara de 50 MP con motor ProVisual de nueva generación",
      "Carga rápida de 45W, Wi-Fi 7 y cuerpo de Armor Aluminum"
    ],
    "title": "Samsung Galaxy S25+ 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#23395B",
        "name": "Azul Marino"
      },
      {
        "hex": "#BFD1DF",
        "name": "Azul Hielo"
      },
      {
        "hex": "#C6E3D5",
        "name": "Menta"
      },
      {
        "hex": "#8E9196",
        "name": "Plata Sombra"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Azul Marino / Menta / Bruma / Plata - $4.499.000",
      "512 GB - $4.999.000"
    ],
    "shortDesc": "Gran pantalla QHD+ de 6.7 pulgadas con ProScaler AI, procesador Snapdragon 8 Elite for Galaxy, 12 GB de RAM y batería de 4.900 mAh."
  },
  {
    "id": "samsung-s25",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama S25 (2025)",
    "price": 3699000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.2\" FHD+ 1-120Hz de 2.600 nits",
      "Chip Snapdragon 8 Elite for Galaxy + 12 GB de memoria RAM",
      "Cámara triple: 50 MP Principal + 12 MP Ultra Gran Angular + 10 MP Teleobjetivo 3x",
      "Funciones Now Brief, Circle to Search y Traducción Simultánea de llamadas"
    ],
    "title": "Samsung Galaxy S25 5G (128GB - 256GB)",
    "colors": [
      {
        "hex": "#23395B",
        "name": "Azul Marino"
      },
      {
        "hex": "#BFD1DF",
        "name": "Azul Hielo"
      },
      {
        "hex": "#C6E3D5",
        "name": "Menta"
      },
      {
        "hex": "#8E9196",
        "name": "Plata Sombra"
      }
    ],
    "category": "samsung",
    "variants": [
      "128 GB - $3.699.000",
      "256 GB - $3.999.000"
    ],
    "shortDesc": "Compacto, ultraligero (162g) y potentísimo gracias al chip Snapdragon 8 Elite for Galaxy y 12 GB de RAM de serie para Galaxy AI."
  },
  {
    "id": "samsung-s25-fe",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama S25 • Fan Edition",
    "price": 2999000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.7\" 120Hz con Vision Booster",
      "Triple cámara de 50 MP con OIS y zoom óptico 3x",
      "Batería de 4.700 mAh para todo el día y certificación IP68",
      "Experiencia completa de Galaxy AI y One UI 7 / 8"
    ],
    "title": "Samsung Galaxy S25 FE 5G (128GB - 256GB)",
    "colors": [
      {
        "hex": "#2C2E30",
        "name": "Negro Grafito"
      },
      {
        "hex": "#9CB8CC",
        "name": "Azul Glaciar"
      },
      {
        "hex": "#B2DAC8",
        "name": "Verde Menta"
      },
      {
        "hex": "#D8DADC",
        "name": "Plata"
      }
    ],
    "category": "samsung",
    "variants": [
      "128 GB - $2.999.000",
      "256 GB - $3.299.000"
    ],
    "shortDesc": "La edición para fans con diseño más delgado, pantalla Dynamic AMOLED 2X de 6.7\", cámara de 50 MP con teleobjetivo óptico 3x y Galaxy AI."
  },
  {
    "id": "samsung-z-fold-6",
    "img": "assets/img/iphone-pro.png",
    "badge": "Plegable 2024/2025",
    "price": 6499000,
    "specs": [
      "Pantalla interna de 7.6\" QXGA+ 120Hz + Pantalla externa de 6.3\" 120Hz",
      "Procesador Snapdragon 8 Gen 3 for Galaxy con 12 GB de RAM",
      "Triple cámara trasera de 50 MP + cámara bajo pantalla (UDC)",
      "Diseño simétrico de bordes rectos con certificación IP48 y Armor Aluminum"
    ],
    "title": "Samsung Galaxy Z Fold 6 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#9D9FA2",
        "name": "Plata Sombra"
      },
      {
        "hex": "#273446",
        "name": "Azul Marino"
      },
      {
        "hex": "#E8C8D0",
        "name": "Rosa"
      },
      {
        "hex": "#1E1E20",
        "name": "Negro Artesanal"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Plata Sombra / Azul Marino / Rosa - $6.499.000",
      "512 GB - $6.999.000"
    ],
    "shortDesc": "Productividad sin límites en una pantalla desplegable de 7.6 pulgadas de 2.600 nits con Note Assist, Intérprete en doble pantalla y Snapdragon 8 Gen 3."
  },
  {
    "id": "samsung-z-flip-6",
    "img": "assets/img/iphone-16.png",
    "badge": "Plegable 2024/2025",
    "price": 3999000,
    "specs": [
      "Pantalla plegable de 6.7\" Dynamic AMOLED 2X + Externa FlexWindow de 3.4\"",
      "Snapdragon 8 Gen 3 for Galaxy con 12 GB de RAM y cámara de vapor",
      "Cámara principal de 50 MP + Ultra Gran Angular de 12 MP con Nightography",
      "Batería de 4.000 mAh y resistencia IP48"
    ],
    "title": "Samsung Galaxy Z Flip 6 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#A9C5D9",
        "name": "Azul"
      },
      {
        "hex": "#F4E397",
        "name": "Amarillo"
      },
      {
        "hex": "#B8E0CE",
        "name": "Menta"
      },
      {
        "hex": "#9D9FA2",
        "name": "Plata Sombra"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Azul / Amarillo / Menta / Plata - $3.999.000",
      "512 GB - $4.399.000"
    ],
    "shortDesc": "Plegable compacto con cámara mejorada de 50 MP, cámara de vapor por primera vez en un Flip, 12 GB de RAM y batería de 4.000 mAh."
  },
  {
    "id": "samsung-s24-ultra",
    "img": "assets/img/iphone-pro.png",
    "badge": "Gama S24 (2024) • Best Seller Titanio",
    "price": 4599000,
    "specs": [
      "Pantalla plana Dynamic AMOLED 2X de 6.8\" QHD+ 120Hz con Corning Gorilla Armor",
      "Procesador Snapdragon 8 Gen 3 for Galaxy con 12 GB de RAM",
      "Cuádruple cámara: 200 MP + Teleobjetivo 50 MP (5x) + Tele 10 MP (3x) + Ultra Gran Angular 12 MP",
      "S-Pen incluido, batería de 5.000 mAh (45W) y Galaxy AI completa"
    ],
    "title": "Samsung Galaxy S24 Ultra 5G (256GB - 1TB • S-Pen)",
    "colors": [
      {
        "hex": "#8F8B84",
        "name": "Gris Titanio"
      },
      {
        "hex": "#2D2C2E",
        "name": "Negro Titanio"
      },
      {
        "hex": "#524A5E",
        "name": "Violeta Titanio"
      },
      {
        "hex": "#EAE0B8",
        "name": "Amarillo Titanio"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Gris Titanio / Negro Titanio / Violeta Titanio - $4.599.000",
      "512 GB - $5.099.000",
      "1 TB - $5.799.000"
    ],
    "shortDesc": "El favorito en calidad/precio Pro: exterior de Titanio, pantalla plana de 6.8\" QHD+ antirreflejo, S-Pen integrado, cámara de 200 MP y Snapdragon 8 Gen 3."
  },
  {
    "id": "samsung-s24-plus",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama S24 (2024)",
    "price": 3699000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ LTPO 1-120Hz (2.600 nits)",
      "12 GB de RAM y 256 GB / 512 GB de almacenamiento ultrarrápido",
      "Triple cámara de 50 MP con Zoom con IA y Super HDR",
      "Batería de 4.900 mAh con carga superrápida de 45W e IP68"
    ],
    "title": "Samsung Galaxy S24+ 5G (256GB - 512GB)",
    "colors": [
      {
        "hex": "#28282B",
        "name": "Negro Ónix"
      },
      {
        "hex": "#C5C5C7",
        "name": "Gris Mármol"
      },
      {
        "hex": "#59536A",
        "name": "Violeta Cobalto"
      },
      {
        "hex": "#EFE4B8",
        "name": "Amarillo Ámbar"
      }
    ],
    "category": "samsung",
    "variants": [
      "256 GB - Negro Ónix / Gris Mármol / Violeta Cobalto - $3.699.000",
      "512 GB - $4.099.000"
    ],
    "shortDesc": "Resolución QHD+ de máxima nitidez en 6.7 pulgadas, 12 GB de memoria RAM, batería de 4.900 mAh y todas las herramientas de Galaxy AI."
  },
  {
    "id": "samsung-s24",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama S24 (2024)",
    "price": 2999000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.2\" FHD+ LTPO 1-120Hz con biseles mínimos",
      "Triple cámara: 50 MP Principal + 10 MP Teleobjetivo 3x + 12 MP Ultra Gran Angular",
      "Batería de 4.000 mAh optimizada por IA y resistencia al agua IP68",
      "Circle to Search, Live Translate y Edición Generativa de Fotos"
    ],
    "title": "Samsung Galaxy S24 5G (128GB - 256GB)",
    "colors": [
      {
        "hex": "#28282B",
        "name": "Negro Ónix"
      },
      {
        "hex": "#C5C5C7",
        "name": "Gris Mármol"
      },
      {
        "hex": "#59536A",
        "name": "Violeta Cobalto"
      },
      {
        "hex": "#EFE4B8",
        "name": "Amarillo Ámbar"
      }
    ],
    "category": "samsung",
    "variants": [
      "128 GB - $2.999.000",
      "256 GB - $3.299.000"
    ],
    "shortDesc": "Diseño compacto de 6.2 pulgadas con acabado satinado en Armor Aluminum, pantalla de 2.600 nits, cámara triple con zoom óptico 3x y Galaxy AI."
  },
  {
    "id": "samsung-s24-fe",
    "img": "assets/img/iphone-16.png",
    "badge": "Gama S24 (2024) • Fan Edition",
    "price": 2499000,
    "specs": [
      "Pantalla Dynamic AMOLED 2X de 6.7\" FHD+ 120Hz Gorilla Glass Victus+",
      "Sistema de triple cámara de 50 MP con OIS y zoom óptico 3x de 8 MP",
      "Batería de 4.700 mAh, carga inalámbrica y certificación IP68",
      "Colores: Azul, Grafito, Menta y Amarillo"
    ],
    "title": "Samsung Galaxy S24 FE 5G (128GB - 256GB)",
    "colors": [
      {
        "hex": "#A6C2D6",
        "name": "Azul"
      },
      {
        "hex": "#363839",
        "name": "Grafito"
      },
      {
        "hex": "#BCE0D0",
        "name": "Menta"
      },
      {
        "hex": "#F5E693",
        "name": "Amarillo"
      }
    ],
    "category": "samsung",
    "variants": [
      "128 GB - $2.499.000",
      "256 GB - $2.799.000"
    ],
    "shortDesc": "La entrada ideal a la serie S24 y Galaxy AI con gran pantalla de 6.7 pulgadas, cámara ProVisual Engine de 50 MP y batería de 4.700 mAh."
  },
  {
    "id": "rayban-meta-wayfarer",
    "img": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    "badge": "Ray-Ban Meta • Best Seller",
    "price": 1699000,
    "specs": [
      "Cámara de 12 MP Ultra HD para fotos y videos verticales en primera persona",
      "Sistema de 5 micrófonos y altavoces direccionales de oído abierto",
      "Lentes G-15 polarizados / Transitions fotocromáticos disponibles",
      "Estuche de carga de cuero con hasta 36 horas de batería total"
    ],
    "title": "Ray-Ban Meta Wayfarer (Estándar & Large)",
    "colors": [
      {
        "hex": "#18181A",
        "name": "Negro Brillante"
      },
      {
        "hex": "#2A2A2E",
        "name": "Negro Mate"
      },
      {
        "hex": "#5C3A21",
        "name": "Havana Carey"
      }
    ],
    "category": "gafas",
    "variants": [
      "Wayfarer Negro Brillante (Lente Verde G-15) - $1.699.000",
      "Wayfarer Negro Mate (Lente Polarizado Gris) - $1.799.000",
      "Wayfarer Negro (Lente Transitions Fotocromático) - $1.999.000"
    ],
    "shortDesc": "El ícono del estilo ahora con cámara ultra gran angular de 12 MP, grabación en primera persona 1080p, altavoces invisibles de oído abierto y asistente Meta AI integrado."
  },
  {
    "id": "rayban-meta-skyler",
    "img": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85",
    "badge": "Ray-Ban Meta • Nuevo Diseño",
    "price": 1699000,
    "specs": [
      "Montura ergonómica ligera con cámara de 12 MP y LED de privacidad",
      "Llamadas manos libres por WhatsApp y transmisión en vivo directa",
      "Resistencia al agua IPX4 y control táctil en la patilla",
      "Compatible con iOS y Android mediante la app Meta View"
    ],
    "title": "Ray-Ban Meta Skyler Smart Glasses",
    "colors": [
      {
        "hex": "#1A1A1D",
        "name": "Negro Brillante"
      },
      {
        "hex": "#D8D8DC",
        "name": "Gris Tiza"
      },
      {
        "hex": "#3B5998",
        "name": "Azul Hibisco"
      }
    ],
    "category": "gafas",
    "variants": [
      "Skyler Negro Brillante (Lente Azul / Gris) - $1.699.000",
      "Skyler Gris Tiza (Lente Transitions Zafiro) - $1.999.000"
    ],
    "shortDesc": "Diseño moderno tipo cat-eye inspirado en el glamour clásico con inteligencia artificial Meta AI, transmisión en directo en Instagram/Facebook y audio envolvente."
  },
  {
    "id": "rayban-meta-headliner",
    "img": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85",
    "badge": "Ray-Ban Meta • Clásico Redondeado",
    "price": 1699000,
    "specs": [
      "Cámara de 12 MP integrada en el marco y traducción en vivo con Meta AI",
      "Audio personalizado de graves profundos sin bloquear el sonido ambiental",
      "Almacenamiento interno de 32 GB (más de 500 fotos o 100 videos)",
      "Carga rápida: 50% de batería en solo 22 minutos dentro del estuche"
    ],
    "title": "Ray-Ban Meta Headliner Smart Glasses",
    "colors": [
      {
        "hex": "#1C1C1E",
        "name": "Negro Brillante"
      },
      {
        "hex": "#6B4423",
        "name": "Havana Carey"
      }
    ],
    "category": "gafas",
    "variants": [
      "Headliner Negro Brillante (Lente Verde G-15) - $1.699.000",
      "Headliner Carey / Havana (Lente Marrón Polarizado) - $1.799.000"
    ],
    "shortDesc": "La combinación perfecta entre la montura Wayfarer y Round. Captura momentos sin sacar tu iPhone del bolsillo, escucha tu música y traduce idiomas en tiempo real."
  },
  {
    "id": "rayban-meta-limited",
    "img": "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=900&q=85",
    "badge": "Ray-Ban Meta • Edición Transparente",
    "price": 2199000,
    "specs": [
      "Chasis transparente de edición numerada con arquitectura visible",
      "Procesador Qualcomm Snapdragon AR1 Gen 1 dedicado para IA",
      "Lentes originales Transitions Gen S que se oscurecen al sol en segundos",
      "Incluye estuche de carga edición especial y paño oficial Ray-Ban"
    ],
    "title": "Ray-Ban Meta Wayfarer Edición Limitada Transparente",
    "colors": [
      {
        "hex": "#E5E7EB",
        "name": "Cristal Transparente"
      },
      {
        "hex": "#991B1B",
        "name": "Rubí Espejado"
      }
    ],
    "category": "gafas",
    "variants": [
      "Edición Transparente Mate - Lente Transitions Rubí / Gris - $2.199.000"
    ],
    "shortDesc": "Edición de colección con montura transparente que deja ver la ingeniería interna de Qualcomm Snapdragon AR1 Gen 1 y lentes Transitions Rubí."
  }
];
