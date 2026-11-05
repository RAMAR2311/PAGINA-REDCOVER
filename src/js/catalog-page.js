// =========================================================================
// CATALOGO.HTML — LÓGICA DE FILTRADO AVANZADO, SIDEBAR Y PRODUCTOS
// =========================================================================

(function() {
  // 1. Cargar Estado de Datos y Carrito
  let cms = null;
  try {
    const raw = localStorage.getItem('redcover_cms_data');
    if (raw) cms = JSON.parse(raw);
  } catch (e) {}

  // Dispositivos
  const devices = (cms && Array.isArray(cms.devices) && cms.devices.length > 0)
    ? cms.devices
    : (typeof allCatalogDevices !== 'undefined' ? allCatalogDevices : []);

  // Accesorios (Prioridad: CMS -> allCatalogAccessories [12 items oficiales] -> defaultCMSData)
  const accessories = (cms && Array.isArray(cms.accessories) && cms.accessories.length > 0)
    ? cms.accessories
    : (typeof allCatalogAccessories !== 'undefined' && Array.isArray(allCatalogAccessories) && allCatalogAccessories.length > 0
        ? allCatalogAccessories
        : (typeof defaultCMSData !== 'undefined' && Array.isArray(defaultCMSData.accessories) ? defaultCMSData.accessories : []));

  // Promociones y Combos Oficiales
  const offers = (cms && Array.isArray(cms.offers) && cms.offers.length > 0)
    ? cms.offers
    : (typeof allCatalogOffers !== 'undefined' && Array.isArray(allCatalogOffers) && allCatalogOffers.length > 0
        ? allCatalogOffers
        : (typeof defaultCMSData !== 'undefined' && Array.isArray(defaultCMSData.offers) ? defaultCMSData.offers : []));

  // Unificar catálogo completo con etiquetas de tipo
  const masterList = [
    ...devices.map(d => ({
      ...d,
      itemType: 'device',
      displayCategory: d.category || 'iphone',
      cleanPrice: Number(d.price) || 0
    })),
    ...accessories.map(a => ({
      ...a,
      itemType: 'accessory',
      displayCategory: 'accesorios',
      badge: 'Accesorio Original',
      shortDesc: a.desc || a.compat || 'Accesorio 100% original con garantía oficial Apple de 1 año.',
      cleanPrice: Number(a.price) || 0
    })),
    ...offers.map(o => ({
      ...o,
      itemType: 'offer',
      displayCategory: 'promociones',
      badge: o.discountBadge || '🔥 Oferta Especial',
      shortDesc: o.desc || 'Combo especial con descuento directo, garantía oficial y financiación a 24 cuotas.',
      cleanPrice: Number(o.price) || 0,
      oldPrice: Number(o.oldPrice) || (Number(o.price) * 1.2)
    }))
  ];

  // Carrito de compras
  let cart = JSON.parse(localStorage.getItem('redcover_cart') || '[]');
  function updateCartCounter() {
    const badge = document.getElementById('cart-counter-badge');
    if (badge) {
      const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      badge.innerText = totalCount;
    }
  }
  updateCartCounter();

  // Toast
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }

  function formatCOP(val) {
    return '$' + Math.round(val).toLocaleString('es-CO') + ' COP';
  }

  function calculate24(val) {
    return '$' + Math.round(val / 24).toLocaleString('es-CO') + ' COP';
  }

  // 2. Parámetros de URL Iniciales
  const urlParams = new URLSearchParams(window.location.search);
  let activeType = 'all'; // 'all' | 'devices' | 'accessories'
  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'featured';
  let currentPage = 1;
  const ITEMS_PER_PAGE = 12;

  const urlType = urlParams.get('tipo');
  if (urlType === 'productos' || urlType === 'equipos') activeType = 'devices';
  else if (urlType === 'accesorios') { activeType = 'accessories'; activeCategory = 'accesorios'; }

  const urlCat = urlParams.get('cat') || urlParams.get('categoria');
  if (urlCat) {
    activeCategory = urlCat.toLowerCase();
    if (activeCategory === 'accesorios') activeType = 'accessories';
    else if (activeCategory === 'promociones') activeType = 'all';
  }

  const urlQuery = urlParams.get('q');
  if (urlQuery) searchQuery = urlQuery;

  // 3. Elementos del DOM
  const grid = document.getElementById('catalog-products-grid');
  const noResults = document.getElementById('no-results-box');
  const resultsCountText = document.getElementById('results-count-text');
  const activeChipsContainer = document.getElementById('active-filter-chips');
  const paginationContainer = document.getElementById('catalog-pagination');
  const topSearch = document.getElementById('top-search-input');
  const sidebarSearch = document.getElementById('sidebar-search-input');
  const sortSelect = document.getElementById('sort-select');
  const typeBtns = document.querySelectorAll('.type-filter-btn');
  const catBtns = document.querySelectorAll('.cat-filter-btn');
  const catLabel = document.getElementById('active-category-label');
  const clearBtn = document.getElementById('btn-clear-filters');
  const mobileToggle = document.getElementById('mobile-filter-toggle');
  const sidebar = document.getElementById('catalog-sidebar');

  if (topSearch && searchQuery) topSearch.value = searchQuery;
  if (sidebarSearch && searchQuery) sidebarSearch.value = searchQuery;

  // Actualizar contadores de categorías en el sidebar
  function updateCategoryCounts() {
    const counts = { all: masterList.length };
    masterList.forEach(item => {
      const c = item.displayCategory;
      counts[c] = (counts[c] || 0) + 1;
    });

    ['all', 'promociones', 'iphone', 'mac', 'ipad', 'watch', 'airpods', 'samsung', 'gafas', 'accesorios'].forEach(key => {
      const badge = document.getElementById(`count-${key}`);
      if (badge) badge.innerText = counts[key] || 0;
    });
  }
  updateCategoryCounts();

  // 4. Filtrado y Ordenamiento
  function getFilteredItems() {
    return masterList.filter(item => {
      // Filtro de tipo
      if (activeType === 'devices' && item.itemType !== 'device') return false;
      if (activeType === 'accessories' && item.itemType !== 'accessory') return false;

      // Filtro de categoría
      if (activeCategory !== 'all' && item.displayCategory !== activeCategory) {
        return false;
      }

      // Filtro de búsqueda
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const t = (item.title || '').toLowerCase();
        const d = (item.shortDesc || item.desc || '').toLowerCase();
        const b = (item.badge || '').toLowerCase();
        if (!t.includes(q) && !d.includes(q) && !b.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (activeSort === 'price-asc') return a.cleanPrice - b.cleanPrice;
      if (activeSort === 'price-desc') return b.cleanPrice - a.cleanPrice;
      if (activeSort === 'name-asc') return (a.title || '').localeCompare(b.title || '');
      return 0; // featured default
    });
  }

  // 5. Renderizar Grilla de Productos
  function renderCatalog() {
    const items = getFilteredItems();
    const total = items.length;

    // Actualizar texto de conteo
    if (resultsCountText) {
      resultsCountText.innerText = `Mostrando ${total} producto${total === 1 ? '' : 's'}`;
    }

    // Actualizar Chips Activos
    if (activeChipsContainer) {
      let chipsHtml = '';
      if (activeType !== 'all') {
        const typeLabel = activeType === 'devices' ? 'Solo Equipos' : 'Solo Accesorios';
        chipsHtml += `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-primary text-[10px] font-bold border border-red-200">${typeLabel} <button onclick="resetTypeFilter()" class="hover:text-black">×</button></span>`;
      }
      if (activeCategory !== 'all') {
        chipsHtml += `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-[10px] font-bold border border-gray-200">${activeCategory.toUpperCase()} <button onclick="resetCatFilter()" class="hover:text-black">×</button></span>`;
      }
      if (searchQuery) {
        chipsHtml += `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold">"${searchQuery}" <button onclick="resetSearchFilter()" class="hover:text-red-400">×</button></span>`;
      }
      activeChipsContainer.innerHTML = chipsHtml;
    }

    if (total === 0) {
      if (grid) grid.innerHTML = '';
      if (noResults) noResults.classList.remove('hidden');
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    if (noResults) noResults.classList.add('hidden');

    // Paginación
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = items.slice(start, start + ITEMS_PER_PAGE);

    if (grid) {
      grid.innerHTML = paginated.map(item => {
        const isDevice = item.itemType === 'device';
        const isOffer = item.itemType === 'offer';
        return `
          <div class="rounded-3xl bg-white p-5 flex flex-col justify-between group border ${isOffer ? 'border-red-400/80 ring-2 ring-red-500/20 shadow-red-500/10' : 'border-gray-200'} hover:border-primary/50 transition-all shadow-xs hover:shadow-xl hover:-translate-y-1 relative">
            <div>
              <!-- Imagen del Producto / Accesorio / Promoción -->
              <div class="relative h-48 rounded-2xl overflow-hidden bg-zinc-950 mb-4 flex items-center justify-center cursor-pointer" onclick="viewItemDetail('${item.id}')">
                <span class="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full ${isOffer ? 'bg-red-600 animate-pulse' : 'bg-red-600'} text-[10px] font-black text-white uppercase tracking-wider shadow-sm">
                  ${item.badge || (isOffer ? '🔥 OFERTA' : 'Oficial Apple')}
                </span>
                ${item.topTag ? `
                  <span class="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-emerald-600 text-[9px] font-extrabold text-white uppercase tracking-wider shadow-sm">
                    ${item.topTag}
                  </span>
                ` : ''}
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${item.title}" src="${item.img}">
              </div>

              <!-- Metadatos de Garantía y Stock -->
              <div class="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase font-semibold">
                <span>${isOffer ? (item.stockLeftText || 'Unidades Limitadas') : 'Garantía Oficial 1 Año'}</span>
                <span class="${isOffer ? 'text-red-600 font-extrabold' : 'text-emerald-600 font-bold'}">● ${isOffer ? 'Oferta Activa' : 'En Stock'}</span>
              </div>

              <!-- Título y Descripción -->
              <h3 class="text-base font-black text-gray-900 mt-1 leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-1" onclick="viewItemDetail('${item.id}')" title="${item.title}">
                ${item.title}
              </h3>
              <p class="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                ${item.shortDesc || item.desc || ''}
              </p>
            </div>

            <!-- Precios y Acciones -->
            <div class="mt-4 pt-3.5 border-t border-gray-100 space-y-2.5">
              <div>
                <div class="flex items-baseline justify-between">
                  <span class="text-[11px] text-gray-400 font-medium">Precio contado:</span>
                  <div class="text-right">
                    ${item.oldPrice ? `<span class="text-[11px] text-gray-400 line-through mr-1.5 font-medium">${formatCOP(item.oldPrice)}</span>` : ''}
                    <span class="text-base font-black ${isOffer ? 'text-red-600' : 'text-gray-900'}">${formatCOP(item.cleanPrice)}</span>
                  </div>
                </div>
                <p class="text-[11px] text-primary font-bold text-right">o 24 cuotas de ${calculate24(item.cleanPrice)} (0%)</p>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button type="button" onclick="viewItemDetail('${item.id}')" class="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-sm">visibility</span> Ficha
                </button>
                ${isDevice ? `
                  <a href="iphone-16-pro.html?id=${item.id}" onclick="localStorage.setItem('redcover_selected_device_id', '${item.id}')" class="py-2.5 px-3 rounded-xl crimson-btn text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer">
                    <span class="material-symbols-outlined text-sm">tune</span> Configurar
                  </a>
                ` : `
                  <button type="button" onclick="addAccessoryToCart('${item.id}')" class="py-2.5 px-3 rounded-xl crimson-btn text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer">
                    <span class="material-symbols-outlined text-sm">shopping_bag</span> Comprar
                  </button>
                `}
              </div>

              <button type="button" onclick="chatWhatsAppItem('${encodeURIComponent(item.title)}', ${item.cleanPrice})" class="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-sm">chat</span> Financiación WhatsApp
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    // Renderizar Paginación
    if (paginationContainer) {
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
      } else {
        paginationContainer.innerHTML = `
          <div class="text-xs text-gray-500 font-medium">
            Página <span class="font-bold text-gray-900">${currentPage}</span> de <span class="font-bold text-gray-900">${totalPages}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button type="button" onclick="goToCatalogPage(${currentPage - 1})" class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 ${currentPage === 1 ? 'opacity-40 pointer-events-none' : ''}">
              <span class="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
              <button type="button" onclick="goToCatalogPage(${p})" class="w-8 h-8 rounded-xl text-xs font-extrabold ${p === currentPage ? 'bg-primary text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}">
                ${p}
              </button>
            `).join('')}
            <button type="button" onclick="goToCatalogPage(${currentPage + 1})" class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 ${currentPage === totalPages ? 'opacity-40 pointer-events-none' : ''}">
              <span class="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        `;
      }
    }
  }

  // 6. Manejo de Eventos de Filtro
  // Filtro de tipo
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => {
        b.classList.remove('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
        b.classList.add('text-gray-600', 'font-medium');
      });
      btn.classList.add('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
      btn.classList.remove('text-gray-600', 'font-medium');

      activeType = btn.getAttribute('data-type');
      currentPage = 1;
      renderCatalog();
    });
  });

  // Filtro de Categoría
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => {
        const isPromo = b.getAttribute('data-cat') === 'promociones';
        b.classList.remove('active', 'bg-red-50', 'text-primary', 'font-bold');
        if (!isPromo) {
          b.classList.add('text-gray-700', 'font-medium');
        }
      });
      btn.classList.add('active', 'bg-red-50', 'text-primary', 'font-bold');
      btn.classList.remove('text-gray-700', 'font-medium');

      activeCategory = btn.getAttribute('data-cat');
      if (activeCategory === 'promociones') {
        activeType = 'all';
        typeBtns.forEach(b => {
          if (b.getAttribute('data-type') === 'all') {
            b.classList.add('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
            b.classList.remove('text-gray-600', 'font-medium');
          } else {
            b.classList.remove('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
            b.classList.add('text-gray-600', 'font-medium');
          }
        });
      }
      if (catLabel) catLabel.innerText = activeCategory === 'promociones' ? '🔥 PROMOCIONES' : activeCategory.toUpperCase();
      currentPage = 1;
      renderCatalog();
    });
  });

  // Buscadores
  const handleSearch = (val) => {
    searchQuery = val;
    currentPage = 1;
    renderCatalog();
  };

  if (topSearch) topSearch.addEventListener('input', (e) => {
    if (sidebarSearch) sidebarSearch.value = e.target.value;
    handleSearch(e.target.value);
  });
  if (sidebarSearch) sidebarSearch.addEventListener('input', (e) => {
    if (topSearch) topSearch.value = e.target.value;
    handleSearch(e.target.value);
  });

  // Ordenamiento
  if (sortSelect) sortSelect.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderCatalog();
  });

  // Limpiar filtros
  if (clearBtn) clearBtn.addEventListener('click', () => {
    resetAllFilters();
  });

  window.resetAllFilters = function() {
    activeType = 'all';
    activeCategory = 'all';
    searchQuery = '';
    activeSort = 'featured';
    currentPage = 1;

    if (topSearch) topSearch.value = '';
    if (sidebarSearch) sidebarSearch.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    if (catLabel) catLabel.innerText = 'TODAS';

    typeBtns.forEach(b => {
      if (b.getAttribute('data-type') === 'all') {
        b.classList.add('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
      } else {
        b.classList.remove('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
      }
    });

    catBtns.forEach(b => {
      if (b.getAttribute('data-cat') === 'all') {
        b.classList.add('active', 'bg-red-50', 'text-primary', 'font-bold');
      } else {
        b.classList.remove('active', 'bg-red-50', 'text-primary', 'font-bold');
      }
    });

    renderCatalog();
  };

  window.resetTypeFilter = function() {
    activeType = 'all';
    typeBtns.forEach(b => {
      if (b.getAttribute('data-type') === 'all') b.classList.add('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
      else b.classList.remove('active', 'bg-white', 'text-gray-900', 'shadow-2xs', 'font-bold');
    });
    renderCatalog();
  };

  window.resetCatFilter = function() {
    activeCategory = 'all';
    if (catLabel) catLabel.innerText = 'TODAS';
    catBtns.forEach(b => {
      if (b.getAttribute('data-cat') === 'all') b.classList.add('active', 'bg-red-50', 'text-primary', 'font-bold');
      else b.classList.remove('active', 'bg-red-50', 'text-primary', 'font-bold');
    });
    renderCatalog();
  };

  window.resetSearchFilter = function() {
    searchQuery = '';
    if (topSearch) topSearch.value = '';
    if (sidebarSearch) sidebarSearch.value = '';
    renderCatalog();
  };

  window.goToCatalogPage = function(p) {
    currentPage = p;
    renderCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle móvil de filtros
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
      sidebar.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 7. Acciones de Carrito y WhatsApp
  window.addAccessoryToCart = function(accId) {
    const item = masterList.find(i => i.id === accId);
    if (!item) return;

    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({
        id: item.id,
        name: item.title,
        price: item.cleanPrice,
        img: item.img,
        quantity: 1,
        color: 'Original',
        capacity: 'Estándar'
      });
    }

    localStorage.setItem('redcover_cart', JSON.stringify(cart));
    updateCartCounter();
    showToast(`¡${item.title} agregado a tu bolsa!`);
  };

  window.chatWhatsAppItem = function(title, price) {
    const waPhone = (cms && cms.whatsappNumber) ? cms.whatsappNumber : '573001234567';
    const msg = `Hola RedCover Colombia 👋 Estoy interesado en el siguiente equipo:%0A` +
      `📱 Producto: ${title}%0A` +
      `💰 Precio: ${formatCOP(price)}%0A%0A` +
      `¿Podrían confirmarme disponibilidad inmediata y financiación a 24 cuotas sin interés?`;
    window.open(`https://wa.me/${waPhone}?text=${msg}`, '_blank');
  };

  // Modal de Detalle
  window.viewItemDetail = function(itemId) {
    const item = masterList.find(i => i.id === itemId);
    if (!item) return;

    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-product-img');
    const modalBadge = document.getElementById('modal-product-badge');
    const modalCat = document.getElementById('modal-product-cat');
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDesc = document.getElementById('modal-product-desc');
    const addBtn = document.getElementById('modal-add-cart-btn');
    const configLink = document.getElementById('modal-configurator-link');

    if (modalImg) modalImg.src = item.img;
    if (modalBadge) modalBadge.innerText = item.badge || 'Oficial Apple';
    if (modalCat) modalCat.innerText = item.displayCategory === 'promociones' ? 'COMBO PROMOCIONAL' : item.displayCategory.toUpperCase();
    if (modalTitle) modalTitle.innerText = item.title;
    if (modalPrice) {
      if (item.oldPrice) {
        modalPrice.innerHTML = `<span class="text-sm text-gray-400 line-through mr-2 font-normal">${formatCOP(item.oldPrice)}</span><span>${formatCOP(item.cleanPrice)}</span>`;
      } else {
        modalPrice.innerText = formatCOP(item.cleanPrice);
      }
    }
    if (modalDesc) modalDesc.innerText = item.shortDesc || item.desc || '';

    if (addBtn) {
      addBtn.onclick = () => {
        addAccessoryToCart(item.id);
        closeProductModal();
      };
    }

    if (configLink) {
      if (item.itemType === 'device') {
        configLink.classList.remove('hidden');
        configLink.href = `iphone-16-pro.html?id=${item.id}`;
        configLink.onclick = () => localStorage.setItem('redcover_selected_device_id', item.id);
      } else if (item.itemType === 'offer') {
        configLink.classList.remove('hidden');
        configLink.href = 'index.html#promociones';
        configLink.innerHTML = '<span class="material-symbols-outlined text-sm">local_fire_department</span> Ver en Inicio';
      } else {
        configLink.classList.add('hidden');
      }
    }

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  window.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  // Click en botón de carrito
  const cartBtn = document.getElementById('cart-toggle-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = 'index.html?openCart=true';
    });
  }

  // 8. Soporte de Modo Oscuro Oficial (redcover_dark_mode)
  const DARK_MODE_STORAGE_KEY = 'redcover_dark_mode';

  function initDarkMode() {
    const saved = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      updateDarkModeIcon(true);
    } else {
      document.documentElement.classList.remove('dark');
      updateDarkModeIcon(false);
    }
  }

  window.toggleDarkMode = function() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(DARK_MODE_STORAGE_KEY, isDark ? 'dark' : 'light');
    updateDarkModeIcon(isDark);
    showToast(isDark ? '🌙 Modo Oscuro activado' : '☀️ Modo Claro activado');
  };

  function updateDarkModeIcon(isDark) {
    const icon = document.getElementById('dark-mode-icon');
    if (icon) icon.innerText = isDark ? 'light_mode' : 'dark_mode';
  }

  initDarkMode();

  // Render inicial
  renderCatalog();
})();
