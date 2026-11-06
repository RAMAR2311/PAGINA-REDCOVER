    
    // Datos Dinámicos para iPhone 18 Pro, iPhone 18 Pro Max y iPhone Duo Plegable
    const heroFlagshipsData = {
      'iphone-18-pro': {
        titleMain: 'iPhone 18 Pro.',
        titleGradient: 'Negro carbón, Plata, Azul glaciar y Borgoña.',
        description: 'La cumbre de la ingeniería portátil. Chasis de Titanio Líquido ultraliviano, pantalla ProMotion de 240Hz sin bordes, Apple Intelligence 3.0 y zoom óptico periscópico continuo de 10x.',
        badge: 'Lanzamiento Oficial 2026 • Chip A20 Pro 2nm',
        ctaText: 'Reservar iPhone 18 Pro',
        specChip: 'Chip A20 Pro 2nm',
        specCam: 'Triple 48MP • Zoom 10x',
        targetId: 'iphone-18-pro',
        colors: [
          { name: 'Negro carbón', hex: '#1C1C1E' },
          { name: 'Plata', hex: '#E5E5EA' },
          { name: 'Azul glaciar', hex: '#A4C8E1' },
          { name: 'Borgoña', hex: '#5B1E28' }
        ]
      },
      'iphone-18-pro-max': {
        titleMain: 'iPhone 18 Pro Max.',
        titleGradient: 'Pantalla 6.9" Tandem OLED & Máxima Batería.',
        description: 'Poder descomunal en 6.9 pulgadas. Cámara de vapor de grafeno, autonomía récord de hasta 38 horas y sistema fotográfico profesional ProRAW de 48 MP con sensor principal de 1 pulgada.',
        badge: 'Buque Insignia 2026 • 6.9" Tandem OLED',
        ctaText: 'Reservar iPhone 18 Pro Max',
        specChip: 'A20 Pro Max + Vapor',
        specCam: 'ProRAW 48MP • Zoom 12x',
        targetId: 'iphone-18-pro-max',
        colors: [
          { name: 'Negro carbón', hex: '#1C1C1E' },
          { name: 'Plata', hex: '#E5E5EA' },
          { name: 'Azul glaciar', hex: '#A4C8E1' },
          { name: 'Borgoña', hex: '#5B1E28' }
        ]
      },
      'iphone-duo-fold': {
        titleMain: 'iPhone Duo.',
        titleGradient: 'Dos Pantallas. Cero Arrugas. Revolución Plegable.',
        description: 'El primer iPhone plegable de Apple. Bisagra de Titanio Líquido aeroespacial y doble pantalla Super Retina XDR que se despliega en un lienzo de 8.2 pulgadas con multitarea extrema.',
        badge: 'Edición Especial 2026 • Plegable Dual-Screen',
        ctaText: 'Reservar iPhone Duo Plegable',
        specChip: 'A20 Pro Dual-Engine',
        specCam: 'Sistema Plegable 8.2" OLED',
        targetId: 'iphone-duo-fold',
        colors: [
          { name: 'Blanco estrella', hex: '#F9F6EE' },
          { name: 'Cielo nocturno', hex: '#1B2430' }
        ]
      }
    };

    let activeFlagshipKey = 'iphone-18-pro';

    function switchHeroFlagship(key) {
      const data = heroFlagshipsData[key];
      if (!data) return;
      activeFlagshipKey = key;

      const btnPro = document.getElementById('btn-flagship-18-pro');
      const btnMax = document.getElementById('btn-flagship-18-pro-max');
      const btnDuo = document.getElementById('btn-flagship-duo');

      const activeClass = 'bg-gradient-to-r from-primary to-red-600 text-white shadow-md shadow-red-500/30';
      const inactiveClass = 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800';

      [btnPro, btnMax, btnDuo].forEach(b => {
        if (!b) return;
        b.className = `px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${inactiveClass}`;
      });

      if (key === 'iphone-18-pro' && btnPro) btnPro.className = `px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${activeClass}`;
      if (key === 'iphone-18-pro-max' && btnMax) btnMax.className = `px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${activeClass}`;
      if (key === 'iphone-duo-fold' && btnDuo) btnDuo.className = `px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${activeClass}`;

      const badgeEl = document.getElementById('hero-flagship-badge');
      if (badgeEl) badgeEl.innerText = data.badge;

      const specChipEl = document.getElementById('hero-spec-chip');
      if (specChipEl) specChipEl.innerText = data.specChip;

      const specCamEl = document.getElementById('hero-spec-cam');
      if (specCamEl) specCamEl.innerText = data.specCam;

      const titleMainEl = document.getElementById('cms-hero-title-main');
      const titleGradEl = document.getElementById('cms-hero-title-gradient');
      const descEl = document.getElementById('cms-hero-description');

      if (titleMainEl) {
        titleMainEl.innerText = data.titleMain;
        titleMainEl.removeAttribute('data-text-effect-applied');
        applyTextEffect('#cms-hero-title-main', 'char', 0.02);
      }
      if (titleGradEl) {
        // Para conservar intacto el bg-clip-text del gradiente, animamos el contenedor con blur/slide suave
        titleGradEl.innerText = data.titleGradient;
        titleGradEl.style.animation = 'none';
        titleGradEl.offsetHeight; // reflow
        titleGradEl.style.animation = 'textEffectFadeSlide 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      }
      if (descEl) {
        descEl.innerText = data.description;
        descEl.removeAttribute('data-text-effect-applied');
        applyTextEffect('#cms-hero-description', 'word', 0.18);
      }

      const ctaBtn = document.getElementById('hero-cta-primary-btn');
      const ctaText = document.getElementById('cms-hero-cta1');
      if (ctaBtn) {
        ctaBtn.href = `configuracion.html?id=${data.targetId}`;
        ctaBtn.setAttribute('onclick', `localStorage.setItem('redcover_selected_device_id', '${data.targetId}')`);
      }
      if (ctaText) ctaText.innerText = data.ctaText;

      renderHeroColorSwatches(data.colors);
    }

    function renderHeroColorSwatches(colors) {
      const swatchesContainer = document.getElementById('hero-color-swatches');
      const colorNameEl = document.getElementById('hero-color-name');
      if (!swatchesContainer || !colors || colors.length === 0) return;

      if (colorNameEl) colorNameEl.innerText = colors[0].name;

      swatchesContainer.innerHTML = colors.map((c, i) => `
        <button type="button" 
          onclick="selectHeroColorSwatch('${c.name}', this)" 
          title="${c.name}"
          class="w-6 h-6 rounded-full border-2 transition-all duration-200 ${i === 0 ? 'border-primary ring-2 ring-primary/40 scale-110' : 'border-gray-300 hover:scale-105'}" 
          style="background-color: ${c.hex};">
        </button>
      `).join('');
    }

    function selectHeroColorSwatch(name, btn) {
      const colorNameEl = document.getElementById('hero-color-name');
      if (colorNameEl) colorNameEl.innerText = name;

      const swatchesContainer = document.getElementById('hero-color-swatches');
      if (swatchesContainer) {
        swatchesContainer.querySelectorAll('button').forEach(b => {
          b.className = 'w-6 h-6 rounded-full border-2 border-gray-300 hover:scale-105 transition-all duration-200';
        });
        btn.className = 'w-6 h-6 rounded-full border-2 border-primary ring-2 ring-primary/40 scale-110 transition-all duration-200';
      }
    }

    function applyTextEffect(selector, per = 'char', baseDelay = 0) {
      const el = document.querySelector(selector);
      if (!el || el.dataset.textEffectApplied === 'true') return;
      el.dataset.textEffectApplied = 'true';
      const rawText = el.innerText;
      el.innerHTML = '';
      el.setAttribute('aria-label', rawText);

      if (per === 'char') {
        const chars = rawText.split('');
        chars.forEach((c, idx) => {
          const span = document.createElement('span');
          span.className = 'text-effect-char';
          span.textContent = c;
          span.style.animationDelay = (baseDelay + idx * 0.025) + 's';
          el.appendChild(span);
        });
      } else {
        const words = rawText.split(/(\s+)/);
        words.forEach((w, idx) => {
          const span = document.createElement('span');
          span.className = 'text-effect-word';
          span.textContent = w;
          span.style.animationDelay = (baseDelay + idx * 0.03) + 's';
          el.appendChild(span);
        });
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        switchHeroFlagship('iphone-18-pro');
      }, 100);
    });