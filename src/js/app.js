    // Estado del Carrito (Sincronizado con localStorage)
    let cart = JSON.parse(localStorage.getItem('redcover_cart') || '[]');
    let appliedCanje = JSON.parse(localStorage.getItem('redcover_canje') || 'null');
    let cartFinancingMode = false;
    let lastCompletedOrder = null;

    function saveCartState() {
      localStorage.setItem('redcover_cart', JSON.stringify(cart));
      if (appliedCanje) {
        localStorage.setItem('redcover_canje', JSON.stringify(appliedCanje));
      } else {
        localStorage.removeItem('redcover_canje');
      }
    }

    
    // Navegación confiable al configurador garantizando el paso del ID seleccionado
    function goToConfigurator(deviceId) {
      if (!deviceId) return;
      try {
        localStorage.setItem('redcover_selected_device_id', deviceId);
      } catch (e) {}
      window.location.href = 'configuracion.html?id=' + encodeURIComponent(deviceId);
    }
  
    function formatCOP(val) {
      return '$' + Math.round(val).toLocaleString('es-CO') + ' COP';
    }

    function calculate24Installment(val) {
      return '$' + Math.round(val / 24).toLocaleString('es-CO') + ' COP/mes';
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');
      toastMsg.innerText = msg;
      toast.classList.remove('hidden');
      toast.classList.add('flex', 'toast-enter');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex', 'toast-enter');
      }, 2800);
    }

    // ==========================================
    // RENDERIZADO DEL CATÁLOGO DE PRODUCTOS CON PAGINACIÓN (MÁX 12: 3 FILAS x 4 COLUMNAS)
    // ==========================================
    let currentCatalogCategoryFilter = 'all';
    let currentCatalogPage = 1;
    const PRODUCTS_PER_PAGE = 12;
    let adminModeActive = false;

    function renderDevicesCatalog(filterCategory = currentCatalogCategoryFilter, page = currentCatalogPage) {
      if (filterCategory !== currentCatalogCategoryFilter) {
        currentCatalogCategoryFilter = filterCategory;
        currentCatalogPage = 1;
      } else {
        currentCatalogPage = page;
      }

      const grid = document.getElementById('full-devices-grid');
      const pagContainer = document.getElementById('devices-pagination');
      if (!grid) return;

      const filtered = currentCatalogCategoryFilter === 'all'
        ? allCatalogDevices
        : allCatalogDevices.filter(d => d.category === currentCatalogCategoryFilter);

      const totalItems = filtered.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / PRODUCTS_PER_PAGE));
      if (currentCatalogPage > totalPages) currentCatalogPage = totalPages;
      if (currentCatalogPage < 1) currentCatalogPage = 1;

      const startIndex = (currentCatalogPage - 1) * PRODUCTS_PER_PAGE;
      const paginatedItems = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

      grid.innerHTML = paginatedItems.map((dev) => {
        const realIdx = allCatalogDevices.findIndex(item => item.id === dev.id);
        return `
        <div class="rounded-3xl bg-white p-5 flex flex-col justify-between group border border-gray-200 hover:border-primary/60 transition-all shadow-sm hover:shadow-md relative">
          ${adminModeActive ? `
            <button type="button" onclick="openAdminEditDevice(${realIdx})" class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-zinc-900/95 hover:bg-primary text-white text-[10px] font-bold shadow-lg flex items-center gap-1 border border-white/20">
              <span class="material-symbols-outlined text-xs">edit</span> Editar Producto
            </button>
          ` : ''}
          <div>
            <div class="relative h-48 rounded-2xl overflow-hidden bg-zinc-950 mb-4 flex items-center justify-center cursor-pointer" onclick="openProductModal('${dev.id}')">
              <span class="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-red-600/90 text-[10px] font-bold text-white uppercase">${dev.badge}</span>
              <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${dev.title}" src="${dev.img}">
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase">
              <span>${dev.warranty || 'Garantía Oficial 1 Año'}</span>
              <span class="text-emerald-600 font-bold">${dev.stockStatus || '● En Stock'}</span>
            </div>
            <h3 class="text-base font-bold text-gray-900 mt-1 leading-snug cursor-pointer hover:text-primary transition-colors" onclick="openProductModal('${dev.id}')">${dev.title}</h3>
            <p class="text-xs text-gray-500 mt-1 line-clamp-2">${dev.shortDesc}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-100 space-y-2.5">
            <div>
              <div class="flex items-baseline justify-between">
                <span class="text-[11px] text-gray-400">Contado desde:</span>
                <span class="text-base font-extrabold text-gray-900">${formatCOP(dev.price)}</span>
              </div>
              <p class="text-[11px] text-primary font-medium text-right">o 24 cuotas de ${calculate24Installment(dev.price)} </p>
            </div>

            <a href="configuracion.html?id=${dev.id}" onclick="localStorage.setItem('redcover_selected_device_id', '${dev.id}')" class="w-full py-2.5 px-3 rounded-xl crimson-btn text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md">
              <span class="material-symbols-outlined text-sm">tune</span> Configurar y Elegir
            </a>
            <button type="button" onclick="directFinanceWhatsApp('${dev.title.replace(/'/g, "\\'")}', ${dev.price})" class="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">chat</span> Solicitar Financiación por WhatsApp
            </button>
          </div>
        </div>
      `;
      }).join('');

      if (pagContainer) {
        const showingFrom = totalItems === 0 ? 0 : startIndex + 1;
        const showingTo = Math.min(startIndex + PRODUCTS_PER_PAGE, totalItems);
        let pageButtonsHTML = '';

        for (let p = 1; p <= totalPages; p++) {
          const isCurrent = p === currentCatalogPage;
          pageButtonsHTML += `
            <button type="button" onclick="goToCatalogPage(${p})" class="w-9 h-9 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center ${isCurrent ? 'bg-primary text-white shadow-md scale-105' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'}">
              ${p}
            </button>
          `;
        }

        pagContainer.innerHTML = `
          <div class="text-xs text-gray-500 font-medium">
            Mostrando <strong class="text-gray-900">${showingFrom}–${showingTo}</strong> de <strong class="text-primary">${totalItems} productos</strong> (Página ${currentCatalogPage} de ${totalPages})
          </div>
          <div class="flex flex-wrap items-center justify-center gap-1.5">
            <button type="button" onclick="goToCatalogPage(${currentCatalogPage - 1})" ${currentCatalogPage === 1 ? 'disabled' : ''} class="px-3.5 h-9 rounded-xl text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-all">
              <span class="material-symbols-outlined text-sm">chevron_left</span> Anterior
            </button>
            ${pageButtonsHTML}
            <button type="button" onclick="goToCatalogPage(${currentCatalogPage + 1})" ${currentCatalogPage === totalPages ? 'disabled' : ''} class="px-3.5 h-9 rounded-xl text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-all">
              Siguiente <span class="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        `;
      }
    }

    function goToCatalogPage(page) {
      renderDevicesCatalog(currentCatalogCategoryFilter, page);
      const sec = document.getElementById('catalogo-dispositivos');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function filterDevices(category) {
      currentCatalogCategoryFilter = category;
      currentCatalogPage = 1;
      document.querySelectorAll('.dev-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-dev-filter') === category) {
          btn.className = "dev-tab-btn px-5 py-2.5 rounded-full text-xs font-bold bg-primary text-white shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5";
        } else {
          btn.className = "dev-tab-btn px-5 py-2.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all whitespace-nowrap flex items-center gap-1.5";
        }
      });
      renderDevicesCatalog(category, 1);
    }

    function filterAndScroll(category) {
      closeMegaMenu();
      filterDevices(category);
      const sec = document.getElementById('catalogo-dispositivos');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    }

    // ==========================================
    // MODAL DE DETALLE Y CONFIGURACIÓN DE PRODUCTO
    // ==========================================
    function openProductModal(productId) {
      closeMegaMenu();
      let dev = allCatalogDevices.find(d => d.id === productId);
      if (!dev && productId === 'airpods-pro-2') {
        dev = {
          id: 'airpods-pro-2',
          badge: 'Audio Pro',
          title: 'AirPods Pro 2 con Estuche MagSafe (USB-C)',
          price: 1299000,
          img: IMG_AIRPODS,
          shortDesc: 'Cancelación activa de ruido hasta 2 veces superior, Audio Adaptativo y Audio Espacial personalizado.',
          specs: ['Chip H2 diseñado por Apple', 'Hasta 6 horas de audio con una sola carga (30h con estuche)', 'Resistencia al polvo, al sudor y al agua (IP54)', 'Estuche MagSafe con altavoz integrado y Rastreo Preciso'],
          variants: ['Edición USB-C MagSafe - $1.299.000']
        };
      }
      if (!dev) return;

      const modal = document.getElementById('product-detail-modal');
      const body = document.getElementById('product-modal-body');

      body.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div class="md:col-span-5 rounded-2xl overflow-hidden bg-zinc-950 h-64 sm:h-72 flex items-center justify-center relative">
            <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase">${dev.badge}</span>
            <img src="${dev.img}" alt="${dev.title}" class="w-full h-full object-cover">
          </div>
          <div class="md:col-span-7 space-y-4 text-left">
            <div>
              <span class="text-[11px] font-mono text-emerald-600 font-bold">● En Stock Oficial Colombia • Envío Gratis</span>
              <h3 class="text-2xl font-extrabold text-gray-900 mt-1">${dev.title}</h3>
              <p class="text-xs text-gray-600 mt-1 leading-relaxed">${dev.shortDesc}</p>
            </div>

            <div class="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">Especificaciones Destacadas:</span>
              <ul class="text-xs text-gray-600 space-y-1">
                ${dev.specs.map(s => `<li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-sm">check_circle</span> ${s}</li>`).join('')}
              </ul>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1.5">Selecciona versión / capacidad:</label>
              <select id="modal-variant-select" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold bg-white text-gray-900">
                ${dev.variants.map(v => `<option value="${v}">${v}</option>`).join('')}
              </select>
            </div>

            <div class="pt-2 border-t border-gray-100 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span class="text-xs text-gray-500 block">Precio Oficial Contado:</span>
                <span class="text-2xl font-extrabold text-gray-900">${formatCOP(dev.price)}</span>
              </div>
              <div class="text-right">
                <span class="text-xs text-emerald-700 font-bold block">Financiación:</span>
                <span class="text-xs text-gray-600">24 cuotas de <strong>${calculate24Installment(dev.price)}</strong></span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <a href="configuracion.html?id=${dev.id}" onclick="localStorage.setItem('redcover_selected_device_id', '${dev.id}')" class="py-3 px-4 rounded-full crimson-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-base">tune</span>
                Configurar y Comprar
              </a>
              <button type="button" onclick="financeFromProductModal('${dev.title.replace(/'/g, "\\'")}', ${dev.price})" class="py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-base">chat</span>
                Solicitar Financiación por WhatsApp
              </button>
            </div>
            <div class="text-center pt-1 flex items-center justify-center gap-4">
              <a href="configuracion.html?id=${dev.id}" onclick="localStorage.setItem('redcover_selected_device_id', '${dev.id}')" class="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
                Ir al Configurador Completo (Color, Capacidad y Canje) <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <button type="button" onclick="addFromProductModal('${dev.title.replace(/'/g, "\\'")}', ${dev.price}, '${dev.img}')" class="text-xs font-semibold text-gray-500 hover:text-gray-900 underline">
                + Añadir rápido a la bolsa
              </button>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeProductModal() {
      const modal = document.getElementById('product-detail-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function addFromProductModal(baseTitle, basePrice, img) {
      const sel = document.getElementById('modal-variant-select');
      const variantText = sel ? sel.value : baseTitle;
      addToCart(`${baseTitle} [${variantText}]`, basePrice, img);
      closeProductModal();
      setTimeout(openCart, 400);
    }

    function financeFromProductModal(baseTitle, basePrice) {
      const sel = document.getElementById('modal-variant-select');
      const variantText = sel ? sel.value : baseTitle;
      directFinanceWhatsApp(`${baseTitle} (${variantText})`, basePrice);
    }

    function directFinanceWhatsApp(productTitle, price) {
      const installment = calculate24Installment(price);
      let msg = `Hola RedCover Colombia 👋 Quiero solicitar la *FINANCIACIÓN* para:%0A%0A` +
        `📱 *Producto:* ${encodeURIComponent(productTitle)}%0A` +
        `💰 *Precio de contado:* ${encodeURIComponent(formatCOP(price))}%0A` +
        `💳 *Cuota estimada:* ${encodeURIComponent(installment)} (24 cuotas sin interés)%0A`;

      if (appliedCanje) {
        msg += `🔄 *Bono Plan Canje aplicado:* -${encodeURIComponent(formatCOP(appliedCanje.amount))} (Entregando ${encodeURIComponent(appliedCanje.device)})%0A`;
      }

      msg += `%0A¿Me indican los pasos para el estudio de crédito inmediato?`;
      const waPhone = (typeof cmsData !== 'undefined' && cmsData.whatsappNumber) ? cmsData.whatsappNumber : '573001234567';
      window.open(`https://wa.me/${waPhone}?text=${msg}`, '_blank');
    }

    // ==========================================
    // GESTIÓN DEL CARRITO + BONO PLAN CANJE
    // ==========================================
    function addToCart(title, price, img) {
      const existing = cart.find(item => item.title === title);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ title, price, img, qty: 1 });
      }
      saveCartState();
      updateCartUI();
      showToast(`${title} añadido a la bolsa`);
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      saveCartState();
      updateCartUI();
    }

    function changeQty(index, delta) {
      if (!cart[index]) return;
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      saveCartState();
      updateCartUI();
    }

    function removeAppliedCanje() {
      appliedCanje = null;
      saveCartState();
      updateCartUI();
      showToast('Bono de Plan Canje retirado');
    }

    function getCartNetTotal() {
      const rawTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const discount = appliedCanje ? appliedCanje.amount : 0;
      return Math.max(0, rawTotal - discount);
    }

    function updateCartUI() {
      const counter = document.getElementById('cart-counter');
      const itemsContainer = document.getElementById('cart-items');
      const emptyMsg = document.getElementById('empty-cart-msg');
      const totalEl = document.getElementById('cart-total');
      const canjeRow = document.getElementById('cart-canje-row');
      const canjeDevice = document.getElementById('cart-canje-device');
      const canjeAmount = document.getElementById('cart-canje-amount');

      const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
      counter.innerText = totalQty;

      if (appliedCanje && canjeRow) {
        canjeRow.classList.remove('hidden');
        canjeDevice.innerText = `${appliedCanje.device} (${appliedCanje.battery}, ${appliedCanje.condition})`;
        canjeAmount.innerText = `-${formatCOP(appliedCanje.amount)}`;
      } else if (canjeRow) {
        canjeRow.classList.add('hidden');
      }

      if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        itemsContainer.appendChild(emptyMsg);
        emptyMsg.classList.remove('hidden');
        totalEl.innerText = '$0 COP';
        return;
      }

      emptyMsg.classList.add('hidden');
      itemsContainer.innerHTML = '';

      cart.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80';
        row.innerHTML = `
          <img src="${item.img}" class="w-14 h-14 rounded-lg object-cover bg-black shrink-0" alt="${item.title}">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-gray-900 truncate">${item.title}</h4>
            <p class="text-xs text-primary font-bold">${formatCOP(item.price)}</p>
            <div class="flex items-center gap-2 mt-1">
              <button onclick="changeQty(${idx}, -1)" class="w-5 h-5 rounded bg-white border border-gray-300 text-xs flex items-center justify-center font-bold hover:bg-gray-100">-</button>
              <span class="text-xs font-semibold text-gray-700">${item.qty}</span>
              <button onclick="changeQty(${idx}, 1)" class="w-5 h-5 rounded bg-white border border-gray-300 text-xs flex items-center justify-center font-bold hover:bg-gray-100">+</button>
            </div>
          </div>
          <button onclick="removeFromCart(${idx})" class="text-gray-400 hover:text-red-500 p-1">
            <span class="material-symbols-outlined text-lg">delete</span>
          </button>
        `;
        itemsContainer.appendChild(row);
      });

      totalEl.innerText = formatCOP(getCartNetTotal());
    }

    function toggleCartFinancing(checked) {
      cartFinancingMode = checked;
      const btn = document.getElementById('checkout-btn');
      const text = document.getElementById('checkout-btn-text');
      const icon = document.getElementById('checkout-btn-icon');

      if (checked) {
        btn.className = "w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 uppercase tracking-wider transition-all";
        text.innerText = "Solicitar Financiación por WhatsApp";
        icon.innerText = "chat";
      } else {
        btn.className = "w-full py-3.5 rounded-full crimson-btn text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 uppercase tracking-wider transition-all";
        text.innerText = "Iniciar Compra Segura";
        icon.innerText = "lock";
      }
    }

    // Cart Drawer Toggle
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const cartPanel = document.getElementById('cart-panel');

    function openCart() {
      cartBackdrop.classList.remove('hidden');
      setTimeout(() => {
        cartBackdrop.classList.remove('opacity-0');
        cartPanel.classList.remove('translate-x-full');
      }, 10);
    }

    function closeCart() {
      cartBackdrop.classList.add('opacity-0');
      cartPanel.classList.add('translate-x-full');
      setTimeout(() => {
        cartBackdrop.classList.add('hidden');
      }, 300);
    }

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // ==========================================
    // BUSCADOR EN TIEMPO REAL
    // ==========================================
    const searchBtn = document.getElementById('search-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-container');

    function getAllSearchableProducts() {
      const items = allCatalogDevices.map(d => ({
        title: d.title,
        price: d.price,
        img: d.img,
        category: d.badge,
        id: d.id
      }));
      // Also include all accessories from DOM
      document.querySelectorAll('.acc-card').forEach(card => {
        const h3 = card.querySelector('h3');
        const img = card.querySelector('img');
        const btn = card.querySelector('button[onclick^="addToCart"]');
        if (h3 && img && btn) {
          const match = btn.getAttribute('onclick').match(/addToCart\('([^']+)',\s*(\d+)/);
          if (match) {
            items.push({
              title: h3.innerText,
              price: parseInt(match[2], 10),
              img: img.src,
              category: 'Accesorio Oficial',
              id: null
            });
          }
        }
      });
      return items;
    }

    function renderSearchResults(query = '') {
      const allItems = getAllSearchableProducts();
      const q = query.trim().toLowerCase();
      const results = q === '' ? allItems.slice(0, 6) : allItems.filter(item =>
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );

      if (results.length === 0) {
        searchResultsContainer.innerHTML = `
          <div class="text-center py-8 text-gray-400 text-xs">
            No encontramos productos para "${query}". Prueba con 'iPhone', 'MacBook', 'iPad', 'Watch' o 'MagSafe'.
          </div>
        `;
        return;
      }

      searchResultsContainer.innerHTML = results.map(item => `
        <div class="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-red-50/40 border border-gray-200 transition-all">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${item.img}" class="w-12 h-12 rounded-xl object-cover bg-zinc-900 shrink-0" alt="${item.title}">
            <div class="min-w-0">
              <span class="text-[10px] font-bold text-primary uppercase">${item.category}</span>
              <h4 class="text-xs font-bold text-gray-900 truncate">${item.title}</h4>
              <p class="text-xs font-extrabold text-gray-700">${formatCOP(item.price)}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            ${item.id ? `<button type="button" onclick="searchModal.classList.add('hidden'); searchModal.classList.remove('flex'); openProductModal('${item.id}')" class="px-3 py-1.5 rounded-full bg-white border border-gray-300 text-[11px] font-bold text-gray-800 hover:border-primary">Ficha</button>` : ''}
            ${item.id
              ? `<a href="configuracion.html?id=${item.id}" onclick="localStorage.setItem('redcover_selected_device_id', '${item.id}')" class="px-3 py-1.5 rounded-full crimson-btn text-white text-[11px] font-bold">Comprar</a>`
              : `<button type="button" onclick="addToCart('${item.title.replace(/'/g, "\\'")}', ${item.price}, '${item.img}'); searchModal.classList.add('hidden'); searchModal.classList.remove('flex'); openCart();" class="px-3 py-1.5 rounded-full crimson-btn text-white text-[11px] font-bold">+ Bolsa</button>`
            }
          </div>
        </div>
      `).join('');
    }

    function triggerQuickSearch(term) {
      searchInput.value = term;
      renderSearchResults(term);
    }

    searchBtn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      searchModal.classList.add('flex');
      renderSearchResults(searchInput.value);
      setTimeout(() => searchInput.focus(), 50);
    });

    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    closeSearchBtn.addEventListener('click', () => {
      searchModal.classList.add('hidden');
      searchModal.classList.remove('flex');
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.add('hidden');
        searchModal.classList.remove('flex');
      }
    });

    // ==========================================
    // PLAN CANJE CON BATERÍA Y ESTADO DEL EQUIPO
    // ==========================================
    const deviceSelect = document.getElementById('device-select');
    const batteryButtons = document.querySelectorAll('.battery-btn');
    const conditionButtons = document.querySelectorAll('.condition-btn');
    const calculatedBonus = document.getElementById('calculated-bonus');
    const applyCanjeBtn = document.getElementById('apply-canje-btn');
    const batteryTag = document.getElementById('battery-tag');
    const conditionTag = document.getElementById('condition-tag');

    let currentBatteryFactor = 1.0;
    let currentBatteryLabel = 'Óptima (≥ 85%)';
    let currentConditionFactor = 1.0;
    let currentConditionLabel = 'Impecable (Sin detalles)';

    function getCurrentCanjeAmount() {
      const baseValue = parseFloat(deviceSelect.value);
      return Math.round(baseValue * currentConditionFactor * currentBatteryFactor);
    }

    function recalculateCanje() {
      calculatedBonus.innerText = formatCOP(getCurrentCanjeAmount());
    }

    if (deviceSelect) {
      deviceSelect.addEventListener('change', recalculateCanje);
    }

    batteryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        batteryButtons.forEach(b => {
          b.classList.remove('border-primary', 'text-primary', 'border-2', 'font-bold');
          b.classList.add('border-gray-300', 'text-gray-600', 'border');
        });
        btn.classList.remove('border-gray-300', 'text-gray-600', 'border');
        btn.classList.add('border-primary', 'text-primary', 'border-2', 'font-bold');
        currentBatteryFactor = parseFloat(btn.getAttribute('data-battery-factor'));
        currentBatteryLabel = btn.getAttribute('data-label') || '≥ 85%';
        if (batteryTag) batteryTag.innerText = currentBatteryLabel;
        recalculateCanje();
      });
    });

    conditionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        conditionButtons.forEach(b => {
          b.classList.remove('border-primary', 'text-primary', 'border-2', 'font-bold');
          b.classList.add('border-gray-300', 'text-gray-600', 'border');
        });
        btn.classList.remove('border-gray-300', 'text-gray-600', 'border');
        btn.classList.add('border-primary', 'text-primary', 'border-2', 'font-bold');
        currentConditionFactor = parseFloat(btn.getAttribute('data-condition-factor'));
        currentConditionLabel = btn.getAttribute('data-label') || 'Impecable';
        if (conditionTag) conditionTag.innerText = currentConditionLabel;
        recalculateCanje();
      });
    });

    if (applyCanjeBtn) {
      applyCanjeBtn.addEventListener('click', () => {
        const deviceText = deviceSelect.options[deviceSelect.selectedIndex].text;
        const amount = getCurrentCanjeAmount();
        appliedCanje = {
          device: deviceText,
          battery: currentBatteryLabel,
          condition: currentConditionLabel,
          amount: amount
        };
        saveCartState();
        updateCartUI();
        showToast(`¡Bono de ${formatCOP(amount)} aplicado a tu bolsa!`);
        setTimeout(openCart, 500);
      });
    }

    function sendCanjeToWhatsApp() {
      const deviceText = deviceSelect.options[deviceSelect.selectedIndex].text;
      const bonusText = calculatedBonus.innerText;
      const msg = `Hola RedCover Colombia 👋 Quiero cotizar el Plan Canje para renovar mi equipo:%0A` +
        `📱 Dispositivo a entregar: ${encodeURIComponent(deviceText)}%0A` +
        `🔋 Condición de Batería: ${encodeURIComponent(currentBatteryLabel)}%0A` +
        `✨ Estado estético: ${encodeURIComponent(currentConditionLabel)}%0A` +
        `💰 Bono estimado de canje: ${encodeURIComponent(bonusText)}%0A%0A` +
        `¿Podrían confirmarme los pasos para entregarlo y adquirir mi nuevo Apple?`;
      const waPhone = (typeof cmsData !== 'undefined' && cmsData.whatsappNumber) ? cmsData.whatsappNumber : '573001234567';
      window.open(`https://wa.me/${waPhone}?text=${msg}`, '_blank');
    }

    // Filtros de categoría de accesorios
    const filterAccButtons = document.querySelectorAll('.filter-acc-btn');
    const accCards = document.querySelectorAll('.acc-card');

    filterAccButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterAccButtons.forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'font-bold', 'active');
          b.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-700', 'font-medium');
        });
        btn.classList.remove('bg-white', 'border', 'border-gray-200', 'text-gray-700', 'font-medium');
        btn.classList.add('bg-primary', 'text-white', 'font-bold', 'active');

        accCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // ==========================================
    // CHECKOUT MULTI-PASO Y FINANCIACIÓN WHATSAPP
    // ==========================================
    let selectedCheckoutMethod = 'pse';

    document.getElementById('checkout-btn').addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Tu bolsa está vacía. Añade un producto primero.');
        return;
      }
      closeCart();
      openCheckoutModal();
    });

    function sendCartFinancingWhatsApp(customerInfo = null) {
      const netTotal = getCartNetTotal();
      const itemsText = cart.map(i => `• ${i.title} (x${i.qty}) - ${formatCOP(i.price * i.qty)}`).join('%0A');
      let msg = `Hola RedCover Colombia 👋 Quiero solicitar *FINANCIACIÓN a 24 cuotas* para mi pedido:%0A%0A` +
        `${itemsText}%0A`;

      if (appliedCanje) {
        msg += `%0A🔄 *Plan Canje Aplicado:*%0A` +
          `• Equipo entregado: ${encodeURIComponent(appliedCanje.device)}%0A` +
          `• Batería: ${encodeURIComponent(appliedCanje.battery)} | Estado: ${encodeURIComponent(appliedCanje.condition)}%0A` +
          `• Descuento: -${encodeURIComponent(formatCOP(appliedCanje.amount))}%0A`;
      }

      msg += `%0A💰 *Total Neto a Financiar:* ${encodeURIComponent(formatCOP(netTotal))}%0A` +
        `💳 *Cuota mensual estimada (24 meses):* ${encodeURIComponent(calculate24Installment(netTotal))}%0A`;

      if (customerInfo) {
        msg += `%0A👤 *Datos del Solicitante:*%0A` +
          `• Nombre: ${encodeURIComponent(customerInfo.name)}%0A` +
          `• Cédula/NIT: ${encodeURIComponent(customerInfo.doc)}%0A` +
          `• Teléfono: ${encodeURIComponent(customerInfo.phone)}%0A` +
          `• Entrega: ${encodeURIComponent(customerInfo.delivery)} (${encodeURIComponent(customerInfo.address)})%0A`;
      }

      msg += `%0A¿Me ayudan con la aprobación inmediata de mi crédito?`;
      const waPhone = (typeof cmsData !== 'undefined' && cmsData.whatsappNumber) ? cmsData.whatsappNumber : '573001234567';
      window.open(`https://wa.me/${waPhone}?text=${msg}`, '_blank');
    }

    function openCheckoutModal() {
      const modal = document.getElementById('checkout-modal');
      document.getElementById('checkout-form-step').classList.remove('hidden');
      document.getElementById('checkout-success-step').classList.add('hidden');
      document.getElementById('chk-summary-total').innerText = formatCOP(getCartNetTotal());
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeCheckoutModal() {
      const modal = document.getElementById('checkout-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function selectCheckoutPayMethod(method, labelEl) {
      selectedCheckoutMethod = method;
      document.querySelectorAll('.chk-pay-label').forEach(l => {
        l.classList.remove('border-primary', 'border-2', 'font-bold');
        l.classList.add('border-gray-200', 'border');
      });
      labelEl.classList.remove('border-gray-200', 'border');
      labelEl.classList.add('border-primary', 'border-2', 'font-bold');

      const pseBox = document.getElementById('chk-pse-box');
      const finBox = document.getElementById('chk-financing-box');
      const submitText = document.getElementById('chk-submit-text');

      if (method === 'financing') {
        pseBox.classList.add('hidden');
        finBox.classList.remove('hidden');
        submitText.innerText = 'Enviar Solicitud a WhatsApp';
      } else if (method === 'pse') {
        pseBox.classList.remove('hidden');
        finBox.classList.add('hidden');
        submitText.innerText = 'Pagar con PSE Ahora';
      } else {
        pseBox.classList.add('hidden');
        finBox.classList.add('hidden');
        submitText.innerText = 'Pagar con Tarjeta Ahora';
      }
    }

    function submitOrderCheckout(e) {
      e.preventDefault();
      const customer = {
        name: (document.getElementById('chk-name').value || '').trim(),
        doc: (document.getElementById('chk-doc').value || '').trim(),
        phone: (document.getElementById('chk-phone').value || '').trim(),
        email: (document.getElementById('chk-email').value || '').trim(),
        delivery: document.getElementById('chk-delivery').value,
        address: (document.getElementById('chk-address').value || '').trim()
      };

      if (!customer.name || !customer.doc || !customer.phone || !customer.address) {
        showToast('Por favor completa todos los datos obligatorios.');
        return;
      }

      const netTotal = getCartNetTotal();
      const itemsStr = cart.map(i => `• ${i.title} (x${i.qty}) - ${formatCOP(i.price * i.qty)}`).join('%0A');
      let msg = `Hola RedCover Colombia 👋 Deseo *PAGAR AHORA* mi pedido:%0A%0A` +
        `👤 *DATOS DEL CLIENTE:*%0A` +
        `• Nombre: ${encodeURIComponent(customer.name)}%0A` +
        `• Cédula/NIT: ${encodeURIComponent(customer.doc)}%0A` +
        `• WhatsApp / Celular: ${encodeURIComponent(customer.phone)}%0A` +
        `• Correo: ${encodeURIComponent(customer.email)}%0A` +
        `• Modalidad de Entrega: ${encodeURIComponent(customer.delivery)}%0A` +
        `• Dirección: ${encodeURIComponent(customer.address)}%0A%0A` +
        `🛍️ *PRODUCTOS:*%0A${itemsStr}%0A`;

      if (appliedCanje) {
        msg += `%0A🔄 *Plan Canje Aplicado:*%0A` +
          `• Equipo entregado: ${encodeURIComponent(appliedCanje.device)}%0A` +
          `• Descuento: -${encodeURIComponent(formatCOP(appliedCanje.amount))}%0A`;
      }

      msg += `%0A💰 *TOTAL A PAGAR:* ${encodeURIComponent(formatCOP(netTotal))}%0A%0A` +
        `Quedo atento para que un asesor me atienda y realizar el pago.`;

      const waPhone = (typeof cmsData !== 'undefined' && cmsData.whatsappNumber) ? cmsData.whatsappNumber : '573001234567';
      window.open(`https://wa.me/${waPhone}?text=${msg}`, '_blank');

      closeCheckoutModal();
      showToast('Redirigiendo a WhatsApp con tu pedido...');

      // Clear cart
      cart = [];
      appliedCanje = null;
      saveCartState();
      updateCartUI();
    }

    function sendOrderReceiptWhatsApp() {
      if (!lastCompletedOrder) return;
      const o = lastCompletedOrder;
      const itemsStr = o.items.map(i => `• ${i.title} (x${i.qty})`).join('%0A');
      const msg = `Hola RedCover Colombia 👋 Acabo de realizar el *Pedido #${o.orderId}* en la web:%0A%0A` +
        `👤 *Cliente:* ${encodeURIComponent(o.customer.name)} (${encodeURIComponent(o.customer.doc)})%0A` +
        `📦 *Productos:*%0A${itemsStr}%0A` +
        `🚚 *Entrega:* ${encodeURIComponent(o.customer.delivery)} - ${encodeURIComponent(o.customer.address)}%0A` +
        `💳 *Pago:* ${encodeURIComponent(o.method)} (${encodeURIComponent(formatCOP(o.total))})%0A%0A` +
        `Quedo atento a mi guía de despacho asegurado y factura DIAN.`;
      const waPhone = (typeof cmsData !== 'undefined' && cmsData.whatsappNumber) ? cmsData.whatsappNumber : '573001234567';
      window.open(`https://wa.me/${waPhone}?text=${msg}`, '_blank');
    }

    // ==========================================
    // MODALES INFORMATIVOS OFICIALES
    // ==========================================
    const officialInfoPages = {
      soporte: {
        badge: 'Centro de Servicio Autorizado',
        title: 'Soporte Técnico Oficial Apple en Colombia',
        content: `
          <p class="text-xs text-gray-600 leading-relaxed mb-4">En RedCover Colombia contamos con laboratorios certificados por Apple, diagnósticos oficiales AST2 y repuestos 100% genuinos de fábrica.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
            <div class="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <strong class="text-gray-900 block mb-1">🔋 Cambio de Batería Original</strong>
              <p class="text-gray-600">Reemplazo en 2 horas manteniendo la certificación de resistencia al agua y el 100% de condición en iOS.</p>
            </div>
            <div class="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <strong class="text-gray-900 block mb-1">📱 Pantallas y Cámaras Genuinas</strong>
              <p class="text-gray-600">Calibración True Tone oficial y piezas originales para iPhone, iPad, Mac y Apple Watch.</p>
            </div>
          </div>
          <a href="https://wa.me/573001234567?text=Hola%20RedCover%2C%20necesito%20agendar%20una%20cita%20de%20Soporte%20T%C3%A9cnico%20Apple" target="_blank" class="inline-flex items-center gap-2 px-5 py-3 rounded-full crimson-btn text-white text-xs font-bold">
            <span class="material-symbols-outlined text-sm">calendar_month</span> Agendar Cita Técnica por WhatsApp
          </a>
        `
      },
      garantia: {
        badge: 'Respaldo Oficial 1 Año',
        title: 'Garantía Oficial Apple y AppleCare+',
        content: `
          <p class="text-xs text-gray-600 leading-relaxed mb-4">Todos los equipos vendidos por RedCover Colombia se entregan sellados, con factura electrónica legal DIAN y 1 año de garantía directa en cualquier centro autorizado Apple del país.</p>
          <ul class="text-xs text-gray-700 space-y-2 mb-4">
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-emerald-600 text-base">verified</span> Cobertura nacional e internacional Apple por 12 meses.</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-emerald-600 text-base">verified</span> Equipos 100% libres de operador y homologados en Colombia.</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-emerald-600 text-base">verified</span> Póliza de envío blindado contra todo riesgo hasta tus manos.</li>
          </ul>
        `
      },
      sistemas: {
        badge: 'Ecosistema de Software 2026',
        title: 'iOS 20, macOS 17, iPadOS 20, watchOS 13 & Apple Intelligence 3.0',
        content: `
          <p class="text-xs text-gray-600 leading-relaxed mb-4">La línea 2026 de hardware Apple (Chips A20 Pro, M5 y S12) está diseñada desde el silicio de 2 nanómetros para potenciar Apple Intelligence 3.0, brindando agentes autónomos en el dispositivo, edición generativa de video 8K y privacidad cuántica total.</p>
          <div class="p-4 rounded-2xl bg-red-50 border border-red-100 text-xs text-gray-800">
            <strong>Configuración Gratuita en Tienda:</strong> Al comprar tu equipo en RedCover, nuestros especialistas transfieren todos tus datos de tu dispositivo anterior y configuran tu iCloud+ sin costo adicional.
          </div>
        `
      },
      terminos: {
        badge: 'Información Legal Colombia',
        title: 'Términos, Condiciones y Políticas RedCover',
        content: `
          <div class="space-y-3 text-xs text-gray-600 max-h-64 overflow-y-auto pr-2">
            <p><strong>1. Facturación Electrónica DIAN:</strong> Todos los precios publicados están en Pesos Colombianos (COP) e incluyen el IVA legal vigente (19% cuando aplique según estatuto tributario).</p>
            <p><strong>2. Financiación:</strong> Las 24 cuotas sin interés aplican con tarjetas seleccionadas de Bancolombia, Davivienda, Nu Colombia y Banco de Bogotá previa aprobación de la entidad financiera a través de nuestro canal asistido por WhatsApp.</p>
            <p><strong>3. Plan Canje RedCover:</strong> El valor cotizado en la web corresponde a una estimación según el estado reportado de batería y estética. Al entregar el equipo se realiza una revisión técnica de 10 minutos para validar que no tenga bloqueos de iCloud ni reportes.</p>
            <p><strong>4. Derecho de Retracto:</strong> Cumplimos íntegramente con el Estatuto del Consumidor (Ley 1480 de 2011) de la Superintendencia de Industria y Comercio (SIC).</p>
          </div>
        `
      }
    };

    function openInfoModal(key) {
      closeMegaMenu();
      const info = officialInfoPages[key] || officialInfoPages.garantia;
      const modal = document.getElementById('info-modal');
      const body = document.getElementById('info-modal-body');

      body.innerHTML = `
        <span class="px-3 py-1 rounded-full bg-red-50 text-primary border border-red-200 text-[11px] font-bold uppercase">${info.badge}</span>
        <h3 class="text-2xl font-extrabold text-gray-900 mt-3 mb-4">${info.title}</h3>
        ${info.content}
      `;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeInfoModal() {
      const modal = document.getElementById('info-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    // ==========================================
    // MEGA MENÚ ESTILO APPLE (100% CONECTADO)
    // ==========================================
    const megaMenuData = {
      iphone: {
        categoryTitle: "Explorar iPhone",
        isFourColumns: true,
        primaryLinks: [
          { name: "Ver todos los iPhone", action: "filterAndScroll('iphone')", bold: true },
          { name: "iPhone 18 Pro & 18 Pro Max", action: "openProductModal('iphone-18-pro-max')" },
          { name: "iPhone Duo Plegable", action: "openProductModal('iphone-duo-fold')" },
          { name: "iPhone 17 Pro & 17 Pro Max", action: "openProductModal('iphone-17-pro')" },
          { name: "iPhone Air", action: "openProductModal('iphone-air')" },
          { name: "iPhone 16 Pro Max", action: "openProductModal('iphone-16-pro-max')" }
        ],
        nuevosTitle: "Nuevos",
        nuevosLinks: [
          { name: "iPhone 18 Pro y 18 Pro Max", action: "openProductModal('iphone-18-pro-max')" },
          { name: "iPhone 17 Pro y Pro Max", action: "openProductModal('iphone-17-pro')" },
          { name: "iPhone 17", action: "openProductModal('iphone-17')" },
          { name: "iPhone 16 Pro y Pro Max", action: "openProductModal('iphone-16-pro')" },
          { name: "iPhone 16", action: "openProductModal('iphone-16')" },
          { name: "iPhone 15", action: "openProductModal('iphone-15')" }
        ],
        exhibicionTitle: "De Exhibición",
        exhibicionLinks: [
          { name: "iPhone 16 Pro Max", action: "openProductModal('iphone-16-pro-max')" },
          { name: "iPhone 16 Pro", action: "openProductModal('iphone-16-pro')" },
          { name: "iPhone 16 y 16 Plus", action: "openProductModal('iphone-16')" },
          { name: "iPhone 15 Pro Max", action: "openProductModal('iphone-15-pro-max')" },
          { name: "iPhone 15 Pro", action: "openProductModal('iphone-15-pro')" },
          { name: "iPhone 15 y 15 Plus", action: "openProductModal('iphone-15')" },
          { name: "iPhone 14 Pro Max y 14 Pro", action: "openProductModal('iphone-14-pro-max')" },
          { name: "iPhone 14 y 14 Plus", action: "openProductModal('iphone-14')" },
          { name: "iPhone 13 Pro Max y 13 Pro", action: "openProductModal('iphone-13-pro-max')" },
          { name: "iPhone 13 y 13 mini", action: "openProductModal('iphone-13')" },
          { name: "iPhone 12 Pro Max y 12", action: "openProductModal('iphone-12')" },
          { name: "iPhone 11 Pro Max y 11", action: "openProductModal('iphone-11')" }
        ],
        secondaryTitle: "Comprar & Servicios",
        secondaryLinks: [
          { name: "Plan Canje", href: "#canje" },
          { name: "Financiación WhatsApp", action: "directFinanceWhatsApp('iPhone 18 Pro / Nuevos', 5999000)" },
          { name: "Accesorios MagSafe", href: "#accesorios" },
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" },
          { name: "Comparar Modelos", href: "configuracion.html#comparativa" }
        ]
      },
      airpods: {
        categoryTitle: "Explorar AirPods",
        primaryLinks: [
          { name: "Ver todos los AirPods", action: "filterAndScroll('airpods')", bold: true },
          { name: "AirPods Pro 3", action: "openProductModal('airpods-pro-3')" },
          { name: "AirPods Max 2", action: "openProductModal('airpods-max-2')" },
          { name: "AirPods 4 ANC", action: "openProductModal('airpods-4-anc')" },
          { name: "AirPods 4", action: "openProductModal('airpods-4')" },
          { name: "AirPods Pro 2", action: "openProductModal('airpods-pro-2')" },
          { name: "AirPods 3.ª Gen", action: "openProductModal('airpods-pro-2')" }
        ],
        secondaryTitle: "Comprar AirPods",
        secondaryLinks: [
          { name: "Reservar AirPods Pro 3", action: "openProductModal('airpods-pro-3')" },
          { name: "Comprar AirPods Max 2", action: "openProductModal('airpods-max-2')" },
          { name: "Ver Catálogo de AirPods", action: "filterAndScroll('airpods')" },
          { name: "Financiar AirPods", action: "directFinanceWhatsApp('AirPods Pro 3 / AirPods Max 2', 1399000)" }
        ],
        tertiaryTitle: "Más para AirPods",
        tertiaryLinks: [
          { name: "Audio Espacial", action: "openInfoModal('sistemas')" },
          { name: "Soporte AirPods", action: "openInfoModal('soporte')" },
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" }
        ]
      },
      samsung: {
        categoryTitle: "Explorar Samsung Galaxy",
        primaryLinks: [
          { name: "Ver Samsung Galaxy S26 y S25", action: "filterAndScroll('samsung')", bold: true },
          { name: "Galaxy S26 Ultra", action: "openProductModal('samsung-s26-ultra')" },
          { name: "Galaxy S26+ y S26", action: "openProductModal('samsung-s26-plus')" },
          { name: "Galaxy S26 Slim", action: "openProductModal('samsung-s26-slim')" },
          { name: "Galaxy S25 Ultra", action: "openProductModal('samsung-s25-ultra')" },
          { name: "Galaxy S25+ y S25", action: "openProductModal('samsung-s25-plus')" },
          { name: "Galaxy S25 Edge y S25 FE", action: "openProductModal('samsung-s25-edge')" }
        ],
        secondaryTitle: "Comprar Samsung",
        secondaryLinks: [
          { name: "Comprar Galaxy S26 Ultra", action: "openProductModal('samsung-s26-ultra')" },
          { name: "Comprar Galaxy S25 Ultra", action: "openProductModal('samsung-s25-ultra')" },
          { name: "Plan Canje Samsung", href: "#canje" },
          { name: "Financiación WhatsApp", action: "directFinanceWhatsApp('Samsung Galaxy S26 Ultra / S25 Ultra', 5599000)" }
        ],
        tertiaryTitle: "Respaldo Samsung",
        tertiaryLinks: [
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" },
          { name: "Galaxy AI", action: "openInfoModal('sistemas')" },
          { name: "Servicio Técnico", action: "openInfoModal('soporte')" }
        ]
      },
      gafas: {
        categoryTitle: "Explorar Gafas Ray-Ban",
        primaryLinks: [
          { name: "Ver todas las Gafas Ray-Ban", action: "filterAndScroll('gafas')", bold: true },
          { name: "Ray-Ban Meta Wayfarer", action: "openProductModal('rayban-meta-wayfarer')" },
          { name: "Ray-Ban Meta Skyler", action: "openProductModal('rayban-meta-skyler')" },
          { name: "Ray-Ban Meta Headliner", action: "openProductModal('rayban-meta-headliner')" },
          { name: "Ray-Ban Meta Wayfarer Edición Limitada", action: "openProductModal('rayban-meta-limited')" }
        ],
        secondaryTitle: "Comprar Gafas",
        secondaryLinks: [
          { name: "Comprar Ray-Ban Meta Wayfarer", action: "openProductModal('rayban-meta-wayfarer')" },
          { name: "Comprar Ray-Ban Meta Skyler", action: "openProductModal('rayban-meta-skyler')" },
          { name: "Financiación WhatsApp", action: "directFinanceWhatsApp('Gafas Ray-Ban Meta', 1699000)" }
        ],
        tertiaryTitle: "Tecnología Ray-Ban Meta",
        tertiaryLinks: [
          { name: "Cámara Ultra HD 12 MP + Meta AI", action: "openInfoModal('sistemas')" },
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" }
        ]
      },
      watch: {
        categoryTitle: "Explorar Apple Watch",
        primaryLinks: [
          { name: "Ver todos los Apple Watch", action: "filterAndScroll('watch')", bold: true },
          { name: "Apple Watch Ultra 3", action: "openProductModal('watch-ultra-3')" },
          { name: "Apple Watch Series 12", action: "openProductModal('watch-series-12')" },
          { name: "Apple Watch Series 11", action: "openProductModal('watch-series-11')" },
          { name: "Apple Watch Ultra 2", action: "openProductModal('watch-ultra-2')" },
          { name: "Apple Watch Series 10", action: "openProductModal('watch-ultra-2')" },
          { name: "Apple Watch SE 3", action: "openProductModal('watch-se-3')" }
        ],
        secondaryTitle: "Comprar Watch",
        secondaryLinks: [
          { name: "Ver Catálogo Apple Watch", action: "filterAndScroll('watch')" },
          { name: "Correas y Cargadores", href: "#accesorios" },
          { name: "Plan Canje Watch", href: "#canje" },
          { name: "Financiar Watch", action: "directFinanceWhatsApp('Apple Watch Ultra 3 / Series 12', 2499000)" }
        ],
        tertiaryTitle: "Más para Watch",
        tertiaryLinks: [
          { name: "Soporte Apple Watch", action: "openInfoModal('soporte')" },
          { name: "watchOS", action: "openInfoModal('sistemas')" },
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" }
        ]
      },
      mac: {
        categoryTitle: "Explorar Mac",
        primaryLinks: [
          { name: "Ver todos los Mac", action: "filterAndScroll('mac')", bold: true },
          { name: 'MacBook Pro 14" y 16"', action: "openProductModal('macbook-pro-m5')" },
          { name: 'MacBook Air 13" y 15"', action: "openProductModal('macbook-air-m5')" },
          { name: 'iMac 24"', action: "openProductModal('imac-24-m4')" },
          { name: "Mac Studio", action: "openProductModal('mac-studio-m4')" },
          { name: "Mac mini", action: "openProductModal('mac-studio-m4')" }
        ],
        secondaryTitle: "Comprar Mac",
        secondaryLinks: [
          { name: "Ver Catálogo de Mac", action: "filterAndScroll('mac')" },
          { name: "Accesorios para Mac", href: "#accesorios" },
          { name: "Plan Canje MacBook", href: "#canje" },
          { name: "Financiar MacBook", action: "directFinanceWhatsApp('MacBook Pro / Air', 5899000)" }
        ],
        tertiaryTitle: "Más para Mac",
        tertiaryLinks: [
          { name: "Soporte Técnico Mac", action: "openInfoModal('soporte')" },
          { name: "macOS", action: "openInfoModal('sistemas')" },
          { name: "AppleCare+ y Garantía", action: "openInfoModal('garantia')" }
        ]
      },
      ipad: {
        categoryTitle: "Explorar iPad",
        primaryLinks: [
          { name: "Ver todos los iPad", action: "filterAndScroll('ipad')", bold: true },
          { name: 'iPad Pro 11" y 13"', action: "openProductModal('ipad-pro-m5')" },
          { name: 'iPad Air 11" y 13"', action: "openProductModal('ipad-air-m4')" },
          { name: "iPad mini", action: "openProductModal('ipad-mini-a17-pro')" },
          { name: "iPad 11.ª Gen", action: "openProductModal('ipad-11-gen')" },
          { name: "iPad 10.ª Gen", action: "openProductModal('ipad-11-gen')" }
        ],
        secondaryTitle: "Comprar iPad",
        secondaryLinks: [
          { name: "Ver Catálogo de iPad", action: "filterAndScroll('ipad')" },
          { name: "Apple Pencil y Teclados", href: "#accesorios" },
          { name: "Plan Canje iPad", href: "#canje" },
          { name: "Financiar iPad", action: "directFinanceWhatsApp('iPad Pro / iPad Air', 3599000)" }
        ],
        tertiaryTitle: "Más para iPad",
        tertiaryLinks: [
          { name: "Soporte iPad", action: "openInfoModal('soporte')" },
          { name: "iPadOS", action: "openInfoModal('sistemas')" },
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" }
        ]
      },
      accesorios: {
        categoryTitle: "Explorar Accesorios",
        primaryLinks: [
          { name: "Ver todos los Accesorios", href: "#accesorios", bold: true },
          { name: "Cubo de 20W y 40W Original", href: "#accesorios" },
          { name: "Apple Pencil USB-C y Pencil Pro", href: "#accesorios" },
          { name: "Cable USB-C y Lightning Originales", href: "#accesorios" },
          { name: "AirTag Original", href: "#accesorios" }
        ],
        secondaryTitle: "Categorías",
        secondaryLinks: [
          { name: "Cubos de Carga Originales", href: "#accesorios" },
          { name: "Apple Pencil", href: "#accesorios" },
          { name: "Cables Originales", href: "#accesorios" },
          { name: "AirTag", href: "#accesorios" }
        ],
        tertiaryTitle: "Respaldo",
        tertiaryLinks: [
          { name: "100% Originales Sellados Apple", action: "openInfoModal('garantia')" },
          { name: "Garantía Oficial 1 Año", action: "openInfoModal('garantia')" }
        ]
      },
      canje: {
        categoryTitle: "Plan Canje RedCover",
        primaryLinks: [
          { name: "Cotizar mi Equipo", href: "plan-canje.html", bold: true },
          { name: "Canjear iPhone", href: "plan-canje.html" },
          { name: "Canjear MacBook", href: "plan-canje.html" },
          { name: "Canjear iPad", href: "plan-canje.html" }
        ],
        secondaryTitle: "¿Cómo Funciona?",
        secondaryLinks: [
          { name: "1. Cotiza online en 3 pasos", href: "plan-canje.html" },
          { name: "2. Recibe tu bono inmediato", href: "plan-canje.html" },
          { name: "3. Asesoría por WhatsApp", action: "sendCanjeToWhatsApp()" }
        ],
        tertiaryTitle: "Ventajas",
        tertiaryLinks: [
          { name: "Términos del Plan Canje", action: "openInfoModal('terminos')" },
          { name: "Borrado Seguro de Datos", action: "openInfoModal('garantia')" }
        ]
      },
      tiendas: {
        categoryTitle: "Tiendas RedCover",
        primaryLinks: [
          { name: "Ver Sedes en Bogotá", href: "#tiendas", bold: true },
          { name: "C.C. Caribe • Local 136", href: "#tiendas" },
          { name: "C.C. Caribe • Local 197", href: "#tiendas" }
        ],
        secondaryTitle: "Servicios",
        secondaryLinks: [
          { name: "Servicio Técnico Apple", action: "openInfoModal('soporte')" },
          { name: "Asesor en WhatsApp", href: "https://wa.me/573001234567" }
        ],
        tertiaryTitle: "Horarios",
        tertiaryLinks: [
          { name: "San Andresito de la 38", href: "#tiendas" },
          { name: "Lun a Sáb: 9:30am - 7:30pm", href: "#tiendas" }
        ]
      }
    };

    const megaMenu = document.getElementById('mega-menu');
    const megaMenuContent = document.getElementById('mega-menu-content');
    const navButtons = document.querySelectorAll('.nav-item-btn');
    let activeMenuKey = null;
    let menuCloseTimeout = null;

    function renderMegaLink(link, cls) {
      if (link.action) {
        return `<button type="button" onclick="${link.action}" class="block text-left w-full ${cls} transition-colors">${link.name}</button>`;
      }
      const target = link.href && link.href.startsWith('http') ? 'target="_blank"' : '';
      return `<a href="${link.href}" ${target} onclick="closeMegaMenu()" class="block ${cls} transition-colors">${link.name}</a>`;
    }

    function renderMenuContent(key) {
      const data = megaMenuData[key];
      if (!data) return;

      if (key === 'iphone' && data.isFourColumns) {
        megaMenuContent.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-left animate-fadeIn">
            <!-- Columna 1: Línea Principal -->
            <div class="space-y-3">
              <span class="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-3">${data.categoryTitle}</span>
              <div class="space-y-2">
                ${data.primaryLinks.map(link => renderMegaLink(link, link.bold ? 'text-xl font-bold text-white hover:text-primary' : 'text-sm font-semibold text-zinc-200 hover:text-white')).join('')}
              </div>
            </div>

            <!-- Columna 2: Nuevos 2026 -->
            <div class="space-y-3 pl-0 md:pl-4 border-l-0 md:border-l border-zinc-800">
              <span class="text-xs font-semibold text-emerald-400 tracking-wider uppercase block mb-3 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ${data.nuevosTitle}
              </span>
              <div class="space-y-2">
                ${data.nuevosLinks.map(link => renderMegaLink(link, 'text-sm font-medium text-zinc-300 hover:text-emerald-400 py-0.5')).join('')}
              </div>
            </div>

            <!-- Columna 3: Exhibición (Grado A+ Garantizados) -->
            <div class="space-y-3 pl-0 md:pl-4 border-l-0 md:border-l border-zinc-800">
              <span class="text-xs font-semibold text-amber-400 tracking-wider uppercase block mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-xs">verified</span>
                ${data.exhibicionTitle}
              </span>
              <div class="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
                ${data.exhibicionLinks.map(link => renderMegaLink(link, 'text-xs font-medium text-zinc-300 hover:text-amber-400 py-0.5')).join('')}
              </div>
            </div>

            <!-- Columna 4: Comprar y Servicios -->
            <div class="space-y-3 pl-0 md:pl-4 border-l-0 md:border-l border-zinc-800">
              <span class="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-3">${data.secondaryTitle}</span>
              <div class="space-y-2">
                ${data.secondaryLinks.map(link => renderMegaLink(link, 'text-xs font-medium text-zinc-300 hover:text-primary py-0.5')).join('')}
              </div>
              <div class="pt-4 mt-4 border-t border-zinc-800/80">
                <span class="inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <span class="material-symbols-outlined text-sm">verified</span> +10.000 Clientes Satisfechos
                </span>
              </div>
            </div>
          </div>
        `;
        return;
      }

      megaMenuContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 text-left animate-fadeIn">
          <div class="md:col-span-5 space-y-3">
            <span class="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-3">${data.categoryTitle}</span>
            <div class="space-y-2.5">
              ${data.primaryLinks.map(link => renderMegaLink(link, link.bold ? 'text-2xl lg:text-3xl font-bold text-white hover:text-primary' : 'text-lg lg:text-xl font-semibold text-zinc-200 hover:text-white')).join('')}
            </div>
          </div>

          <div class="md:col-span-4 space-y-2 pl-0 md:pl-4 border-l-0 md:border-l border-zinc-800">
            <span class="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-3">${data.secondaryTitle}</span>
            <div class="space-y-2">
              ${data.secondaryLinks.map(link => renderMegaLink(link, 'text-sm font-medium text-zinc-300 hover:text-primary py-0.5')).join('')}
            </div>
          </div>

          <div class="md:col-span-3 space-y-2 pl-0 md:pl-4 border-l-0 md:border-l border-zinc-800">
            <span class="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-3">${data.tertiaryTitle}</span>
            <div class="space-y-2">
              ${data.tertiaryLinks.map(link => renderMegaLink(link, 'text-xs font-medium text-zinc-400 hover:text-white py-0.5')).join('')}
            </div>
            <div class="pt-4 mt-4 border-t border-zinc-800/80">
              <span class="inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                <span class="material-symbols-outlined text-sm">verified</span> +10.000 Clientes Satisfechos
              </span>
            </div>
          </div>
        </div>
      `;
    }

    function openMegaMenu(key) {
      clearTimeout(menuCloseTimeout);
      activeMenuKey = key;
      renderMenuContent(key);

      navButtons.forEach(btn => {
        if (btn.getAttribute('data-menu') === key) {
          btn.classList.add('text-primary');
          btn.classList.remove('text-gray-700', 'text-gray-600');
        } else {
          btn.classList.remove('text-primary');
          btn.classList.add('text-gray-600');
        }
      });

      megaMenu.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
      megaMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }

    function closeMegaMenu() {
      megaMenu.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
      megaMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      navButtons.forEach(btn => {
        btn.classList.remove('text-primary');
        btn.classList.add('text-gray-700');
      });
      activeMenuKey = null;
    }

    navButtons.forEach(btn => {
      const menuKey = btn.getAttribute('data-menu');
      btn.addEventListener('mouseenter', () => openMegaMenu(menuKey));
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (activeMenuKey === menuKey) closeMegaMenu();
        else openMegaMenu(menuKey);
      });
    });

    megaMenu.addEventListener('mouseenter', () => clearTimeout(menuCloseTimeout));
    megaMenu.addEventListener('mouseleave', () => menuCloseTimeout = setTimeout(closeMegaMenu, 250));
    document.getElementById('nav-container').addEventListener('mouseleave', () => menuCloseTimeout = setTimeout(closeMegaMenu, 300));
    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && !document.getElementById('nav-container').contains(e.target)) {
        closeMegaMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMegaMenu();
        closeProductModal();
        closeCheckoutModal();
        closeInfoModal();
        closeAdminPanel();
      }
    });

    // ============================================================================
    // SISTEMA CMS DE ADMINISTRADOR EN TIEMPO REAL (PRODUCTOS, OFERTAS, IMÁGENES, VIDEOS, CATEGORÍAS)
    // ============================================================================
    const CMS_STORAGE_KEY = 'redcover_cms_state_v9';
    const ADMIN_MASTER_PASSWORD = 'admin2026*';
    let currentAdminPassword = localStorage.getItem('redcover_admin_pass') || 'admin2026*';
    let adminAuthenticated = false;
    let pendingAdminTabAfterAuth = null;

    // ==========================================
    // MODO OSCURO Y TESTIMONIOS INTERACTIVOS (+10.000 CLIENTES)
    // ==========================================
    const DARK_MODE_STORAGE_KEY = 'redcover_dark_mode';

    function initDarkMode() {
      const saved = localStorage.getItem(DARK_MODE_STORAGE_KEY);
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        updateDarkModeIcons(true);
      } else {
        document.documentElement.classList.remove('dark');
        updateDarkModeIcons(false);
      }
    }

    function toggleDarkMode() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem(DARK_MODE_STORAGE_KEY, isDark ? 'dark' : 'light');
      updateDarkModeIcons(isDark);
      showToast(isDark ? '🌙 Modo Oscuro activado' : '☀️ Modo Claro activado');
    }

    function updateDarkModeIcons(isDark) {
      const icon = document.getElementById('dark-mode-icon');
      if (icon) icon.innerText = isDark ? 'light_mode' : 'dark_mode';
    }

    initDarkMode();

    const clientStoriesData = [
      {
        name: 'Valentina Gómez • Bogotá D.C.',
        model: 'Estrenó iPhone 18 Pro Max',
        quote: '"Entregué mi iPhone 15 Pro en Plan Canje en el Local 136 del C.C. Caribe y salí en 15 minutos con mi iPhone 18 Pro Max nuevo y sellado. ¡Atención 10/10!"',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'
      },
      {
        name: 'Andrés Felipe Pardo • Bogotá D.C.',
        model: 'Estrenó Samsung Galaxy S26 Ultra',
        quote: '"Compré mi Galaxy S26 Ultra en San Andresito de la 38 (Local 197 C.C. Caribe). Me dieron factura oficial, garantía de 1 año y el mejor precio de Bogotá."',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop'
      },
      {
        name: 'Camila Restrepo • Medellín',
        model: 'Estrenó MacBook Pro M5 & AirPods Pro 3',
        quote: '"Pedí mi MacBook Pro M5 y los nuevos AirPods Pro 3 por WhatsApp con envío asegurado. Llegó al día siguiente totalmente sellado y original."',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop'
      },
      {
        name: 'Sebastián Morales • Bogotá D.C.',
        model: 'Estrenó iPhone Duo Plegable 2026',
        quote: '"Visité el Centro Comercial Caribe Local 136 y pude probar toda la gama Apple 2026. Me recibieron mi iPad y mi iPhone anterior en parte de pago."',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop'
      }
    ];
    let currentClientStoryIdx = 0;

    function renderClientStory() {
      const st1 = clientStoriesData[currentClientStoryIdx];
      const nextIdx = (currentClientStoryIdx + 1) % clientStoriesData.length;
      const st2 = clientStoriesData[nextIdx];

      const nm1 = document.getElementById('client-story-name');
      const md1 = document.getElementById('client-story-model');
      const qt1 = document.getElementById('client-story-quote');
      if (nm1 && st1) nm1.innerText = st1.name;
      if (md1 && st1) md1.innerText = st1.model;
      if (qt1 && st1) qt1.innerText = st1.quote;

      const nm2 = document.getElementById('client-story-name-2');
      const md2 = document.getElementById('client-story-model-2');
      const qt2 = document.getElementById('client-story-quote-2');
      if (nm2 && st2) nm2.innerText = st2.name;
      if (md2 && st2) md2.innerText = st2.model;
      if (qt2 && st2) qt2.innerText = st2.quote;
    }

    function prevClientStory() {
      currentClientStoryIdx = (currentClientStoryIdx - 1 + clientStoriesData.length) % clientStoriesData.length;
      renderClientStory();
    }

    function nextClientStory() {
      currentClientStoryIdx = (currentClientStoryIdx + 1) % clientStoriesData.length;
      renderClientStory();
    }

    const factoryCatalogDevices = JSON.parse(JSON.stringify(allCatalogDevices));

    const defaultCMSData = {
      whatsappNumber: '573001234567',
      iphone16proConfig: {
        title: "iPhone 16 Pro y iPhone 16 Pro Max",
        subtitle: "Configura tu iPhone 16 Pro y iPhone 16 Pro Max. Elige acabado en Titanio, almacenamiento, cotiza Plan Canje y financia cómodamente en RedCover Colombia.",
        stickyBadge: "Titanio Grado 5",
        heroStockPill: "En Stock Colombia",
        heroBadgeText: "Apple Intelligence Ready",
        guaranteeText: "Distribuidor Autorizado Oficial Apple & Samsung Colombia • Factura legal DIAN",
        stockLocation: "San Andresito de la 38 C.C. Caribe (Locales 136 y 197)",
        installmentText: "o 24 cuotas",
        tradeInTitle: "Plan Canje RedCover: Ahorra hasta $2.500.000",
        baseDeviceId: "iphone-16-pro"
      },
      heroFlagships: {
        'iphone-18-pro': {
          titleMain: 'iPhone 18 Pro.',
          titleGradient: 'Negro carbón, Plata, Azul glaciar y Borgoña.',
          description: 'La cumbre de la ingeniería portátil. Chasis de Titanio Líquido ultraliviano, pantalla ProMotion de 240Hz sin bordes, Apple Intelligence 3.0 y zoom óptico periscópico continuo de 10x.',
          badge: 'Lanzamiento Oficial 2026 • Chip A20 Pro 2nm',
          ctaText: 'Reservar iPhone 18 Pro',
          specChip: 'Chip A20 Pro 2nm',
          specCam: 'Triple 48MP • Zoom 10x',
          targetId: 'iphone-18-pro'
        },
        'iphone-18-pro-max': {
          titleMain: 'iPhone 18 Pro Max.',
          titleGradient: 'Pantalla 6.9\" Tandem OLED & Máxima Batería.',
          description: 'Poder descomunal en 6.9 pulgadas. Cámara de vapor de grafeno, autonomía récord de hasta 38 horas y sistema fotográfico profesional ProRAW de 48 MP con sensor principal de 1 pulgada.',
          badge: 'Buque Insignia 2026 • 6.9\" Tandem OLED',
          ctaText: 'Reservar iPhone 18 Pro Max',
          specChip: 'A20 Pro Max + Vapor',
          specCam: 'ProRAW 48MP • Zoom 12x',
          targetId: 'iphone-18-pro-max'
        },
        'iphone-duo-fold': {
          titleMain: 'iPhone Duo.',
          titleGradient: 'Dos Pantallas. Cero Arrugas. Revolución Plegable.',
          description: 'El primer iPhone plegable de Apple. Bisagra de Titanio Líquido aeroespacial y doble pantalla Super Retina XDR que se despliega en un lienzo de 8.2 pulgadas con multitarea extrema.',
          badge: 'Edición Especial 2026 • Plegable Dual-Screen',
          ctaText: 'Reservar iPhone Duo Plegable',
          specChip: 'A20 Pro Dual-Engine',
          specCam: 'Sistema Plegable 8.2\" OLED',
          targetId: 'iphone-duo-fold'
        }
      },
      topbarText: '🇨🇴 Lanzamiento 2026: iPhone 18 Pro, AirPods Pro 3 & Samsung Galaxy S26 Ultra • Envío Asegurado Gratis • Financiación por WhatsApp',
      hero: {
        authBadge: 'Distribuidor Oficial Autorizado • Colombia',
        clientsBadge: '+10.000 Clientes Satisfechos',
        ratingBadge: '4.9/5 Estrellas',
        titleMain: 'iPhone 18 Pro',
        titleGradient: 'Titanio Grado Aeroespacial. Chip A20 Pro.',
        description: 'El salto más grande en la historia del iPhone junto al revolucionario iPhone Duo plegable. Nuevo Chip A20 Pro de 2nm, triple cámara de 48 MP con Teleobjetivo Periscopio 10x, Face ID bajo pantalla y Apple Intelligence 3.0. Fináncialo hoy por WhatsApp.',
        cta1Text: 'Reservar / Comprar iPhone 18 Pro',
        cta2Text: 'Cotizar mi Equipo en Plan Canje'
      },
      heroSlides: [
        {
          id: 'slide-1',
          mediaType: 'image',
          mediaUrl: IMG_IPHONE_PRO,
          badge: 'Banner 1 • Buque Insignia Apple 2026',
          title: 'iPhone 18 Pro Max & iPhone Duo • Desde $5.999.000 COP',
          subtitle: 'Chip A20 Pro 2nm • Hasta 24 cuotas sin interés por WhatsApp y 1 año de garantía oficial',
          btn1Text: 'Ver Ficha iPhone 18 Pro',
          productIdTarget: 'iphone-18-pro-max',
          btn2Text: 'Explorar 34 iPhones',
          categoryTarget: 'iphone'
        },
        {
          id: 'slide-2',
          mediaType: 'image',
          mediaUrl: IMG_IPHONE_16,
          badge: 'Banner 2 • Nuevo Flagship Android 2026',
          title: 'Samsung Galaxy S26 Ultra 5G & Z Fold 7 • Desde $4.299.000 COP',
          subtitle: 'Snapdragon 8 Elite Gen 2 • Cámara Cuádruple 200 MP + S-Pen Integrado + Galaxy AI 3.0',
          btn1Text: 'Ver Galaxy S26 Ultra',
          productIdTarget: 'samsung-s26-ultra',
          btn2Text: 'Ver 17 Modelos Samsung',
          categoryTarget: 'samsung'
        },
        {
          id: 'slide-3',
          mediaType: 'image',
          mediaUrl: IMG_MACBOOK,
          badge: 'Banner 3 • Estaciones de Trabajo 2nm',
          title: 'MacBook Pro M5 Max & iPad Pro M5 OLED • Desde $4.199.000 COP',
          subtitle: 'Puertos Thunderbolt 5 de 120 Gb/s, pantalla Tandem OLED y hasta 24 horas de autonomía',
          btn1Text: 'Ver MacBook Pro M5',
          productIdTarget: 'macbook-pro-m5',
          btn2Text: 'Explorar Línea Mac',
          categoryTarget: 'mac'
        },
        {
          id: 'slide-4',
          mediaType: 'image',
          mediaUrl: IMG_WATCH,
          badge: 'Banner 4 • Ecosistema Salud & Audio 2026',
          title: 'AirPods Pro 3 (Chip H3) & Watch Ultra 3 Satelital',
          subtitle: 'Monitoreo cardíaco en oído, Cancelación Activa 4x y conexión satelital fuera de red',
          btn1Text: 'Ver AirPods Pro 3',
          productIdTarget: 'airpods-pro-3',
          btn2Text: 'Explorar AirPods',
          categoryTarget: 'airpods'
        }
      ],
      bentoCards: [
        {
          id: 'bento-iphone',
          icon: 'smartphone',
          chipSpec: 'Chip A20 Pro • 2nm',
          badge: 'Nuevos & Exhibición',
          title: 'iPhone 18 Pro, Duo & Serie 11–17',
          desc: 'Toda la gama iPhone: desde los nuevos 18 Pro Max y Duo Plegable hasta unidades de exhibición garantizadas.',
          priceText: 'Desde $1.099.000',
          btnText: 'Explorar iPhone',
          categoryTarget: 'iphone',
          productIdTarget: 'iphone-18-pro-max',
          img: IMG_IPHONE_PRO,
          darkTheme: true
        },
        {
          id: 'bento-samsung',
          icon: 'phone_android',
          chipSpec: 'Snapdragon 8 Elite • Galaxy AI',
          badge: 'Serie S26 & Serie S25',
          title: 'Samsung Galaxy S26 Ultra & S25',
          desc: 'Cámara cuádruple de 200 MP, chasis de titanio, S-Pen integrado e inteligencia artificial Galaxy AI.',
          priceText: 'Desde $3.499.000',
          btnText: 'Ver Samsung',
          categoryTarget: 'samsung',
          productIdTarget: 'samsung-s26-ultra',
          img: IMG_IPHONE_16,
          darkTheme: false
        },
        {
          id: 'bento-gafas',
          icon: 'eyeglasses',
          chipSpec: 'Cámara 12 MP + Meta AI',
          badge: 'Smart Glasses Oficiales',
          title: 'Gafas Ray-Ban Meta Collection',
          desc: 'Wayfarer, Skyler y Headliner con grabación en primera persona, audio abierto y lentes Transitions.',
          priceText: 'Desde $1.699.000',
          btnText: 'Ver Gafas',
          categoryTarget: 'gafas',
          productIdTarget: 'rayban-meta-wayfarer',
          img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
          darkTheme: true
        },
        {
          id: 'bento-mac',
          icon: 'laptop_mac',
          chipSpec: 'Chips M5 Max & M4 Ultra',
          badge: 'Potencia Profesional',
          title: 'MacBook Pro, Air, iMac & Studio',
          desc: 'Estaciones portátiles y de escritorio con pantalla Liquid Retina XDR, Thunderbolt 5 y hasta 24h de batería.',
          priceText: 'Desde $4.199.000',
          btnText: 'Explorar Mac',
          categoryTarget: 'mac',
          productIdTarget: 'macbook-pro-m5',
          img: IMG_MACBOOK,
          darkTheme: false
        },
        {
          id: 'bento-ipad',
          icon: 'tablet_mac',
          chipSpec: 'Tandem OLED • Apple Pencil Pro',
          badge: 'Lienzo Ultra Delgado',
          title: 'iPad Pro, iPad Air & iPad mini',
          desc: 'Pantallas Ultra Retina XDR con potencia de escritorio y compatibilidad total con Apple Pencil Pro.',
          priceText: 'Desde $1.799.000',
          btnText: 'Explorar iPad',
          categoryTarget: 'ipad',
          productIdTarget: 'ipad-pro-m5',
          img: IMG_IPAD,
          darkTheme: false
        },
        {
          id: 'bento-watch',
          icon: 'watch',
          chipSpec: 'Sensores Biométricos + GPS',
          badge: 'Salud & Aventura',
          title: 'Apple Watch Ultra 3, S12 & SE 3',
          desc: 'Caja de titanio aeroespacial, monitoreo avanzado de salud y conexión satelital de emergencia.',
          priceText: 'Desde $1.149.000',
          btnText: 'Ver Watch',
          categoryTarget: 'watch',
          productIdTarget: 'watch-ultra-3',
          img: IMG_WATCH,
          darkTheme: true
        },
        {
          id: 'bento-airpods',
          icon: 'headphones',
          chipSpec: 'Chip H3 • Audio Espacial',
          badge: 'Sonido Lossless ANC',
          title: 'AirPods Pro 3, Max 2 & AirPods 4',
          desc: 'Cancelación activa de ruido inteligente, audio computacional de alta fidelidad y estuche USB-C.',
          priceText: 'Desde $699.000',
          btnText: 'Ver AirPods',
          categoryTarget: 'airpods',
          productIdTarget: 'airpods-pro-3',
          img: IMG_AIRPODS,
          darkTheme: false
        },
        {
          id: 'bento-accesorios',
          icon: 'power',
          chipSpec: '100% Originales Apple',
          badge: 'Carga, Pencil & Rastreo',
          title: 'Cubos 20W/40W, Pencil, Cables & AirTag',
          desc: 'Cubos de carga rápida originales, Apple Pencil Pro/USB-C, cables trenzados USB-C/Lightning y AirTag.',
          priceText: 'Desde $99.000',
          btnText: 'Ver Accesorios',
          categoryTarget: 'accesorios',
          productIdTarget: '',
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7T2_GEO_US?wid=800&hei=800&fmt=jpeg&qlt=90',
          darkTheme: true
        }
      ],
      deviceCategories: [
        { id: 'iphone', name: 'iPhone', shortName: 'iPhone', subtitle: 'Nuevos y Exhibición', icon: 'smartphone' },
        { id: 'airpods', name: 'AirPods', shortName: 'AirPods', subtitle: 'Pro 3, Max 2 y AirPods 4', icon: 'headphones' },
        { id: 'watch', name: 'Apple Watch', shortName: 'Apple Watch', subtitle: 'Ultra 3, S12 y SE 3', icon: 'watch' },
        { id: 'mac', name: 'Mac', shortName: 'Mac', subtitle: 'MacBook Pro, Air e iMac', icon: 'laptop_mac' },
        { id: 'ipad', name: 'iPad', shortName: 'iPad', subtitle: 'Pro, Air y Mini', icon: 'tablet_mac' },
        { id: 'samsung', name: 'Samsung Galaxy', shortName: 'Samsung', subtitle: 'Serie S26 y Serie S25', icon: 'phone_android' },
        { id: 'gafas', name: 'Gafas Ray-Ban', shortName: 'Gafas Ray-Ban', subtitle: 'Wayfarer, Skyler y Headliner', icon: 'eyeglasses' }
      ],
      accessoryCategories: [
        { id: 'carga', name: 'Cubos de Carga (20W / 40W)' },
        { id: 'pencil', name: 'Apple Pencil (USB-C / Pro)' },
        { id: 'cables', name: 'Cables USB-C & Lightning' },
        { id: 'airtag', name: 'AirTag' }
      ],
      offersHeader: {
        badge: '🔥 Ofertas Relámpago Colombia',
        title: 'Precios Especiales y Combos RedCover',
        subtitle: 'Descuentos directos aplicados en carrito o financiados por WhatsApp. Desliza con las flechas para ver más.',
        stockAlert: 'Unidades Limitadas con Envío Hoy'
      },
      offers: [
        {
          id: 'offer-1',
          discountBadge: '-18% OFF',
          topTag: 'Envío Gratis Hoy',
          title: 'Combo iPhone 18 Pro (256GB) + Funda MagSafe + Cargador 35W',
          desc: 'Lleva el nuevo buque insignia 2026 listo para usar con protección Carbon Armor y carga rápida original.',
          price: 6199000,
          oldPrice: 7499000,
          progressPercent: 85,
          stockLeftText: 'Quedan 4 combos',
          img: IMG_IPHONE_PRO
        },
        {
          id: 'offer-2',
          discountBadge: '-15% OFF',
          topTag: 'Especial Creativos',
          title: 'Combo MacBook Air M5 13" (16GB/512GB) + AirPods 4 ANC',
          desc: 'Potencia todo tu flujo de trabajo con el chip M5 de 2nm y auriculares con cancelación activa de ruido.',
          price: 5899000,
          oldPrice: 6898000,
          progressPercent: 78,
          stockLeftText: 'Quedan 5 combos',
          img: IMG_MACBOOK
        },
        {
          id: 'offer-3',
          discountBadge: '-22% OFF',
          topTag: 'Pack Ecosistema Pro',
          title: 'Kit MagSafe Total: Cargador MagSafe 25W + Batería + AirTag',
          desc: 'Energía magnética todo el día y localización precisa en la red Encontrar de Apple.',
          price: 799000,
          oldPrice: 1029000,
          progressPercent: 90,
          stockLeftText: 'Últimas 3 uds',
          img: IMG_AIRPODS
        },
        {
          id: 'offer-4',
          discountBadge: '-14% OFF',
          topTag: 'Estudio Digital Pro',
          title: 'Combo iPad Air M4 (11") + Apple Pencil Pro Magnético',
          desc: 'El lienzo definitivo para diseño, arquitectura, notas universitarias e ilustración profesional.',
          price: 3999000,
          oldPrice: 4648000,
          progressPercent: 68,
          stockLeftText: 'Quedan 7 combos',
          img: IMG_IPAD
        },
        {
          id: 'offer-5',
          discountBadge: '-16% OFF',
          topTag: 'Combo Android Flagship',
          title: 'Samsung Galaxy S26 Ultra (256GB) + Cargador 45W + Funda',
          desc: 'Estrena el nuevo Galaxy S26 Ultra con S-Pen integrado, cámara de 200 MP y carga superrápida.',
          price: 6399000,
          oldPrice: 7599000,
          progressPercent: 80,
          stockLeftText: 'Quedan 4 combos',
          img: IMG_IPHONE_PRO
        },
        {
          id: 'offer-6',
          discountBadge: '-19% OFF',
          topTag: 'Salud & Deporte 2026',
          title: 'Pack Apple Watch Series 12 + AirPods Pro 3 (Chip H3)',
          desc: 'Sincronización total de salud cardíaca, temperatura y audio espacial sin pérdida para entrenar al máximo.',
          price: 3199000,
          oldPrice: 3948000,
          progressPercent: 74,
          stockLeftText: 'Quedan 6 packs',
          img: IMG_WATCH
        }
      ],
      accessories: [
        {
          id: 'acc-cubo-20w',
          category: 'carga',
          badge: 'Carga Rápida',
          badgeColor: 'bg-red-600',
          title: 'Cubo de Carga 20W USB-C Original Apple',
          desc: 'Adaptador de corriente USB-C de 20W original sellado en caja. Carga rápida del 0 al 50% en 30 minutos para iPhone y iPad.',
          price: 119000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7T2_GEO_US?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPhone 11 a 18 Pro, iPad, Apple Watch'
        },
        {
          id: 'acc-cubo-40w',
          category: 'carga',
          badge: 'Carga Ultra Rápida Dual',
          badgeColor: 'bg-zinc-900',
          title: 'Cubo de Carga 40W USB-C Dual Original Apple',
          desc: 'Adaptador de corriente dual original de 40W para máxima velocidad de carga simultánea en iPhone, iPad Pro y MacBook Air.',
          price: 189000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MNWM3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'MacBook Air, iPad Pro, iPhone 16/17/18'
        },
        {
          id: 'acc-magsafe-25w',
          category: 'carga',
          badge: 'MagSafe 25W Qi2',
          badgeColor: 'bg-red-600',
          title: 'Cargador MagSafe Oficial Apple (1m / 25W)',
          desc: 'Alineación magnética perfecta para carga ultra rápida de 25W compatible con iPhone 12 en adelante y estuches MagSafe.',
          price: 249000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX6X3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPhone 12 a 18 Pro Max, AirPods con MagSafe'
        },
        {
          id: 'acc-airpods-pro-2',
          category: 'audio',
          badge: 'Cancelación Pro',
          badgeColor: 'bg-zinc-900',
          title: 'AirPods Pro 2 (USB-C MagSafe con Altavoz)',
          desc: 'Cancelación activa de ruido hasta 2 veces superior, audio espacial personalizado y estuche con altavoz de búsqueda precisa.',
          price: 1049000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'Todos los dispositivos Apple y Bluetooth'
        },
        {
          id: 'acc-pencil-pro',
          category: 'pencil',
          badge: 'Gama Creativa Pro',
          badgeColor: 'bg-red-600',
          title: 'Apple Pencil Pro Original con Respuesta Háptica',
          desc: 'Gesto de apretar, rotación del barril, respuesta háptica, puntero flotante y localización precisa en la app Encontrar.',
          price: 699000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPad Pro M4, iPad Air M2/M4'
        },
        {
          id: 'acc-pencil-usbc',
          category: 'pencil',
          badge: 'Original Apple',
          badgeColor: 'bg-zinc-900',
          title: 'Apple Pencil (USB-C) Original',
          desc: 'Precisión milimétrica, baja latencia, sensibilidad a la inclinación y acople magnético para cargar y enlazar por USB-C.',
          price: 449000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MUWA3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPad 10ma gen, iPad Air, iPad Pro USB-C'
        },
        {
          id: 'acc-cable-usbc',
          category: 'cables',
          badge: 'Trenzado 60W/240W',
          badgeColor: 'bg-emerald-600',
          title: 'Cable de Carga USB-C a USB-C Original Apple (1m)',
          desc: 'Diseño trenzado de alta durabilidad para carga rápida y transferencia de datos confiable en iPhone 15/16/17/18 y Mac.',
          price: 99000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU2G3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPhone 15/16/17/18, iPad Pro/Air, MacBook Pro/Air'
        },
        {
          id: 'acc-cable-lightning',
          category: 'cables',
          badge: 'Original Certificado',
          badgeColor: 'bg-zinc-900',
          title: 'Cable USB-C a Lightning Original Apple (1m)',
          desc: 'Conecta tu iPhone con conector Lightning a un cargador de pared USB-C para aprovechar la carga rápida oficial.',
          price: 89000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM0A3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPhone 11, 12, 13, 14, AirPods y Magic Mouse'
        },
        {
          id: 'acc-airtag-single',
          category: 'airtag',
          badge: 'Rastreo UWB',
          badgeColor: 'bg-red-600',
          title: 'Apple AirTag (Unidad Individual)',
          desc: 'Rastreador inteligente oficial con chip U1/U2 y red Encontrar de Apple para localizar tus llaves, maletas o vehículo.',
          price: 159000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPhone 11 en adelante con chip U1/U2'
        },
        {
          id: 'acc-airtag-pack4',
          category: 'airtag',
          badge: 'Pack x4 Ahorro',
          badgeColor: 'bg-red-600',
          title: 'Apple AirTag (Pack de 4 Unidades Oficial)',
          desc: 'Protege todo lo importante: morrales, maletas de viaje, vehículos y llaves con el pack cuádruple de AirTags Apple.',
          price: 549000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-4pack-select-202104?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'iPhone con iOS 14.5 en adelante'
        },
        {
          id: 'acc-funda-carbon',
          category: 'fundas',
          badge: 'Kevlar MagSafe',
          badgeColor: 'bg-zinc-900',
          title: 'Funda Carbon Armor Pro MagSafe Kevlar',
          desc: 'Protección militar ultraliviana en fibra de carbono auténtica con imanes de neodimio N52 compatibles con cargadores MagSafe.',
          price: 189000,
          img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
          compat: 'iPhone 15 Pro, 16 Pro, 17 Pro, 18 Pro'
        },
        {
          id: 'acc-correa-alpine',
          category: 'correas',
          badge: 'Titanio & Tejido',
          badgeColor: 'bg-amber-600',
          title: 'Correa Apple Watch Ultra Alpine Loop Oficial',
          desc: 'Tejido continuo de alta resistencia sin costuras con gancho en G de titanio resistente a la corrosión para entrenamientos extremos.',
          price: 219000,
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQEG3?wid=800&hei=800&fmt=jpeg&qlt=90',
          compat: 'Apple Watch 44mm, 45mm, 46mm y Ultra 49mm'
        }
      ],
      canjeConfig: {
        badge: 'Renovación Inteligente RedCover',
        title: 'Plan Canje Oficial:',
        maxText: 'Recibe hasta $4.200.000 COP.',
        desc: 'Calcula en segundos cuánto te damos por tu equipo actual según su modelo, porcentaje de batería y estado físico. El bono se descuenta inmediatamente de tu carrito o financiación.',
        devices: [
          { name: 'iPhone 17 Pro Max (256GB - 1TB)', value: 4200000 },
          { name: 'iPhone 17 Pro (128GB - 512GB)', value: 3800000 },
          { name: 'iPhone 16 Pro Max (256GB - 1TB)', value: 3450000 },
          { name: 'iPhone 16 Pro (128GB - 512GB)', value: 3100000 },
          { name: 'iPhone 16 / 16 Plus', value: 2550000 },
          { name: 'iPhone 15 Pro Max (256GB - 512GB)', value: 2950000 },
          { name: 'iPhone 15 Pro (128GB - 256GB)', value: 2600000 },
          { name: 'iPhone 15 / 15 Plus', value: 2100000 },
          { name: 'iPhone 14 Pro Max', value: 2350000 },
          { name: 'iPhone 14 Pro', value: 2050000 },
          { name: 'iPhone 14 / 14 Plus', value: 1650000 },
          { name: 'iPhone 13 Pro Max / 13 Pro', value: 1800000 },
          { name: 'iPhone 13 / 12 Pro Max', value: 1350000 },
          { name: 'iPhone 12 / iPhone 11', value: 950000 },
          { name: 'MacBook Pro / Air (Chip M1, M2, M3 o M4)', value: 3200000 },
          { name: 'iPad Pro / iPad Air (Chip M1, M2 o M4)', value: 2100000 },
          { name: 'Apple Watch Ultra / Series 8, 9, 10 o 11', value: 1200000 },
          { name: 'Samsung Galaxy S25 Ultra / Z Fold 6', value: 3400000 },
          { name: 'Samsung Galaxy S24 Ultra / S24+', value: 2600000 }
        ]
      },
      stores: [
        {
          id: 'store-1',
          city: 'Bogotá D.C. • San Andresito de la 38',
          badge: 'Sede Principal • Local 136',
          address: 'Centro Comercial Caribe • Local 136 (San Andresito de la 38)',
          hours: 'Lun - Sáb: 9:30 AM - 7:30 PM | Dom y Festivos: 10:00 AM - 5:00 PM',
          phone: '+57 300 123 4567'
        },
        {
          id: 'store-2',
          city: 'Bogotá D.C. • San Andresito de la 38',
          badge: 'Showroom & Plan Canje • Local 197',
          address: 'Centro Comercial Caribe • Local 197 (San Andresito de la 38)',
          hours: 'Lun - Sáb: 9:30 AM - 7:30 PM | Dom y Festivos: 10:00 AM - 5:00 PM',
          phone: '+57 300 123 4567'
        }
      ]
    };

    let cmsData = JSON.parse(JSON.stringify(defaultCMSData));
    let currentAdminTab = 'devices';
    let selectedAdminDeviceIndex = 0;
    let selectedAdminOfferIndex = 0;
    let selectedAdminAccessoryIndex = 0;
    let adminDeviceSearchQuery = '';
    let adminDeviceCategoryFilter = 'all';
    let currentAccCategoryFilter = 'all';
    let inlineTextEditingEnabled = false;

    async function loadCMSState() {
      let hasLocalChanges = false;
      // 1. Cargar tus cambios guardados en este navegador (tu trabajo actual tiene máxima prioridad)
      try {
        const raw = localStorage.getItem(CMS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.devices && Array.isArray(parsed.devices) && parsed.devices.length > 0) {
            allCatalogDevices = parsed.devices;
            hasLocalChanges = true;
          }
          if (parsed.cmsData) {
            cmsData = Object.assign(JSON.parse(JSON.stringify(defaultCMSData)), parsed.cmsData);
            hasLocalChanges = true;
          }
        }
      } catch (e) {
        console.warn('Carga local:', e);
      }

      // Si tienes cambios en tu navegador, subirlos de inmediato a PostgreSQL para que el servidor los adopte
      if (hasLocalChanges) {
        try {
          fetch('/api/catalog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              password: (typeof currentAdminPassword !== 'undefined' ? currentAdminPassword : '') || ADMIN_MASTER_PASSWORD,
              devices: allCatalogDevices,
              cmsData: cmsData
            })
          }).catch(() => {});
        } catch(e) {}
        return; // Detener aquí para que NINGUNA consulta antigua sobreescriba lo que hiciste
      }

      // 2. Si es un navegador nuevo o limpio, cargar desde PostgreSQL
      try {
        const res = await fetch('/api/catalog');
        if (res.ok) {
          const remote = await res.json();
          if (remote.exists && remote.devices && remote.devices.length > 0) {
            allCatalogDevices = remote.devices;
            if (remote.cmsData) {
              cmsData = Object.assign(JSON.parse(JSON.stringify(defaultCMSData)), remote.cmsData);
            }
            renderAllCMSContent();
          }
        }
      } catch (err) {
        console.log('Cargado catálogo base');
      }
    }

    async function saveCMSState() {
      try {
        const payload = JSON.stringify({
          devices: allCatalogDevices,
          cmsData: cmsData
        });
        localStorage.setItem(CMS_STORAGE_KEY, payload);
        localStorage.setItem('redcover_cms_data', payload);
        updateAdminCounters();
      } catch (err) {
        console.warn('Advertencia localStorage:', err);
      }

      // 1. Guardar en base de datos PostgreSQL
      try {
        const response = await fetch('/api/catalog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: (typeof currentAdminPassword !== 'undefined' ? currentAdminPassword : '') || ADMIN_MASTER_PASSWORD,
            devices: allCatalogDevices,
            cmsData: cmsData
          })
        });

        if (response.ok) {
          console.log('☁️ Sincronizado en PostgreSQL');
        }
      } catch (networkErr) {
        console.log('Error de red persistiendo en PostgreSQL:', networkErr);
      }

      // 2. Guardar también directamente en el archivo src/data/catalog.js del proyecto
      // para que tus cambios queden fijos en el código fuente y suban a GitHub/servidor
      try {
        await fetch('/api/sync-to-files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            devices: allCatalogDevices,
            accessories: (cmsData && cmsData.accessories && cmsData.accessories.length > 0) ? cmsData.accessories : undefined,
            offers: (cmsData && cmsData.offers && cmsData.offers.length > 0) ? cmsData.offers : undefined
          })
        });
      } catch (e) {}
    }

    function updateAdminCounters() {
      const cDev = document.getElementById('adm-count-devices');
      const cOff = document.getElementById('adm-count-offers');
      const cAcc = document.getElementById('adm-count-accessories');
      if (cDev) cDev.innerText = allCatalogDevices.length;
      if (cOff) cOff.innerText = cmsData.offers.length;
      if (cAcc) cAcc.innerText = cmsData.accessories.length;
    }

    // Renderizar toda la página a partir de los datos del CMS
    function renderAllCMSContent() {
      renderCMSHeroAndTopbar();
      renderCMSCategories();
      renderDevicesCatalog(currentCatalogCategoryFilter);
      renderCMSOffers();
      renderCMSAccessories(currentAccCategoryFilter);
      renderCMSCanjeAndStores();
      updateAdminCounters();
    }

    let currentHeroSlideIndex = 0;
    let heroAutoSlideTimer = null;
    let currentOffersStartIndex = 0;
    const OFFERS_PER_VIEW = 2;

    function renderCMSHeroAndTopbar() {
      const topbar = document.getElementById('cms-promo-topbar');
      if (topbar) topbar.innerText = cmsData.topbarText;

      const h = cmsData.hero;
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
      setTxt('cms-hero-auth-badge', h.authBadge);
      setTxt('cms-hero-clients-badge', h.clientsBadge);
      setTxt('cms-hero-rating-badge', h.ratingBadge);
      if (!document.getElementById('btn-flagship-18-pro')) { setTxt('cms-hero-title-main', h.titleMain); }
      if (!document.getElementById('btn-flagship-18-pro')) { setTxt('cms-hero-title-gradient', h.titleGradient); }
      setTxt('cms-hero-description', h.description);
      setTxt('cms-hero-cta1', h.cta1Text);
      setTxt('cms-hero-cta2', h.cta2Text);

      renderHeroBannerCarousel();

      const bentoGrid = document.getElementById('bento-ecosystem-grid');
      if (bentoGrid && Array.isArray(cmsData.bentoCards)) {
        bentoGrid.innerHTML = cmsData.bentoCards.map((card, idx) => `
          <div class="rounded-2xl ${card.darkTheme ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 text-white border-zinc-800/90 shadow-md' : 'bg-white text-gray-900 border-gray-200/90 shadow-xs'} p-4 sm:p-4.5 border hover:border-primary/70 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group h-full">
            ${adminModeActive ? `
              <button type="button" onclick="openAdminTabTo('hero')" class="absolute top-2.5 right-2.5 z-30 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">edit</span> Editar #${idx + 1}
              </button>
            ` : ''}

            <!-- Top Micro Header & Contenido Superior -->
            <div class="flex flex-col flex-1">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${card.darkTheme ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-red-50 text-primary border border-red-100'} text-[10px] font-bold uppercase tracking-wider">
                  <span class="material-symbols-outlined text-[12px]">${card.icon || 'devices'}</span>
                  ${card.badge}
                </span>
                <span class="text-[10px] font-mono ${card.darkTheme ? 'text-emerald-400' : 'text-emerald-600'} font-bold">● Oficial</span>
              </div>

              <!-- Compact Luxury Image Showcase con altura fija uniforme -->
              <div class="my-2.5 rounded-xl overflow-hidden h-36 bg-zinc-950 flex items-center justify-center relative cursor-pointer border ${card.darkTheme ? 'border-zinc-800' : 'border-gray-100'}" onclick="if('${card.categoryTarget}'==='accesorios'){document.getElementById('accesorios').scrollIntoView({behavior:'smooth'});}else{filterAndScroll('${card.categoryTarget}');}">
                <img src="${card.img}" alt="${card.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                <span class="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono font-semibold text-zinc-200 border border-white/15">
                  ${card.chipSpec || 'Apple Silicon 2026'}
                </span>
              </div>

              <!-- Titulo y Descripcion con alturas fijas de linea para alineacion milimetrica -->
              <h3 class="text-sm sm:text-base font-extrabold tracking-tight leading-snug mt-2 cursor-pointer hover:text-primary transition-colors h-11 line-clamp-2" onclick="if('${card.categoryTarget}'==='accesorios'){document.getElementById('accesorios').scrollIntoView({behavior:'smooth'});}else{filterAndScroll('${card.categoryTarget}');}">${card.title}</h3>
              <p class="text-[11px] ${card.darkTheme ? 'text-zinc-400' : 'text-gray-500'} leading-relaxed mt-1 h-8 line-clamp-2">${card.desc}</p>
            </div>

            <!-- Footer Bar Uniforme: Precios alineados y Botones a la misma altura en todas las tarjetas -->
            <div class="z-10 pt-3 mt-3 border-t ${card.darkTheme ? 'border-zinc-800/80' : 'border-gray-100'} flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] uppercase tracking-wider ${card.darkTheme ? 'text-zinc-400' : 'text-gray-500'} font-semibold">Contado o Financiado</span>
                <span class="text-xs sm:text-sm font-extrabold ${card.darkTheme ? 'text-white' : 'text-gray-900'}">${card.priceText}</span>
              </div>
              
              <!-- Fila de Botones 100% Simetrica y Alineada -->
              <div class="grid ${card.productIdTarget ? 'grid-cols-2' : 'grid-cols-1'} gap-1.5 w-full">
                ${card.productIdTarget ? `
                  <a href="configuracion.html?id=${card.productIdTarget}" onclick="localStorage.setItem('redcover_selected_device_id', '${card.productIdTarget}')" class="metallic-btn metallic-btn-silver !p-0.5 w-full text-center">
                    <span class="metallic-btn-inner !py-1.5 !px-2 text-[11px] font-bold w-full justify-center">
                      Configurar
                    </span>
                  </a>
                ` : ''}
                <button type="button" onclick="if('${card.categoryTarget}'==='accesorios'){document.getElementById('accesorios').scrollIntoView({behavior:'smooth'});}else{filterAndScroll('${card.categoryTarget}');}" class="metallic-btn metallic-btn-crimson !p-0.5 w-full text-center cursor-pointer">
                  <span class="metallic-btn-inner !py-1.5 !px-2 text-[11px] font-bold w-full justify-center gap-1">
                    ${card.btnText} <span class="material-symbols-outlined text-xs">chevron_right</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    function renderHeroBannerCarousel() {
      const viewport = document.getElementById('hero-slides-viewport');
      const dotsBar = document.getElementById('hero-dots-bar');
      if (!viewport) return;

      if (!Array.isArray(cmsData.heroSlides) || cmsData.heroSlides.length === 0) {
        cmsData.heroSlides = JSON.parse(JSON.stringify(defaultCMSData.heroSlides));
      }

      const slides = cmsData.heroSlides;
      if (currentHeroSlideIndex >= slides.length) currentHeroSlideIndex = 0;
      if (currentHeroSlideIndex < 0) currentHeroSlideIndex = slides.length - 1;

      const s = slides[currentHeroSlideIndex];
      const isVideo = s.mediaType === 'video' || (s.mediaUrl && /\.(mp4|webm|ogg)(\?|$)/i.test(s.mediaUrl)) || (s.mediaUrl && s.mediaUrl.startsWith('data:video/'));

      viewport.innerHTML = `
        <div class="w-full h-full relative transition-opacity duration-500">
          ${isVideo ? `
            <video src="${s.mediaUrl}" autoplay muted playsinline class="w-full h-full object-cover transition-transform duration-1000 scale-100 hover:scale-105"></video>
          ` : `
            <img src="${s.mediaUrl}" alt="${s.title}" class="w-full h-full object-cover transition-transform duration-700">
          `}
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14 pb-14 sm:pb-16 text-left">
            <div class="max-w-[96rem] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div class="space-y-2 max-w-3xl">
                <div class="flex items-center gap-2.5">
                  <span class="px-3.5 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md shadow-red-600/30">${s.badge || 'Banner RedCover 2026'}</span>
                  <span class="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                    ${isVideo ? '🎬 Video Ultra HD' : `Banner ${currentHeroSlideIndex + 1} de ${slides.length}`}
                  </span>
                </div>
                <h2 class="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">${s.title}</h2>
                <p class="text-zinc-200 text-sm sm:text-base lg:text-lg max-w-2xl font-medium leading-relaxed drop-shadow-sm">${s.subtitle}</p>
              </div>
              <div class="flex flex-wrap items-center gap-3 shrink-0 sm:mr-8 md:mr-10">
                <a href="catalogo.html?cat=${s.categoryTarget || 'all'}" class="metallic-btn metallic-btn-crimson text-xs sm:text-sm font-extrabold uppercase tracking-tight shadow-xl shadow-red-600/40 hover:scale-105 transition-transform">
                  <span class="metallic-btn-inner flex items-center justify-center gap-2 !py-3 !px-6">
                    <span class="material-symbols-outlined text-base">storefront</span>
                    <span>Ir a Tienda</span>
                    <span class="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

      if (dotsBar) {
        dotsBar.innerHTML = slides.map((slideItem, idx) => `
          <button type="button" onclick="goToHeroSlide(${idx})" class="h-2.5 rounded-full transition-all ${idx === currentHeroSlideIndex ? 'w-8 bg-primary shadow-sm' : 'w-2.5 bg-white/50 hover:bg-white'}" title="Ir a Banner ${idx + 1}"></button>
        `).join('');
      }

      if (heroAutoSlideTimer) {
        clearTimeout(heroAutoSlideTimer);
        clearInterval(heroAutoSlideTimer);
        heroAutoSlideTimer = null;
      }

      // Manejo de duracion de pase: Imagen fija (7.5s) o Video (su duracion o maximo 10s)
      const advanceSlide = () => {
        // Pausar solo si la ventana del CMS está abierta activamente editando
        const adminModal = document.getElementById('admin-cms-modal');
        if (adminModal && !adminModal.classList.contains('hidden') && adminModal.classList.contains('flex')) {
          return;
        }
        if (heroAutoSlideTimer) {
          clearTimeout(heroAutoSlideTimer);
          heroAutoSlideTimer = null;
        }
        currentHeroSlideIndex = (currentHeroSlideIndex + 1) % cmsData.heroSlides.length;
        renderHeroBannerCarousel();
      };

      if (isVideo) {
        const videoEl = viewport.querySelector('video');
        let hasAdvanced = false;

        const triggerAdvance = () => {
          if (hasAdvanced) return;
          hasAdvanced = true;
          if (heroAutoSlideTimer) {
            clearTimeout(heroAutoSlideTimer);
            heroAutoSlideTimer = null;
          }
          advanceSlide();
        };

        if (videoEl) {
          // Asegurar propiedades de autoplay silencioso para políticas de navegadores
          videoEl.muted = true;
          videoEl.defaultMuted = true;
          videoEl.playsInline = true;
          videoEl.currentTime = 0;
          videoEl.play().catch(() => {});

          // 1. EVENTO PRINCIPAL: Cuando el video llega a su final exacto (sea 5s, 15s, 30s)
          videoEl.onended = triggerAdvance;

          // 2. MONITOREO EN TIEMPO REAL: Si por alguna razón onended no dispara, vigilar timeupdate
          videoEl.ontimeupdate = () => {
            if (videoEl.duration && videoEl.currentTime >= (videoEl.duration - 0.25)) {
              triggerAdvance();
            }
          };

          // 3. Temporizador de respaldo dinámico basado en la duración exacta del video
          const scheduleByDuration = () => {
            const dur = videoEl.duration;
            if (dur && !isNaN(dur) && isFinite(dur) && dur > 0) {
              if (heroAutoSlideTimer) clearTimeout(heroAutoSlideTimer);
              // Esperar la duración total exacta del video + 300ms de holgura natural
              const waitMs = Math.round(dur * 1000) + 300;
              heroAutoSlideTimer = setTimeout(triggerAdvance, waitMs);
            }
          };

          if (videoEl.readyState >= 1) {
            scheduleByDuration();
          } else {
            videoEl.onloadedmetadata = scheduleByDuration;
          }

          // En caso extremo de video roto o que no cargue, avanzar tras 12s
          videoEl.onerror = triggerAdvance;
        } else {
          heroAutoSlideTimer = setTimeout(triggerAdvance, 7000);
        }
      } else {
        // Si es una imagen fija, se muestra durante 6.5 segundos
        heroAutoSlideTimer = setTimeout(advanceSlide, 6500);
      }
    }

    function prevHeroSlide() {
      if (!cmsData.heroSlides || cmsData.heroSlides.length === 0) return;
      currentHeroSlideIndex = (currentHeroSlideIndex - 1 + cmsData.heroSlides.length) % cmsData.heroSlides.length;
      renderHeroBannerCarousel();
    }

    function nextHeroSlide() {
      if (!cmsData.heroSlides || cmsData.heroSlides.length === 0) return;
      currentHeroSlideIndex = (currentHeroSlideIndex + 1) % cmsData.heroSlides.length;
      renderHeroBannerCarousel();
    }

    function goToHeroSlide(index) {
      currentHeroSlideIndex = index;
      renderHeroBannerCarousel();
    }

    function renderCMSCategories() {
      const quickBar = document.getElementById('quick-categories-bar');
      if (quickBar) {
        const catItems = cmsData.deviceCategories.map(cat => {
          const count = allCatalogDevices.filter(d => d.category === cat.id).length;
          return `
            <button type="button" onclick="filterAndScroll('${cat.id}')" class="group p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all flex items-center gap-3 text-left">
              <div class="w-10 h-10 rounded-xl bg-red-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">${cat.icon || 'devices'}</span>
              </div>
              <div>
                <span class="text-xs font-extrabold text-gray-900 block">${cat.shortName || cat.name} (${count})</span>
                <span class="text-[10px] text-gray-500">${cat.subtitle || 'Ver modelos'}</span>
              </div>
            </button>
          `;
        }).join('');

        quickBar.innerHTML = catItems + `
          <a href="#ofertas" class="group p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-xl bg-red-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">local_fire_department</span>
            </div>
            <div>
              <span class="text-xs font-extrabold text-gray-900 block">Ofertas (${cmsData.offers.length})</span>
              <span class="text-[10px] text-gray-500">Combos en promo</span>
            </div>
          </a>
          <a href="#canje" class="group p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-xl bg-red-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">swap_horiz</span>
            </div>
            <div>
              <span class="text-xs font-extrabold text-gray-900 block">Plan Canje</span>
              <span class="text-[10px] text-gray-500">Recibimos tu Apple</span>
            </div>
          </a>
        `;
      }

      const devTabs = document.getElementById('device-category-tabs');
      if (devTabs) {
        const allActive = currentCatalogCategoryFilter === 'all';
        let tabsHTML = `
          <button type="button" onclick="filterDevices('all')" data-dev-filter="all" class="dev-tab-btn px-5 py-2.5 rounded-full text-xs ${allActive ? 'font-bold bg-primary text-white shadow-sm' : 'font-semibold bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'} transition-all whitespace-nowrap">
            Todos los Equipos (${allCatalogDevices.length})
          </button>
        `;
        tabsHTML += cmsData.deviceCategories.map(cat => {
          const count = allCatalogDevices.filter(d => d.category === cat.id).length;
          const isAct = currentCatalogCategoryFilter === cat.id;
          return `
            <button type="button" onclick="filterDevices('${cat.id}')" data-dev-filter="${cat.id}" class="dev-tab-btn px-5 py-2.5 rounded-full text-xs ${isAct ? 'font-bold bg-primary text-white shadow-sm' : 'font-semibold bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'} transition-all whitespace-nowrap flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base">${cat.icon || 'devices'}</span> ${cat.name} (${count})
            </button>
          `;
        }).join('');
        devTabs.innerHTML = tabsHTML;
      }

      const accFilters = document.getElementById('accessory-filters');
      if (accFilters) {
        const allAccActive = currentAccCategoryFilter === 'all';
        let accHTML = `
          <button onclick="renderCMSAccessories('all')" class="filter-acc-btn px-5 py-2 rounded-full text-xs ${allAccActive ? 'font-bold bg-primary text-white' : 'font-medium bg-white border border-gray-200 text-gray-700 hover:border-primary'} transition-all">
            Todos (${cmsData.accessories.length})
          </button>
        `;
        accHTML += cmsData.accessoryCategories.map(c => {
          const isAct = currentAccCategoryFilter === c.id;
          const cnt = cmsData.accessories.filter(a => a.category === c.id).length;
          return `
            <button onclick="renderCMSAccessories('${c.id}')" class="filter-acc-btn px-5 py-2 rounded-full text-xs ${isAct ? 'font-bold bg-primary text-white' : 'font-medium bg-white border border-gray-200 text-gray-700 hover:border-primary'} transition-all">
              ${c.name} (${cnt})
            </button>
          `;
        }).join('');
        accFilters.innerHTML = accHTML;
      }
    }

    function renderCMSOffers() {
      const oh = cmsData.offersHeader;
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
      setTxt('cms-ofertas-badge', oh.badge);
      setTxt('cms-ofertas-title', oh.title);
      setTxt('cms-ofertas-subtitle', oh.subtitle);
      setTxt('cms-ofertas-stock', oh.stockAlert);

      const grid = document.getElementById('offers-grid');
      if (!grid) return;

      const totalOffers = cmsData.offers.length;
      const maxStart = Math.max(0, totalOffers - OFFERS_PER_VIEW);
      if (currentOffersStartIndex > maxStart) currentOffersStartIndex = maxStart;
      if (currentOffersStartIndex < 0) currentOffersStartIndex = 0;

      const visibleOffers = cmsData.offers.slice(currentOffersStartIndex, currentOffersStartIndex + OFFERS_PER_VIEW);

      const ind = document.getElementById('offers-slide-indicator');
      if (ind) {
        if (totalOffers === 0) {
          ind.innerText = '0 / 0';
        } else {
          const endIdx = Math.min(currentOffersStartIndex + OFFERS_PER_VIEW, totalOffers);
          ind.innerText = `${currentOffersStartIndex + 1}-${endIdx} de ${totalOffers}`;
        }
      }

      const prevBtn = document.getElementById('offers-prev-btn');
      const nextBtn = document.getElementById('offers-next-btn');
      if (prevBtn) {
        prevBtn.disabled = currentOffersStartIndex <= 0;
        prevBtn.classList.toggle('opacity-40', currentOffersStartIndex <= 0);
        prevBtn.classList.toggle('cursor-not-allowed', currentOffersStartIndex <= 0);
      }
      if (nextBtn) {
        nextBtn.disabled = currentOffersStartIndex >= maxStart;
        nextBtn.classList.toggle('opacity-40', currentOffersStartIndex >= maxStart);
        nextBtn.classList.toggle('cursor-not-allowed', currentOffersStartIndex >= maxStart);
      }

      grid.innerHTML = visibleOffers.map((off, localIdx) => {
        const realIdx = currentOffersStartIndex + localIdx;
        return `
        <div class="rounded-2xl bg-zinc-800/95 border border-zinc-700/80 hover:border-red-500/60 p-5 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative group">
          ${adminModeActive ? `
            <button type="button" onclick="openAdminEditOffer(${realIdx})" class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">edit</span> Editar #${realIdx + 1}
            </button>
          ` : ''}
          <div>
            <!-- Imagen Superior Vertical -->
            <div class="w-full h-44 rounded-xl bg-zinc-950 overflow-hidden relative flex items-center justify-center mb-4 border border-zinc-700/60">
              <span class="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase shadow-sm">${off.discountBadge}</span>
              <span class="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">${off.stockLeftText}</span>
              <img src="${off.img}" alt="${off.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>

            <!-- Etiqueta y Textos Bien Alineados -->
            <div class="space-y-2">
              <span class="inline-block text-[10px] font-mono uppercase text-red-400 font-bold bg-red-500/15 px-2.5 py-0.5 rounded-full border border-red-500/30">${off.topTag}</span>
              <h3 class="text-sm font-extrabold text-white leading-snug line-clamp-2 min-h-[2.5rem]">${off.title}</h3>
              <p class="text-xs text-zinc-400 leading-relaxed line-clamp-2 min-h-[2rem]">${off.desc}</p>
            </div>
          </div>

          <div class="pt-4 mt-4 border-t border-zinc-700/70 space-y-3">
            <div class="w-full bg-zinc-700 h-1.5 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full" style="width: ${off.progressPercent || 80}%"></div>
            </div>
            <div class="flex items-end justify-between gap-2">
              <div>
                <span class="text-[11px] text-zinc-400 line-through block">${formatCOP(off.oldPrice)}</span>
                <span class="text-lg font-extrabold text-white">${formatCOP(off.price)}</span>
              </div>
              <button type="button" onclick="directFinanceWhatsApp('${off.title.replace(/'/g, "\\'")}', ${off.price})" class="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-colors shrink-0" title="Financiar Oferta por WhatsApp">
                <span class="material-symbols-outlined text-base">chat</span>
              </button>
            </div>
            <button type="button" onclick="addToCart('${off.title.replace(/'/g, "\\'")}', ${off.price}, '${off.img}')" class="w-full py-2.5 rounded-xl crimson-btn text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">shopping_bag</span> Aprovechar Oferta
            </button>
          </div>
        </div>
        `;
      }).join('');
    }

    function prevOffersSlide() {
      if (currentOffersStartIndex > 0) {
        currentOffersStartIndex = Math.max(0, currentOffersStartIndex - 1);
        renderCMSOffers();
      } else {
        showToast('Estás en el inicio de las ofertas especiales');
      }
    }

    function nextOffersSlide() {
      const maxStart = Math.max(0, cmsData.offers.length - OFFERS_PER_VIEW);
      if (currentOffersStartIndex < maxStart) {
        currentOffersStartIndex = Math.min(maxStart, currentOffersStartIndex + 1);
        renderCMSOffers();
      } else {
        showToast('Ya estás viendo las últimas ofertas disponibles');
      }
    }

    // ==========================================
    // SHOWCASE INTERACTIVO: INGENIERÍA DE VANGUARDIA (DOS TARJETAS VISUALES)
    // ==========================================
    const vanguardiaData = {
      iphone: {
        card1: {
          title: 'iPhone 18 Pro & Pro Max',
          tag: 'iPhone 18 Pro Max',
          badge: 'Flagship • Titanio',
          desc: 'Chip A19 Pro, titanio aeroespacial Grado 5 y cámara 48MP con teleobjetivo 5x.',
          img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=iphone',
          btnText: 'Ver Pro Max'
        },
        card2: {
          title: 'iPhone Air & iPhone 17',
          tag: 'iPhone Air & 17',
          badge: 'Ultra Delgado • 5.5mm',
          desc: 'Diseño ultraligero revolucionario con pantalla ProMotion 120Hz y chip A19.',
          img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=iphone',
          btnText: 'Ver iPhone Air'
        }
      },
      mac: {
        card1: {
          title: 'MacBook Pro 14" & 16"',
          tag: 'Gama Profesional',
          badge: 'Apple Silicon M4',
          desc: 'Potencia máxima con M4 Pro/Max, Liquid Retina XDR y hasta 128GB RAM unificada.',
          img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=mac',
          btnText: 'Ver MacBook Pro'
        },
        card2: {
          title: 'MacBook Air 13" & 15"',
          tag: 'Ultraligera M3',
          badge: '24h Autonomía',
          desc: 'Diseño ultrafino sin ventiladores, rápida, silenciosa y pantalla Liquid Retina.',
          img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=mac',
          btnText: 'Ver MacBook Air'
        }
      },
      ipad: {
        card1: {
          title: 'iPad Pro M4 (11" y 13")',
          tag: 'Chip M4 • 5.1mm',
          badge: 'Ultra Retina XDR',
          desc: 'Pantalla OLED en tándem de 1000 nits, chip M4 y Apple Pencil Pro.',
          img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=ipad',
          btnText: 'Ver iPad Pro'
        },
        card2: {
          title: 'iPad Air M2 & iPad Mini',
          tag: 'Gama Air & Mini',
          badge: 'Versatilidad M2',
          desc: 'Rendimiento épico para estudio y trabajo con compatibilidad Magic Keyboard.',
          img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=ipad',
          btnText: 'Ver iPad Air'
        }
      },
      watch: {
        card1: {
          title: 'Apple Watch Ultra 2',
          tag: 'Resistencia Extrema',
          badge: 'Titanio 49mm',
          desc: 'Pantalla de 3000 nits, GPS doble frecuencia, caja de titanio y 72h batería.',
          img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=watch',
          btnText: 'Ver Ultra 2'
        },
        card2: {
          title: 'Apple Watch Series 10',
          tag: 'Series 10 Oficial',
          badge: 'Diseño Más Fino',
          desc: 'Pantalla OLED gran angular, carga rápida al 80% en 30 min y sensor de profundidad.',
          img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=watch',
          btnText: 'Ver Series 10'
        }
      },
      airpods: {
        card1: {
          title: 'AirPods Pro 2 MagSafe',
          tag: 'Gama Pro USB-C',
          badge: 'Cancelación 2X',
          desc: 'Audio espacial adaptativo, modo ambiente y estuche con altavoz de rastreo.',
          img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=airpods',
          btnText: 'Ver AirPods Pro'
        },
        card2: {
          title: 'AirPods Max USB-C',
          tag: 'Diadema Premium',
          badge: 'Audio Hi-Fi',
          desc: 'Sonido de alta fidelidad, ecualización adaptativa y almohadillas acústicas.',
          img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=airpods',
          btnText: 'Ver AirPods Max'
        }
      },
      samsung: {
        card1: {
          title: 'Galaxy S26 Ultra',
          tag: 'Titanio & S-Pen',
          badge: 'Galaxy AI • 200 MP',
          desc: 'Cámara 200 MP, zoom espacial 100x, Gorilla Armor y Snapdragon 8 Gen 4.',
          img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=samsung',
          btnText: 'Ver S26 Ultra'
        },
        card2: {
          title: 'Galaxy Z Fold & Z Flip',
          tag: 'Z Series Plegable',
          badge: 'Pantalla Plegable',
          desc: 'Pantalla Dynamic AMOLED 2X de 120Hz con bisagra FlexHinge reforzada.',
          img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=samsung',
          btnText: 'Ver Plegables'
        }
      },
      gafas: {
        card1: {
          title: 'Ray-Ban Meta Wayfarer',
          tag: 'Transitions Gen S',
          badge: 'Edición Transparente',
          desc: 'Montura transparente de colección con arquitectura visible y Qualcomm AR1.',
          img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=gafas',
          btnText: 'Ver Wayfarer'
        },
        card2: {
          title: 'Ray-Ban Meta Headliner',
          tag: 'Cámara 12 MP',
          badge: 'Meta AI Integrada',
          desc: 'Altavoces abiertos integrados, captura de video ultrarrápida y 5 micrófonos.',
          img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
          link: 'catalogo.html?cat=gafas',
          btnText: 'Ver Headliner'
        }
      },
      accesorios: {
        card1: {
          title: 'Cubos de Carga & MagSafe',
          tag: 'Energía Rápida',
          badge: 'Carga Oficial 20W/40W',
          desc: 'Carga de 0 a 50% en 25 minutos para iPhone, iPad y Apple Watch sellados.',
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7T2_GEO_US?wid=800&hei=800&fmt=jpeg&qlt=90',
          link: 'catalogo.html?tipo=accesorios',
          btnText: 'Ver Cargadores'
        },
        card2: {
          title: 'AirTags & Fundas Kevlar',
          tag: 'Protección Total',
          badge: 'Rastreo & Kevlar',
          desc: 'Rastreo de precisión en Encontrar y fundas grado militar con imanes N52.',
          img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-4pack-select-202104?wid=800&hei=800&fmt=jpeg&qlt=90',
          link: 'catalogo.html?tipo=accesorios',
          btnText: 'Ver Protección'
        }
      }
    };

    const vanguardiaKeys = ['iphone', 'mac', 'ipad', 'watch', 'airpods', 'samsung', 'gafas', 'accesorios'];

    window.selectVanguardiaCategory = function(catKey) {
      if (!vanguardiaData[catKey]) return;
      const { card1, card2 } = vanguardiaData[catKey];

      // Actualizar Tarjeta 1
      const img1 = document.getElementById('vanguardia-img-1');
      const badge1 = document.getElementById('vanguardia-badge-1');
      const tag1 = document.getElementById('vanguardia-category-tag-1');
      const title1 = document.getElementById('vanguardia-title-1');
      const desc1 = document.getElementById('vanguardia-desc-1');
      const link1 = document.getElementById('vanguardia-link-1');
      const linkText1 = document.getElementById('vanguardia-link-text-1');

      if (img1) {
        img1.style.opacity = '0.35';
        setTimeout(() => {
          img1.src = card1.img;
          img1.alt = card1.title;
          img1.style.opacity = '1';
        }, 80);
      }
      if (badge1) badge1.innerText = card1.badge;
      if (tag1) tag1.innerText = card1.tag;
      if (title1) title1.innerText = card1.title;
      if (desc1) desc1.innerText = card1.desc;
      if (link1) link1.href = card1.link;
      if (linkText1) linkText1.innerText = card1.btnText;

      // Actualizar Tarjeta 2
      const img2 = document.getElementById('vanguardia-img-2');
      const badge2 = document.getElementById('vanguardia-badge-2');
      const tag2 = document.getElementById('vanguardia-category-tag-2');
      const title2 = document.getElementById('vanguardia-title-2');
      const desc2 = document.getElementById('vanguardia-desc-2');
      const link2 = document.getElementById('vanguardia-link-2');
      const linkText2 = document.getElementById('vanguardia-link-text-2');

      if (img2) {
        img2.style.opacity = '0.35';
        setTimeout(() => {
          img2.src = card2.img;
          img2.alt = card2.title;
          img2.style.opacity = '1';
        }, 80);
      }
      if (badge2) badge2.innerText = card2.badge;
      if (tag2) tag2.innerText = card2.tag;
      if (title2) title2.innerText = card2.title;
      if (desc2) desc2.innerText = card2.desc;
      if (link2) link2.href = card2.link;
      if (linkText2) linkText2.innerText = card2.btnText;

      // Actualizar botones de categoría
      const btns = document.querySelectorAll('.vanguardia-btn');
      btns.forEach(b => {
        const cat = b.getAttribute('data-vanguardia-cat');
        const iconBox = b.querySelector('.vanguardia-icon-box');
        if (cat === catKey) {
          b.classList.remove('bg-gray-50', 'text-gray-900', 'border-gray-200/90');
          b.classList.add('bg-zinc-950', 'text-white', 'border-primary', 'shadow-xs');
          if (iconBox) {
            iconBox.className = 'vanguardia-icon-box w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center transition-colors shrink-0';
          }
        } else {
          b.classList.remove('bg-zinc-950', 'text-white', 'border-primary', 'shadow-xs');
          b.classList.add('bg-gray-50', 'text-gray-900', 'border-gray-200/90');
          if (iconBox) {
            iconBox.className = 'vanguardia-icon-box w-7 h-7 rounded-lg bg-red-50 text-primary flex items-center justify-center transition-colors shrink-0';
          }
        }
      });
    };

    function renderCMSAccessories(filterCat = 'all') {
      currentAccCategoryFilter = filterCat;
      renderCMSCategories();
      const grid = document.getElementById('accessories-grid');
      if (!grid) return;

      const list = filterCat === 'all'
        ? cmsData.accessories
        : cmsData.accessories.filter(a => a.category === filterCat);

      grid.innerHTML = list.map(acc => {
        const realIdx = cmsData.accessories.findIndex(item => item.id === acc.id);
        return `
          <div class="acc-card rounded-2xl bg-white p-5 flex flex-col justify-between group border border-gray-200 hover:border-primary/50 transition-all shadow-sm relative" data-category="${acc.category}">
            ${adminModeActive ? `
              <button type="button" onclick="openAdminEditAccessory(${realIdx})" class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-primary text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">edit</span> Editar
              </button>
            ` : ''}
            <div>
              <div class="relative h-44 rounded-xl overflow-hidden bg-zinc-900 mb-4 flex items-center justify-center">
                <span class="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded-full ${acc.badgeColor || 'bg-red-600/90'} text-[10px] font-bold text-white uppercase">${acc.badge}</span>
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${acc.title}" src="${acc.img}">
              </div>
              <h3 class="text-sm font-bold text-gray-900">${acc.title}</h3>
              <p class="text-xs text-gray-500 mt-1">${acc.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <span class="text-sm font-extrabold text-gray-900">${formatCOP(acc.price)}</span>
              <div class="flex items-center gap-1.5">
                <button onclick="addToCart('${acc.title.replace(/'/g, "\\'")}', ${acc.price}, '${acc.img}')" class="px-3 py-1.5 rounded-lg crimson-btn text-white text-xs font-bold transition-all">Agregar</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderCMSCanjeAndStores() {
      const c = cmsData.canjeConfig;
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
      setTxt('cms-canje-badge', c.badge);
      setTxt('cms-canje-title', c.title);
      setTxt('cms-canje-max', c.maxText);
      setTxt('cms-canje-desc', c.desc);

      const sel = document.getElementById('device-select');
      if (sel && Array.isArray(c.devices) && c.devices.length > 0) {
        sel.innerHTML = c.devices.map(d => `<option value="${d.value}">${d.name} — Hasta ${formatCOP(d.value)}</option>`).join('');
        recalculateCanje();
      }

      const storesGrid = document.getElementById('stores-grid');
      if (storesGrid && Array.isArray(cmsData.stores)) {
        storesGrid.innerHTML = cmsData.stores.map((st, idx) => `
          <div class="rounded-2xl bg-white p-5 border border-gray-200 shadow-sm hover:border-primary transition-all space-y-3 relative">
            ${adminModeActive ? `
              <button type="button" onclick="openAdminTabTo('canje')" class="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-primary text-white text-[10px] font-bold">
                ✏️ Editar
              </button>
            ` : ''}
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 rounded-full bg-red-50 text-primary text-[10px] font-bold uppercase">${st.badge}</span>
              <span class="material-symbols-outlined text-primary text-xl">storefront</span>
            </div>
            <h3 class="text-base font-extrabold text-gray-900">${st.city}</h3>
            <p class="text-xs text-gray-600 font-medium">${st.address}</p>
            <p class="text-[11px] text-gray-500">${st.hours}</p>
            <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span class="font-bold text-gray-800">${st.phone}</span>
              <a href="https://wa.me/${cmsData.whatsappNumber}?text=Hola%20RedCover%2C%20quiero%20visitar%20la%20tienda%20de%20${encodeURIComponent(st.city)}" target="_blank" class="text-primary font-bold hover:underline flex items-center gap-0.5">
                Agendar <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        `).join('');
      }
    }

    // ==========================================
    // FUNCIONES DE APERTURA, CONTRASEÑA Y EDICIÓN DEL PANEL ADMIN
    // ==========================================
    function openAdminPanel(initialTab = null) {
      closeMegaMenu();
      if (!adminAuthenticated) {
        pendingAdminTabAfterAuth = initialTab;
        const loginModal = document.getElementById('admin-login-modal');
        const passInput = document.getElementById('admin-password-input');
        const errEl = document.getElementById('admin-login-error');
        if (errEl) errEl.classList.add('hidden');
        if (passInput) passInput.value = '';
        if (loginModal) {
          loginModal.classList.remove('hidden');
          loginModal.classList.add('flex');
          setTimeout(() => { if (passInput) passInput.focus(); }, 80);
        }
        return;
      }

      launchAuthenticatedAdminPanel(initialTab);
    }

    function launchAuthenticatedAdminPanel(initialTab = null) {
      adminModeActive = true;
      const floatBar = document.getElementById('admin-floating-bar');
      if (floatBar) {
        floatBar.classList.remove('hidden');
        floatBar.classList.add('flex');
      }
      renderAllCMSContent();

      if (initialTab) currentAdminTab = initialTab;
      switchAdminTab(currentAdminTab);

      const modal = document.getElementById('admin-cms-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function submitAdminPassword(event) {
      if (event) event.preventDefault();
      const passInput = document.getElementById('admin-password-input');
      const errEl = document.getElementById('admin-login-error');
      const entered = passInput ? passInput.value.trim() : '';

      if (entered === ADMIN_MASTER_PASSWORD) {
        adminAuthenticated = true;
        currentAdminPassword = entered;
        localStorage.setItem('redcover_admin_pass', entered);
        closeAdminLoginModal();
        showToast('Acceso Administrador Autorizado');
        launchAuthenticatedAdminPanel(pendingAdminTabAfterAuth);
        pendingAdminTabAfterAuth = null;
      } else {
        if (errEl) errEl.classList.remove('hidden');
        if (passInput) {
          passInput.value = '';
          passInput.focus();
        }
      }
    }

    function closeAdminLoginModal() {
      const loginModal = document.getElementById('admin-login-modal');
      if (loginModal) {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
      }
    }

    function toggleAdminPassVisibility() {
      const passInput = document.getElementById('admin-password-input');
      const icon = document.getElementById('admin-pass-eye');
      if (!passInput) return;
      if (passInput.type === 'password') {
        passInput.type = 'text';
        if (icon) icon.innerText = 'visibility_off';
      } else {
        passInput.type = 'password';
        if (icon) icon.innerText = 'visibility';
      }
    }

    function closeAdminPanel() {
      const modal = document.getElementById('admin-cms-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    function enableLiveEditOverlays() {
      adminModeActive = true;
      closeAdminPanel();
      renderAllCMSContent();
      showToast('Modo Edición en Vivo activado: Haz clic en "Editar" sobre cualquier producto o sección.');
    }

    function exitAdminMode() {
      adminModeActive = false;
      adminAuthenticated = false;
      if (inlineTextEditingEnabled) toggleInlineTextEditing();
      const floatBar = document.getElementById('admin-floating-bar');
      if (floatBar) {
        floatBar.classList.add('hidden');
        floatBar.classList.remove('flex');
      }
      closeAdminPanel();
      renderAllCMSContent();
      showToast('Sesión de Administrador cerrada');
    }

    function toggleInlineTextEditing() {
      inlineTextEditingEnabled = !inlineTextEditingEnabled;
      const statusEl = document.getElementById('inline-edit-status');
      const editableNodes = document.querySelectorAll('h1, h2, h3, p, span');
      editableNodes.forEach(node => {
        if (!node.closest('#admin-cms-modal') && !node.closest('#admin-floating-bar')) {
          node.contentEditable = inlineTextEditingEnabled ? 'true' : 'false';
          if (inlineTextEditingEnabled) {
            node.classList.add('hover:outline-dashed', 'hover:outline-1', 'hover:outline-red-400', ' rounded');
          } else {
            node.classList.remove('hover:outline-dashed', 'hover:outline-1', 'hover:outline-red-400');
          }
        }
      });
      if (statusEl) {
        statusEl.innerText = inlineTextEditingEnabled ? 'Edición Textos: ON (Clic en cualquier texto)' : 'Edición Textos: OFF';
      }
      showToast(inlineTextEditingEnabled ? 'Ahora puedes hacer clic sobre cualquier texto de la página para escribir directamente' : 'Edición directa de textos desactivada');
    }

    function openAdminEditDevice(index) {
      selectedAdminDeviceIndex = index;
      openAdminPanel('devices');
    }

    function openAdminEditOffer(index) {
      selectedAdminOfferIndex = index;
      openAdminPanel('offers');
    }

    function openAdminEditAccessory(index) {
      selectedAdminAccessoryIndex = index;
      openAdminPanel('accessories');
    }

    function openAdminTabTo(tab) {
      openAdminPanel(tab);
    }

    // Compresor Automático de Imágenes Canvas para Administrador (Evita desborde de localStorage)
    function compressImageFile(file, maxWidth = 800, quality = 0.70, callback) {
      if (!file.type || !file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => callback(e.target.result);
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Exportar en JPEG optimizado ultra ligero (~25KB-45KB)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          callback(compressedDataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Subida genérica de imágenes desde la PC con auto-compresión y autoguardado automático
    function handleAdminImageUpload(fileInput, targetInputId, previewImgId) {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;

      showToast('Optimizando y cargando imagen...');
      compressImageFile(file, 750, 0.68, function(dataUrl) {
        const urlInput = document.getElementById(targetInputId);
        const previewImg = document.getElementById(previewImgId);
        if (urlInput) urlInput.value = dataUrl;
        if (previewImg) previewImg.src = dataUrl;

        // Auto-guardado instantáneo según el contexto
        if (targetInputId.startsWith('adm-bento-img-')) {
          const bentoIdx = parseInt(targetInputId.replace('adm-bento-img-', ''), 10);
          if (!isNaN(bentoIdx) && cmsData.bentoCards && cmsData.bentoCards[bentoIdx]) {
            cmsData.bentoCards[bentoIdx].img = dataUrl;
            saveCMSState();
            if (typeof renderCMSHeroAndTopbar === 'function') renderCMSHeroAndTopbar();
            showToast(`✅ Imagen de Tarjeta Bento #${bentoIdx + 1} guardada y actualizada`);
            return;
          }
        } else if (targetInputId === 'adm-off-img') {
          if (cmsData.offers && cmsData.offers[selectedAdminOfferIndex]) {
            cmsData.offers[selectedAdminOfferIndex].img = dataUrl;
            saveCMSState();
            if (typeof renderCMSOffers === 'function') renderCMSOffers();
            showToast('✅ Imagen de Oferta guardada y actualizada');
            return;
          }
        } else if (targetInputId === 'adm-dev-img') {
          if (allCatalogDevices && allCatalogDevices[selectedAdminDeviceIndex]) {
            allCatalogDevices[selectedAdminDeviceIndex].img = dataUrl;
            saveCMSState();
            if (typeof renderDevicesCatalog === 'function') renderDevicesCatalog(currentCatalogCategoryFilter);
            showToast('✅ Imagen de Producto guardada y actualizada');
            return;
          }
        } else if (targetInputId === 'adm-acc-img') {
          if (cmsData.accessories && cmsData.accessories[selectedAdminAccessoryIndex]) {
            cmsData.accessories[selectedAdminAccessoryIndex].img = dataUrl;
            saveCMSState();
            if (typeof renderCMSAccessories === 'function') renderCMSAccessories(currentAccCategoryFilter);
            showToast('✅ Imagen de Accesorio guardada y actualizada');
            return;
          }
        } else if (targetInputId === 'adm-i16-img') {
          const targetId = document.getElementById('adm-i16-target-device')?.value || 'iphone-16-pro';
          const targetDev = allCatalogDevices.find(d => d.id === targetId);
          if (targetDev) {
            targetDev.img = dataUrl;
            saveCMSState();
            showToast('✅ Imagen de iPhone 16 Pro guardada');
            return;
          }
        }

        showToast('✅ Imagen lista y optimizada.');
      });
    }

    async function handleAdminHeroMediaUpload(fileInput, slideIdx) {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;

      const isVideoFile = (file.type && file.type.startsWith('video/')) || /\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/i.test(file.name);
      const typeSelect = document.getElementById(`adm-slide-type-${slideIdx}`);
      if (typeSelect) {
        typeSelect.value = isVideoFile ? 'video' : 'image';
      }

      const applyMediaToSlide = (finalUrl, mediaType) => {
        const urlInput = document.getElementById(`adm-slide-url-${slideIdx}`);
        if (urlInput) urlInput.value = finalUrl;
        if (cmsData.heroSlides && cmsData.heroSlides[slideIdx]) {
          cmsData.heroSlides[slideIdx].mediaType = mediaType;
          cmsData.heroSlides[slideIdx].mediaUrl = finalUrl;
          currentHeroSlideIndex = slideIdx;
          saveCMSState();
          if (typeof renderHeroBannerCarousel === 'function') renderHeroBannerCarousel();
        }
      };

      if (isVideoFile) {
        showToast('⏳ Subiendo video al servidor (assets/videos/)...');
        try {
          const formData = new FormData();
          formData.append('video', file);
          formData.append('password', currentAdminPassword || ADMIN_MASTER_PASSWORD);

          const res = await fetch('/api/upload-video', {
            method: 'POST',
            headers: {
              'x-admin-password': currentAdminPassword || ADMIN_MASTER_PASSWORD
            },
            body: formData
          });

          if (res.ok) {
            const data = await res.json();
            applyMediaToSlide(data.url, 'video');
            showToast(`🎬 Video (${data.sizeMB} MB) guardado permanentemente en el servidor`);
            return;
          } else {
            const errJson = await res.json().catch(() => ({}));
            showToast('⚠️ Error subiendo video: ' + (errJson.error || res.statusText || 'Servidor respondió con error'));
          }
        } catch (err) {
          console.error('Error al subir video:', err);
          showToast('⚠️ Error de conexión: ' + (err.message || 'Servidor no respondió'));
        }
      } else {
        showToast('🚀 Optimizando imagen de banner a WebP...');
        try {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('password', currentAdminPassword || ADMIN_MASTER_PASSWORD);

          const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
              'x-admin-password': currentAdminPassword || ADMIN_MASTER_PASSWORD
            },
            body: formData
          });

          if (res.ok) {
            const data = await res.json();
            applyMediaToSlide(data.url, 'image');
            showToast(`✨ Imagen WebP (${data.sizeKB} KB) guardada en el banner`);
            return;
          }
        } catch (err) {
          console.warn('Fallback a compresión local:', err);
        }

        // Fallback en cliente si no hay servidor
        compressImageFile(file, 920, 0.68, function(dataUrl) {
          applyMediaToSlide(dataUrl, 'image');
          showToast(`✅ Imagen de Banner #${slideIdx + 1} guardada`);
        });
      }
    }

    function switchAdminTab(tab) {
      currentAdminTab = tab;
      document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-admin-tab') === tab) {
          btn.className = "admin-tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-sm flex items-center gap-1.5 whitespace-nowrap";
        } else {
          btn.className = "admin-tab-btn px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:border-primary flex items-center gap-1.5 whitespace-nowrap";
        }
      });

      const container = document.getElementById('admin-tab-content');
      if (!container) return;

      if (tab === 'devices') renderAdminDevicesTab(container);
      else if (tab === 'offers') renderAdminOffersTab(container);
      else if (tab === 'accessories') renderAdminAccessoriesTab(container);
      else if (tab === 'categories') renderAdminCategoriesTab(container);
      else if (tab === 'hero') renderAdminHeroTab(container);
      else if (tab === 'canje') renderAdminCanjeTab(container);
      else if (tab === 'iphone16pro') renderAdminIphone16ProTab(container);
    }

    // ==========================================
    // TAB 1: GESTIÓN DE PRODUCTOS (CATÁLOGO PRINCIPAL)
    // ==========================================
    function renderAdminDevicesTab(container) {
      if (selectedAdminDeviceIndex >= allCatalogDevices.length) selectedAdminDeviceIndex = 0;
      const dev = allCatalogDevices[selectedAdminDeviceIndex] || allCatalogDevices[0];

      const filteredList = allCatalogDevices.map((d, idx) => ({ ...d, idx })).filter(item => {
        const matchesCat = adminDeviceCategoryFilter === 'all' || item.category === adminDeviceCategoryFilter;
        const matchesQ = adminDeviceSearchQuery.trim() === '' ||
          item.title.toLowerCase().includes(adminDeviceSearchQuery.toLowerCase()) ||
          item.badge.toLowerCase().includes(adminDeviceSearchQuery.toLowerCase());
        return matchesCat && matchesQ;
      });

      container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Columna Izquierda: Lista de Productos -->
          <div class="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-4 flex flex-col h-[68vh]">
            <div class="flex items-center justify-between gap-2 mb-3">
              <h4 class="text-sm font-extrabold text-gray-900">Catálogo de Productos (${filteredList.length})</h4>
              <button type="button" onclick="createNewAdminDevice()" class="px-3 py-1.5 rounded-xl crimson-btn text-white text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">add</span> Nuevo Producto
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <input type="text" placeholder="Buscar producto..." value="${adminDeviceSearchQuery}" oninput="adminDeviceSearchQuery=this.value; renderAdminDevicesTab(document.getElementById('admin-tab-content'))" class="px-3 py-2 rounded-xl border border-gray-300 text-xs">
              <select onchange="adminDeviceCategoryFilter=this.value; renderAdminDevicesTab(document.getElementById('admin-tab-content'))" class="px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold bg-white">
                <option value="all" ${adminDeviceCategoryFilter === 'all' ? 'selected' : ''}>Todas las Categorías</option>
                ${cmsData.deviceCategories.map(c => `<option value="${c.id}" ${adminDeviceCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>

            <div class="flex-1 overflow-y-auto space-y-2 pr-1">
              ${filteredList.map(item => `
                <div onclick="selectedAdminDeviceIndex=${item.idx}; renderAdminDevicesTab(document.getElementById('admin-tab-content'))" class="p-2.5 rounded-xl border ${item.idx === selectedAdminDeviceIndex ? 'border-primary bg-red-50/60 ring-1 ring-primary' : 'border-gray-200 hover:bg-gray-50'} flex items-center justify-between gap-2.5 cursor-pointer transition-all">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <img src="${item.img}" class="w-11 h-11 rounded-lg object-cover bg-zinc-900 shrink-0">
                    <div class="min-w-0">
                      <span class="text-[10px] font-bold uppercase text-primary block">${item.category.toUpperCase()} • ${item.badge}</span>
                      <h5 class="text-xs font-bold text-gray-900 truncate">${item.title}</h5>
                      <p class="text-[11px] font-extrabold text-gray-600">${formatCOP(item.price)}</p>
                    </div>
                  </div>
                  <span class="material-symbols-outlined text-gray-400 text-base">chevron_right</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Columna Derecha: Formulario de Edición Completa -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-5 overflow-y-auto h-[68vh]">
            ${dev ? `
              <div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-200">
                <div>
                  <span class="text-[10px] font-bold uppercase text-primary">Editando Producto #${selectedAdminDeviceIndex + 1}</span>
                  <h4 class="text-base font-extrabold text-gray-900">${dev.title}</h4>
                </div>
                <div class="flex items-center gap-2">
                  <button type="button" onclick="duplicateAdminDevice(${selectedAdminDeviceIndex})" class="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">content_copy</span> Duplicar
                  </button>
                  <button type="button" onclick="deleteAdminDevice(${selectedAdminDeviceIndex})" class="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors">
                    <span class="material-symbols-outlined text-sm">delete</span> Eliminar
                  </button>
                </div>
              </div>

              <div class="space-y-4 text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Nombre / Modelo del Producto *</label>
                    <input id="adm-dev-title" type="text" value="${dev.title.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-semibold">
                  </div>
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Categoría *</label>
                    <select id="adm-dev-category" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-semibold bg-white">
                      ${cmsData.deviceCategories.map(c => `<option value="${c.id}" ${dev.category === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Precio Contado (COP) *</label>
                    <input id="adm-dev-price" type="number" step="1000" value="${dev.price}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-primary">
                  </div>
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Etiqueta Superior (Badge)</label>
                    <input id="adm-dev-badge" type="text" value="${dev.badge.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                  </div>
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Estado de Stock</label>
                    <input id="adm-dev-stock" type="text" value="${(dev.stockStatus || '● En Stock').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-emerald-700 font-bold">
                  </div>
                </div>

                <!-- Imagen con Vista Previa y Subida de Archivo -->
                <div class="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
                  <img id="adm-dev-img-preview" src="${dev.img}" class="w-24 h-24 rounded-xl object-cover bg-zinc-950 shrink-0 border border-gray-300">
                  <div class="flex-1 w-full space-y-2">
                    <label class="block font-bold text-gray-700">Imagen del Producto (URL o Subir desde tu PC)</label>
                    <input id="adm-dev-img" type="text" value="${dev.img}" oninput="document.getElementById('adm-dev-img-preview').src=this.value" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-[11px]" placeholder="https://...">
                    <div class="flex flex-wrap items-center gap-2">
                      <label class="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-primary text-white text-[11px] font-bold cursor-pointer inline-flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">upload_file</span> Subir Foto desde PC
                        <input type="file" accept="image/*" class="hidden" onchange="handleAdminImageUpload(this, 'adm-dev-img', 'adm-dev-img-preview')">
                      </label>
                      <button type="button" onclick="document.getElementById('adm-dev-img').value=IMG_IPHONE_PRO; document.getElementById('adm-dev-img-preview').src=IMG_IPHONE_PRO;" class="px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-[10px] font-semibold">Usar Foto iPhone Pro</button>
                      <button type="button" onclick="document.getElementById('adm-dev-img').value=IMG_MACBOOK; document.getElementById('adm-dev-img-preview').src=IMG_MACBOOK;" class="px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-[10px] font-semibold">Usar Foto Mac</button>
                      <button type="button" onclick="document.getElementById('adm-dev-img').value=IMG_IPAD; document.getElementById('adm-dev-img-preview').src=IMG_IPAD;" class="px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-[10px] font-semibold">Usar Foto iPad</button>
                      <button type="button" onclick="document.getElementById('adm-dev-img').value=IMG_WATCH; document.getElementById('adm-dev-img-preview').src=IMG_WATCH;" class="px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-[10px] font-semibold">Usar Foto Watch</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block font-bold text-gray-700 mb-1">Descripción Corta</label>
                  <textarea id="adm-dev-desc" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-300">${dev.shortDesc}</textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Especificaciones (1 por línea)</label>
                    <textarea id="adm-dev-specs" rows="4" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono text-[11px]">${(dev.specs || []).join('\n')}</textarea>
                  </div>
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Versiones / Capacidades / Colores (1 por línea)</label>
                    <textarea id="adm-dev-variants" rows="4" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono text-[11px]">${(dev.variants || []).join('\n')}</textarea>
                  </div>
                </div>

                <div class="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                  <button type="button" onclick="saveAdminDeviceChanges(${selectedAdminDeviceIndex})" class="px-6 py-3 rounded-full crimson-btn text-white text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <span class="material-symbols-outlined text-base">save</span> Guardar Cambios del Producto
                  </button>
                </div>
              </div>
            ` : '<p class="text-xs text-gray-500">Selecciona o crea un producto.</p>'}
          </div>
        </div>
      `;
    }

    function saveAdminDeviceChanges(idx) {
      const dev = allCatalogDevices[idx];
      if (!dev) return;
      dev.title = document.getElementById('adm-dev-title').value.trim() || dev.title;
      dev.category = document.getElementById('adm-dev-category').value;
      dev.price = parseInt(document.getElementById('adm-dev-price').value, 10) || 0;
      dev.badge = document.getElementById('adm-dev-badge').value.trim() || 'Apple Oficial';
      dev.stockStatus = document.getElementById('adm-dev-stock').value.trim() || '● En Stock';
      dev.img = document.getElementById('adm-dev-img').value.trim() || IMG_IPHONE_PRO;
      dev.shortDesc = document.getElementById('adm-dev-desc').value.trim();
      dev.specs = document.getElementById('adm-dev-specs').value.split('\n').map(s => s.trim()).filter(Boolean);
      dev.variants = document.getElementById('adm-dev-variants').value.split('\n').map(s => s.trim()).filter(Boolean);

      saveCMSState();
      renderAllCMSContent();
      renderAdminDevicesTab(document.getElementById('admin-tab-content'));
      showToast(`¡Producto "${dev.title}" actualizado correctamente!`);
    }

    function createNewAdminDevice() {
      const newDev = {
        id: 'producto-' + Date.now(),
        category: adminDeviceCategoryFilter === 'all' ? 'iphone' : adminDeviceCategoryFilter,
        badge: 'Nuevo 2026',
        title: 'Nuevo Producto Apple 2026',
        price: 3999000,
        img: IMG_IPHONE_PRO,
        shortDesc: 'Descripción del nuevo producto oficial Apple con garantía de 1 año en Colombia.',
        specs: ['Chip de última generación Apple', 'Pantalla Retina XDR', 'Garantía Oficial 1 Año en Colombia'],
        variants: ['128GB - Negro Espacial - $3.999.000', '256GB - Plata - $4.499.000']
      };
      allCatalogDevices.unshift(newDev);
      selectedAdminDeviceIndex = 0;
      saveCMSState();
      renderAllCMSContent();
      renderAdminDevicesTab(document.getElementById('admin-tab-content'));
      showToast('Nuevo producto creado. Edita sus campos y guarda.');
    }

    function duplicateAdminDevice(idx) {
      const orig = allCatalogDevices[idx];
      if (!orig) return;
      const copy = JSON.parse(JSON.stringify(orig));
      copy.id = orig.id + '-copy-' + Date.now();
      copy.title = orig.title + ' (Copia)';
      allCatalogDevices.splice(idx + 1, 0, copy);
      selectedAdminDeviceIndex = idx + 1;
      saveCMSState();
      renderAllCMSContent();
      renderAdminDevicesTab(document.getElementById('admin-tab-content'));
      showToast('Producto duplicado correctamente');
    }

    function deleteAdminDevice(idx) {
      if (allCatalogDevices.length <= 1) {
        showToast('Debe existir al menos 1 producto en el catálogo');
        return;
      }
      const removed = allCatalogDevices.splice(idx, 1)[0];
      selectedAdminDeviceIndex = Math.max(0, idx - 1);
      saveCMSState();
      renderAllCMSContent();
      renderAdminDevicesTab(document.getElementById('admin-tab-content'));
      showToast(`Producto "${removed.title}" eliminado`);
    }

    // ==========================================
    // TAB 2: GESTIÓN DE OFERTAS Y COMBOS
    // ==========================================
    function renderAdminOffersTab(container) {
      if (selectedAdminOfferIndex >= cmsData.offers.length) selectedAdminOfferIndex = 0;
      const off = cmsData.offers[selectedAdminOfferIndex];
      const oh = cmsData.offersHeader;

      container.innerHTML = `
        <div class="space-y-6">
          <!-- Encabezado de la Sección de Ofertas -->
          <div class="bg-white rounded-2xl border border-gray-200 p-4">
            <h4 class="text-xs font-extrabold uppercase text-primary mb-3">Textos del Encabezado de la Sección Ofertas</h4>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label class="font-bold text-gray-700 block mb-1">Badge Superior</label>
                <input id="adm-oh-badge" type="text" value="${oh.badge.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
              </div>
              <div>
                <label class="font-bold text-gray-700 block mb-1">Título de Sección</label>
                <input id="adm-oh-title" type="text" value="${oh.title.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold">
              </div>
              <div>
                <label class="font-bold text-gray-700 block mb-1">Subtítulo</label>
                <input id="adm-oh-sub" type="text" value="${oh.subtitle.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
              </div>
              <div class="flex items-end gap-2">
                <div class="flex-1">
                  <label class="font-bold text-gray-700 block mb-1">Alerta de Stock</label>
                  <input id="adm-oh-stock" type="text" value="${oh.stockAlert.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                </div>
                <button type="button" onclick="saveAdminOffersHeader()" class="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-primary text-white text-xs font-bold">Guardar</button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Lista de Ofertas -->
            <div class="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-extrabold text-gray-900">Ofertas Activas (${cmsData.offers.length})</h4>
                <button type="button" onclick="createNewAdminOffer()" class="px-3 py-1.5 rounded-xl crimson-btn text-white text-xs font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">add</span> Nueva Oferta
                </button>
              </div>
              <div class="space-y-2 max-h-96 overflow-y-auto">
                ${cmsData.offers.map((item, idx) => `
                  <div onclick="selectedAdminOfferIndex=${idx}; renderAdminOffersTab(document.getElementById('admin-tab-content'))" class="p-3 rounded-xl border ${idx === selectedAdminOfferIndex ? 'border-primary bg-red-50/60' : 'border-gray-200 hover:bg-gray-50'} flex items-center gap-3 cursor-pointer">
                    <img src="${item.img}" class="w-12 h-12 rounded-lg object-cover bg-zinc-900 shrink-0">
                    <div class="min-w-0 flex-1">
                      <span class="text-[10px] font-extrabold text-white bg-red-600 px-2 py-0.5 rounded-full">${item.discountBadge}</span>
                      <h5 class="text-xs font-bold text-gray-900 truncate mt-1">${item.title}</h5>
                      <p class="text-xs font-extrabold text-primary">${formatCOP(item.price)} <span class="text-gray-400 line-through font-normal text-[10px]">${formatCOP(item.oldPrice)}</span></p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Editor de la Oferta Seleccionada -->
            <div class="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-5">
              ${off ? `
                <div class="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
                  <h4 class="text-sm font-extrabold text-gray-900">Editar Oferta #${selectedAdminOfferIndex + 1}</h4>
                  <button type="button" onclick="deleteAdminOffer(${selectedAdminOfferIndex})" class="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">delete</span> Eliminar Oferta
                  </button>
                </div>

                <div class="space-y-3 text-xs">
                  <div>
                    <label class="font-bold text-gray-700 block mb-1">Título del Combo / Oferta *</label>
                    <input id="adm-off-title" type="text" value="${off.title.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold">
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label class="font-bold text-gray-700 block mb-1">Badge Descuento (ej. -20% OFF)</label>
                      <input id="adm-off-badge" type="text" value="${off.discountBadge.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-red-600">
                    </div>
                    <div>
                      <label class="font-bold text-gray-700 block mb-1">Etiqueta Superior</label>
                      <input id="adm-off-tag" type="text" value="${off.topTag.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                    </div>
                    <div>
                      <label class="font-bold text-gray-700 block mb-1">Texto Unidades Restantes</label>
                      <input id="adm-off-stock" type="text" value="${off.stockLeftText.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label class="font-bold text-gray-700 block mb-1">Precio Oferta (COP) *</label>
                      <input id="adm-off-price" type="number" step="1000" value="${off.price}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-extrabold text-primary">
                    </div>
                    <div>
                      <label class="font-bold text-gray-700 block mb-1">Precio Anterior Tachado (COP)</label>
                      <input id="adm-off-oldprice" type="number" step="1000" value="${off.oldPrice}" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-500">
                    </div>
                    <div>
                      <label class="font-bold text-gray-700 block mb-1">% Barra de Demanda (1-100)</label>
                      <input id="adm-off-prog" type="number" min="5" max="100" value="${off.progressPercent || 80}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                    </div>
                  </div>

                  <div class="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                    <img id="adm-off-img-prev" src="${off.img}" class="w-20 h-20 rounded-xl object-cover bg-zinc-900 shrink-0">
                    <div class="flex-1 space-y-1.5">
                      <label class="font-bold text-gray-700 block">Imagen de la Oferta (URL o Subir de tu PC)</label>
                      <input id="adm-off-img" type="text" value="${off.img}" oninput="document.getElementById('adm-off-img-prev').src=this.value" class="w-full px-3 py-1.5 rounded-xl border border-gray-300 bg-white">
                      <label class="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-primary text-white text-[11px] font-bold cursor-pointer inline-flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">upload_file</span> Subir Imagen desde PC
                        <input type="file" accept="image/*" class="hidden" onchange="handleAdminImageUpload(this, 'adm-off-img', 'adm-off-img-prev')">
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="font-bold text-gray-700 block mb-1">Descripción de la Oferta</label>
                    <textarea id="adm-off-desc" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-300">${off.desc}</textarea>
                  </div>

                  <div class="pt-2 flex justify-end">
                    <button type="button" onclick="saveAdminOfferItem(${selectedAdminOfferIndex})" class="px-6 py-2.5 rounded-full crimson-btn text-white text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-base">save</span> Guardar Oferta
                    </button>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }

    function saveAdminOffersHeader() {
      cmsData.offersHeader.badge = document.getElementById('adm-oh-badge').value;
      cmsData.offersHeader.title = document.getElementById('adm-oh-title').value;
      cmsData.offersHeader.subtitle = document.getElementById('adm-oh-sub').value;
      cmsData.offersHeader.stockAlert = document.getElementById('adm-oh-stock').value;
      saveCMSState();
      renderCMSOffers();
      showToast('Encabezado de ofertas actualizado');
    }

    function saveAdminOfferItem(idx) {
      const off = cmsData.offers[idx];
      if (!off) return;
      off.title = document.getElementById('adm-off-title').value;
      off.discountBadge = document.getElementById('adm-off-badge').value;
      off.topTag = document.getElementById('adm-off-tag').value;
      off.stockLeftText = document.getElementById('adm-off-stock').value;
      off.price = parseInt(document.getElementById('adm-off-price').value, 10) || 0;
      off.oldPrice = parseInt(document.getElementById('adm-off-oldprice').value, 10) || 0;
      off.progressPercent = parseInt(document.getElementById('adm-off-prog').value, 10) || 80;
      off.img = document.getElementById('adm-off-img').value;
      off.desc = document.getElementById('adm-off-desc').value;
      saveCMSState();
      renderCMSOffers();
      renderAdminOffersTab(document.getElementById('admin-tab-content'));
      showToast('¡Oferta guardada y actualizada en la tienda!');
    }

    function createNewAdminOffer() {
      cmsData.offers.unshift({
        id: 'offer-' + Date.now(),
        discountBadge: '-20% OFF',
        topTag: 'Nueva Promoción Especial',
        title: 'Nuevo Combo Apple en Oferta',
        desc: 'Descripción de la promoción especial con envío asegurado gratis.',
        price: 2999000,
        oldPrice: 3699000,
        progressPercent: 85,
        stockLeftText: 'Quedan 5 unidades',
        img: IMG_IPHONE_PRO
      });
      selectedAdminOfferIndex = 0;
      saveCMSState();
      renderAllCMSContent();
      renderAdminOffersTab(document.getElementById('admin-tab-content'));
      showToast('Nueva oferta creada');
    }

    function deleteAdminOffer(idx) {
      if (cmsData.offers.length <= 1) {
        showToast('Debe haber al menos 1 oferta activa');
        return;
      }
      cmsData.offers.splice(idx, 1);
      selectedAdminOfferIndex = Math.max(0, idx - 1);
      saveCMSState();
      renderAllCMSContent();
      renderAdminOffersTab(document.getElementById('admin-tab-content'));
      showToast('Oferta eliminada');
    }

    // ==========================================
    // TAB 3: GESTIÓN DE ACCESORIOS
    // ==========================================
    function renderAdminAccessoriesTab(container) {
      if (selectedAdminAccessoryIndex >= cmsData.accessories.length) selectedAdminAccessoryIndex = 0;
      const acc = cmsData.accessories[selectedAdminAccessoryIndex];

      container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-4 flex flex-col h-[65vh]">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-extrabold text-gray-900">Accesorios (${cmsData.accessories.length})</h4>
              <button type="button" onclick="createNewAdminAccessory()" class="px-3 py-1.5 rounded-xl crimson-btn text-white text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">add</span> Nuevo Accesorio
              </button>
            </div>
            <div class="flex-1 overflow-y-auto space-y-2 pr-1">
              ${cmsData.accessories.map((item, idx) => `
                <div onclick="selectedAdminAccessoryIndex=${idx}; renderAdminAccessoriesTab(document.getElementById('admin-tab-content'))" class="p-2.5 rounded-xl border ${idx === selectedAdminAccessoryIndex ? 'border-primary bg-red-50/60' : 'border-gray-200 hover:bg-gray-50'} flex items-center gap-3 cursor-pointer">
                  <img src="${item.img}" class="w-11 h-11 rounded-lg object-cover bg-zinc-900 shrink-0">
                  <div class="min-w-0 flex-1">
                    <span class="text-[10px] font-bold uppercase text-primary">${item.category} • ${item.badge}</span>
                    <h5 class="text-xs font-bold text-gray-900 truncate">${item.title}</h5>
                    <p class="text-xs font-extrabold text-gray-700">${formatCOP(item.price)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-5">
            ${acc ? `
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
                <h4 class="text-sm font-extrabold text-gray-900">Editar Accesorio #${selectedAdminAccessoryIndex + 1}</h4>
                <button type="button" onclick="deleteAdminAccessory(${selectedAdminAccessoryIndex})" class="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">delete</span> Eliminar Accesorio
                </button>
              </div>
              <div class="space-y-4 text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="font-bold text-gray-700 block mb-1">Nombre del Accesorio *</label>
                    <input id="adm-acc-title" type="text" value="${acc.title.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold">
                  </div>
                  <div>
                    <label class="font-bold text-gray-700 block mb-1">Categoría de Accesorio *</label>
                    <select id="adm-acc-cat" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-semibold bg-white">
                      ${cmsData.accessoryCategories.map(c => `<option value="${c.id}" ${acc.category === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="font-bold text-gray-700 block mb-1">Precio (COP) *</label>
                    <input id="adm-acc-price" type="number" step="1000" value="${acc.price}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-extrabold text-primary">
                  </div>
                  <div>
                    <label class="font-bold text-gray-700 block mb-1">Etiqueta Superior (Badge)</label>
                    <input id="adm-acc-badge" type="text" value="${acc.badge.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                  </div>
                </div>

                <div class="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                  <img id="adm-acc-img-prev" src="${acc.img}" class="w-20 h-20 rounded-xl object-cover bg-zinc-900 shrink-0">
                  <div class="flex-1 space-y-1.5">
                    <label class="font-bold text-gray-700 block">Imagen del Accesorio (URL o Subir desde PC)</label>
                    <input id="adm-acc-img" type="text" value="${acc.img}" oninput="document.getElementById('adm-acc-img-prev').src=this.value" class="w-full px-3 py-1.5 rounded-xl border border-gray-300 bg-white">
                    <label class="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-primary text-white text-[11px] font-bold cursor-pointer inline-flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">upload_file</span> Subir Foto desde PC
                      <input type="file" accept="image/*" class="hidden" onchange="handleAdminImageUpload(this, 'adm-acc-img', 'adm-acc-img-prev')">
                    </label>
                  </div>
                </div>

                <div>
                  <label class="font-bold text-gray-700 block mb-1">Descripción del Accesorio</label>
                  <textarea id="adm-acc-desc" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-300">${acc.desc}</textarea>
                </div>

                <div class="pt-2 flex justify-end">
                  <button type="button" onclick="saveAdminAccessoryItem(${selectedAdminAccessoryIndex})" class="px-6 py-2.5 rounded-full crimson-btn text-white text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">save</span> Guardar Accesorio
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    function saveAdminAccessoryItem(idx) {
      const acc = cmsData.accessories[idx];
      if (!acc) return;
      acc.title = document.getElementById('adm-acc-title').value;
      acc.category = document.getElementById('adm-acc-cat').value;
      acc.price = parseInt(document.getElementById('adm-acc-price').value, 10) || 0;
      acc.badge = document.getElementById('adm-acc-badge').value;
      acc.img = document.getElementById('adm-acc-img').value;
      acc.desc = document.getElementById('adm-acc-desc').value;
      saveCMSState();
      renderCMSAccessories(currentAccCategoryFilter);
      renderAdminAccessoriesTab(document.getElementById('admin-tab-content'));
      showToast('¡Accesorio actualizado correctamente!');
    }

    function createNewAdminAccessory() {
      cmsData.accessories.unshift({
        id: 'acc-' + Date.now(),
        category: 'magsafe',
        badge: 'Nuevo Accesorio',
        badgeColor: 'bg-red-600/90',
        title: 'Nuevo Accesorio Oficial Apple',
        desc: 'Descripción del accesorio original con garantía.',
        price: 199000,
        img: IMG_AIRPODS
      });
      selectedAdminAccessoryIndex = 0;
      saveCMSState();
      renderCMSAccessories(currentAccCategoryFilter);
      renderAdminAccessoriesTab(document.getElementById('admin-tab-content'));
      showToast('Nuevo accesorio añadido');
    }

    function deleteAdminAccessory(idx) {
      if (cmsData.accessories.length <= 1) return;
      cmsData.accessories.splice(idx, 1);
      selectedAdminAccessoryIndex = Math.max(0, idx - 1);
      saveCMSState();
      renderCMSAccessories(currentAccCategoryFilter);
      renderAdminAccessoriesTab(document.getElementById('admin-tab-content'));
      showToast('Accesorio eliminado');
    }

    // ==========================================
    // TAB 4: GESTIÓN DE CATEGORÍAS
    // ==========================================
    function renderAdminCategoriesTab(container) {
      container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <!-- Categorías de Dispositivos -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-extrabold text-gray-900">Categorías Principales de Productos</h4>
                <p class="text-[11px] text-gray-500">Se muestran en las pestañas del catálogo y en la barra rápida superior.</p>
              </div>
              <button type="button" onclick="addDeviceCategory()" class="px-3 py-1.5 rounded-xl crimson-btn text-white font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">add</span> Añadir Categoría
              </button>
            </div>

            <div class="space-y-3">
              ${cmsData.deviceCategories.map((cat, idx) => `
                <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 uppercase">ID / Slug</label>
                      <input id="adm-dcat-id-${idx}" type="text" value="${cat.id}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-mono">
                    </div>
                    <div class="sm:col-span-2">
                      <label class="text-[10px] font-bold text-gray-500 uppercase">Nombre en Pestaña del Catálogo</label>
                      <input id="adm-dcat-name-${idx}" type="text" value="${cat.name.replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-bold">
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 uppercase">Nombre Corto</label>
                      <input id="adm-dcat-short-${idx}" type="text" value="${(cat.shortName || cat.name).replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white">
                    </div>
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 uppercase">Subtítulo Barra Rápida</label>
                      <input id="adm-dcat-sub-${idx}" type="text" value="${(cat.subtitle || '').replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white">
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button type="button" onclick="saveDeviceCategory(${idx})" class="flex-1 py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-primary text-white font-bold">Guardar</button>
                      <button type="button" onclick="deleteDeviceCategory(${idx})" class="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Categorías de Accesorios -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-extrabold text-gray-900">Categorías de Accesorios</h4>
                <p class="text-[11px] text-gray-500">Filtros interactivos en la sección de Accesorios Originales.</p>
              </div>
              <button type="button" onclick="addAccessoryCategory()" class="px-3 py-1.5 rounded-xl crimson-btn text-white font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">add</span> Añadir Filtro
              </button>
            </div>

            <div class="space-y-2.5">
              ${cmsData.accessoryCategories.map((cat, idx) => `
                <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2">
                  <input id="adm-acat-id-${idx}" type="text" value="${cat.id}" class="w-28 px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-mono" placeholder="slug">
                  <input id="adm-acat-name-${idx}" type="text" value="${cat.name.replace(/"/g, '&quot;')}" class="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-bold" placeholder="Nombre visible">
                  <button type="button" onclick="saveAccessoryCategory(${idx})" class="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-primary text-white font-bold">Guardar</button>
                  <button type="button" onclick="deleteAccessoryCategory(${idx})" class="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    function saveDeviceCategory(idx) {
      const cat = cmsData.deviceCategories[idx];
      if (!cat) return;
      cat.id = document.getElementById(`adm-dcat-id-${idx}`).value.trim().toLowerCase();
      cat.name = document.getElementById(`adm-dcat-name-${idx}`).value.trim();
      cat.shortName = document.getElementById(`adm-dcat-short-${idx}`).value.trim();
      cat.subtitle = document.getElementById(`adm-dcat-sub-${idx}`).value.trim();
      saveCMSState();
      renderAllCMSContent();
      showToast('Categoría actualizada');
    }

    function addDeviceCategory() {
      cmsData.deviceCategories.push({
        id: 'nueva-cat-' + (cmsData.deviceCategories.length + 1),
        name: 'Nueva Categoría Apple',
        shortName: 'Nueva Cat',
        subtitle: 'Explorar línea',
        icon: 'devices_other'
      });
      saveCMSState();
      renderAllCMSContent();
      renderAdminCategoriesTab(document.getElementById('admin-tab-content'));
    }

    function deleteDeviceCategory(idx) {
      if (cmsData.deviceCategories.length <= 1) return;
      cmsData.deviceCategories.splice(idx, 1);
      saveCMSState();
      renderAllCMSContent();
      renderAdminCategoriesTab(document.getElementById('admin-tab-content'));
    }

    function saveAccessoryCategory(idx) {
      const cat = cmsData.accessoryCategories[idx];
      if (!cat) return;
      cat.id = document.getElementById(`adm-acat-id-${idx}`).value.trim().toLowerCase();
      cat.name = document.getElementById(`adm-acat-name-${idx}`).value.trim();
      saveCMSState();
      renderAllCMSContent();
      showToast('Categoría de accesorio actualizada');
    }

    function addAccessoryCategory() {
      cmsData.accessoryCategories.push({
        id: 'acc-cat-' + (cmsData.accessoryCategories.length + 1),
        name: 'Nueva Categoría'
      });
      saveCMSState();
      renderAllCMSContent();
      renderAdminCategoriesTab(document.getElementById('admin-tab-content'));
    }

    function deleteAccessoryCategory(idx) {
      if (cmsData.accessoryCategories.length <= 1) return;
      cmsData.accessoryCategories.splice(idx, 1);
      saveCMSState();
      renderAllCMSContent();
      renderAdminCategoriesTab(document.getElementById('admin-tab-content'));
    }

    // ==========================================
    // TAB 5: PUBLICIDAD HERO (4 BANNERS MOVIBLES CON IMAGEN O VIDEO CORTO) & BENTO ECOSISTEMA
    // ==========================================
        let selectedAdminFlagshipKey = 'iphone-18-pro';

    function renderAdminHeroTab(container) {
      if (!Array.isArray(cmsData.heroSlides) || cmsData.heroSlides.length === 0) {
        cmsData.heroSlides = JSON.parse(JSON.stringify(defaultCMSData.heroSlides));
      }
      if (!cmsData.heroFlagships) {
        cmsData.heroFlagships = JSON.parse(JSON.stringify(defaultCMSData.heroFlagships));
      }

      const activeFlagship = cmsData.heroFlagships[selectedAdminFlagshipKey] || cmsData.heroFlagships['iphone-18-pro'];

      container.innerHTML = `
        <div class="space-y-6 text-xs">
          <!-- 1. SECCIÓN PRINCIPAL: 4 BANNERS PANORÁMICOS DEL CARRUSEL (PRIMERO COMO EN LA PÁGINA) -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] tracking-wide uppercase">Elemento #1 en Web</span>
                  <h4 class="text-sm font-extrabold text-gray-900">Banners Principales Panorámicos (Carrusel Superior)</h4>
                </div>
                <p class="text-[11px] text-gray-500 mt-0.5">Es el primer elemento visual gigante que ven los clientes al entrar a la tienda. Puedes subir imágenes o videos cortos (.mp4).</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-red-50 text-primary border border-red-200 font-extrabold text-[11px] w-fit">${cmsData.heroSlides.length} Banners Activos</span>
                <button type="button" onclick="addAdminHeroSlide()" class="px-3.5 py-1.5 rounded-xl crimson-btn text-white font-extrabold text-xs shadow-sm flex items-center gap-1 hover:scale-105 transition-all">
                  <span class="material-symbols-outlined text-sm">add_circle</span> + Agregar Nuevo Banner
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${cmsData.heroSlides.map((sl, idx) => `
                <div class="p-4 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3 relative group">
                  <div class="flex items-center justify-between border-b border-gray-200/70 pb-2">
                    <span class="font-extrabold text-primary uppercase flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm">view_carousel</span> Banner #${idx + 1}
                    </span>
                    <div class="flex items-center gap-1.5 flex-wrap justify-end">
                      <button type="button" onclick="goToHeroSlide(${idx}); showToast('Previsualizando Banner #${idx + 1} en la web')" class="px-2.5 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-[10px]" title="Ver en carrusel">Previsualizar</button>
                      <button type="button" onclick="saveAdminHeroSlide(${idx})" class="px-3 py-1 rounded-lg crimson-btn text-white font-bold text-[11px] shadow-xs">Guardar</button>
                      ${cmsData.heroSlides.length > 1 ? `
                        <button type="button" onclick="deleteAdminHeroSlide(${idx})" class="px-2 py-1 rounded-lg bg-red-100 hover:bg-red-600 hover:text-white text-red-700 font-bold text-[10px] transition-colors" title="Eliminar este banner">
                          <span class="material-symbols-outlined text-xs">delete</span>
                        </button>
                      ` : ''}
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 block">Tipo Multimedia</label>
                      <select id="adm-slide-type-${idx}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-bold">
                        <option value="image" ${sl.mediaType !== 'video' ? 'selected' : ''}>🖼️ Imagen / Foto</option>
                        <option value="video" ${sl.mediaType === 'video' ? 'selected' : ''}>🎬 Video Corto (MP4/WebM)</option>
                      </select>
                    </div>
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 block">Etiqueta Superior Roja</label>
                      <input id="adm-slide-badge-${idx}" type="text" value="${(sl.badge || '').replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-semibold">
                    </div>
                  </div>

                  <div>
                    <label class="text-[10px] font-bold text-gray-500 block">Título Principal del Banner</label>
                    <input id="adm-slide-title-${idx}" type="text" value="${(sl.title || '').replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-extrabold text-sm">
                  </div>

                  <div>
                    <label class="text-[10px] font-bold text-gray-500 block">Subtítulo / Oferta / Condiciones</label>
                    <input id="adm-slide-sub-${idx}" type="text" value="${(sl.subtitle || '').replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white">
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 block">Texto Botón 1 (Detalle)</label>
                      <input id="adm-slide-btn1-${idx}" type="text" value="${(sl.btn1Text || '').replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-bold">
                    </div>
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 block">Categoría Destino Botón 2</label>
                      <select id="adm-slide-cat-${idx}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-semibold">
                        ${cmsData.deviceCategories.map(c => `<option value="${c.id}" ${sl.categoryTarget === c.id ? 'selected' : ''}>${c.shortName || c.name}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div class="space-y-1 pt-1">
                    <label class="text-[10px] font-bold text-gray-600 block">Archivo Multimedia (Convierte automáticamente a WebP si es foto)</label>
                    <div class="flex items-center gap-2">
                      <input id="adm-slide-url-${idx}" type="text" value="${sl.mediaUrl || ''}" placeholder="assets/img/... o URL" class="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white">
                      <label class="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-primary text-white cursor-pointer font-bold shrink-0 flex items-center gap-1 shadow-xs">
                        <span class="material-symbols-outlined text-xs">upload_file</span> Subir
                        <input type="file" accept="image/*,video/mp4,video/webm" class="hidden" onchange="handleAdminHeroMediaUpload(this, ${idx})">
                      </label>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 2. SECCIÓN HERO FLAGSHIP BLANCO: SELECTOR INTERACTIVO IPHONE 18 PRO, PRO MAX Y DUO -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-zinc-900 text-white font-black text-[10px] tracking-wide uppercase">Elemento #2 en Web</span>
                  <h4 class="text-sm font-extrabold text-gray-900">Apartado Hero: Buques Insignia (Fondo Blanco)</h4>
                </div>
                <p class="text-[11px] text-gray-500 mt-0.5">Controla los textos del bloque central interactivo con selector de modelos y acabados en titanio.</p>
              </div>

              <!-- Selector de modelo a configurar en el admin -->
              <div class="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button type="button" onclick="selectedAdminFlagshipKey='iphone-18-pro'; renderAdminHeroTab(document.getElementById('admin-tab-content'))" class="px-3 py-1.5 rounded-lg font-bold text-xs ${selectedAdminFlagshipKey === 'iphone-18-pro' ? 'bg-primary text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}">
                  iPhone 18 Pro
                </button>
                <button type="button" onclick="selectedAdminFlagshipKey='iphone-18-pro-max'; renderAdminHeroTab(document.getElementById('admin-tab-content'))" class="px-3 py-1.5 rounded-lg font-bold text-xs ${selectedAdminFlagshipKey === 'iphone-18-pro-max' ? 'bg-primary text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}">
                  18 Pro Max
                </button>
                <button type="button" onclick="selectedAdminFlagshipKey='iphone-duo-fold'; renderAdminHeroTab(document.getElementById('admin-tab-content'))" class="px-3 py-1.5 rounded-lg font-bold text-xs ${selectedAdminFlagshipKey === 'iphone-duo-fold' ? 'bg-primary text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}">
                  iPhone Duo Plegable
                </button>
              </div>
            </div>

            <!-- Formulario del modelo activo seleccionado -->
            <div class="p-4 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-3.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-gray-900 uppercase flex items-center gap-1">
                  <span class="material-symbols-outlined text-primary text-base">smartphone</span> Editando: <span class="text-primary ml-1">${activeFlagship.titleMain}</span>
                </span>
                <button type="button" onclick="saveAdminFlagshipConfig('${selectedAdminFlagshipKey}')" class="px-5 py-2 rounded-full crimson-btn text-white font-extrabold shadow-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">save</span> Guardar Datos de este Modelo
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="font-bold text-gray-700 block mb-1">Título Principal (Línea 1 en grande)</label>
                  <input id="adm-flag-title1" type="text" value="${activeFlagship.titleMain.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-extrabold text-base bg-white">
                </div>
                <div>
                  <label class="font-bold text-gray-700 block mb-1">Subtítulo con Gradiente Rojo (Línea 2)</label>
                  <input id="adm-flag-title2" type="text" value="${activeFlagship.titleGradient.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-primary bg-white">
                </div>
              </div>

              <div>
                <label class="font-bold text-gray-700 block mb-1">Descripción Tecnológica</label>
                <textarea id="adm-flag-desc" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-normal">${activeFlagship.description}</textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="font-bold text-gray-700 block mb-1">Etiqueta Badge Superior</label>
                  <input id="adm-flag-badge" type="text" value="${activeFlagship.badge.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-mono text-[11px]">
                </div>
                <div>
                  <label class="font-bold text-gray-700 block mb-1">Texto Botón de Reserva</label>
                  <input id="adm-flag-cta" type="text" value="${activeFlagship.ctaText.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-bold">
                </div>
                <div>
                  <label class="font-bold text-gray-700 block mb-1">ID Producto Vinculado</label>
                  <input id="adm-flag-target" type="text" value="${activeFlagship.targetId}" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-mono">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label class="font-bold text-gray-700 block mb-1">Especificación: Procesador</label>
                  <input id="adm-flag-chip" type="text" value="${activeFlagship.specChip}" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white">
                </div>
                <div>
                  <label class="font-bold text-gray-700 block mb-1">Especificación: Cámara</label>
                  <input id="adm-flag-cam" type="text" value="${activeFlagship.specCam}" class="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white">
                </div>
              </div>
            </div>
          </div>

          <!-- 3. BARRA ROJA SUPERIOR (TOPBAR PROMO) -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between border-b border-gray-200 pb-2.5">
              <h4 class="text-sm font-extrabold text-gray-900">Barra Superior Anuncio Promocional (Topbar Roja)</h4>
              <button type="button" onclick="cmsData.topbarText = document.getElementById('adm-hero-topbar').value; saveCMSState(); renderCMSHeroAndTopbar(); showToast('Barra superior actualizada')" class="px-4 py-1.5 rounded-full crimson-btn text-white font-bold text-xs">
                Guardar Topbar
              </button>
            </div>
            <div>
              <label class="font-bold text-gray-600 block mb-1">Mensaje marquesina de la barra roja superior</label>
              <input id="adm-hero-topbar" type="text" value="${cmsData.topbarText.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-semibold bg-white">
            </div>
          </div>
        </div>
      `;
    }

    function saveAdminFlagshipConfig(key) {
      if (!cmsData.heroFlagships) {
        cmsData.heroFlagships = JSON.parse(JSON.stringify(defaultCMSData.heroFlagships));
      }
      const item = cmsData.heroFlagships[key];
      if (!item) return;

      item.titleMain = document.getElementById('adm-flag-title1').value;
      item.titleGradient = document.getElementById('adm-flag-title2').value;
      item.description = document.getElementById('adm-flag-desc').value;
      item.badge = document.getElementById('adm-flag-badge').value;
      item.ctaText = document.getElementById('adm-flag-cta').value;
      item.targetId = document.getElementById('adm-flag-target').value;
      item.specChip = document.getElementById('adm-flag-chip').value;
      item.specCam = document.getElementById('adm-flag-cam').value;

      // Sincronizar también con la variable global de hero.js si está presente
      if (typeof heroFlagshipsData !== 'undefined' && heroFlagshipsData[key]) {
        Object.assign(heroFlagshipsData[key], item);
      }

      saveCMSState();
      if (typeof switchHeroFlagship === 'function') {
        switchHeroFlagship(key);
      }
      showToast(`¡Datos de ${item.titleMain} guardados y actualizados en la web!`);
    }

    
    function addAdminHeroSlide() {
      if (!Array.isArray(cmsData.heroSlides)) {
        cmsData.heroSlides = [];
      }
      const newIdx = cmsData.heroSlides.length + 1;
      cmsData.heroSlides.push({
        id: 'slide-' + Date.now(),
        mediaType: 'image',
        mediaUrl: 'assets/img/iphone-pro.png',
        badge: `Banner ${newIdx} • Nuevo Lanzamiento`,
        title: 'Nuevo Banner Promocional RedCover',
        subtitle: 'Edita este subtítulo con tus ofertas especiales, garantía y financiación',
        btn1Text: 'Ver Producto',
        productIdTarget: 'iphone-18-pro-max',
        btn2Text: 'Ver Catálogo',
        categoryTarget: 'iphone'
      });

      saveCMSState();
      renderAllCMSContent();
      renderAdminHeroTab(document.getElementById('admin-tab-content'));
      goToHeroSlide(cmsData.heroSlides.length - 1);
      showToast(`✅ ¡Banner #${newIdx} agregado con éxito!`);
    }

    function deleteAdminHeroSlide(idx) {
      if (!Array.isArray(cmsData.heroSlides) || cmsData.heroSlides.length <= 1) {
        showToast('⚠️ Debe existir al menos 1 banner en el carrusel');
        return;
      }
      if (!confirm(`¿Estás seguro de eliminar el Banner #${idx + 1}?`)) return;

      cmsData.heroSlides.splice(idx, 1);
      currentHeroSlideIndex = 0;
      saveCMSState();
      renderAllCMSContent();
      renderAdminHeroTab(document.getElementById('admin-tab-content'));
      showToast('🗑️ Banner eliminado del carrusel');
    }

    function saveAdminHeroSlide(idx) {
      const sl = cmsData.heroSlides[idx];
      if (!sl) return;
      sl.mediaType = document.getElementById(`adm-slide-type-${idx}`).value;
      sl.badge = document.getElementById(`adm-slide-badge-${idx}`).value;
      sl.title = document.getElementById(`adm-slide-title-${idx}`).value;
      sl.subtitle = document.getElementById(`adm-slide-sub-${idx}`).value;
      sl.btn1Text = document.getElementById(`adm-slide-btn1-${idx}`).value;
      sl.categoryTarget = document.getElementById(`adm-slide-cat-${idx}`).value;
      sl.mediaUrl = document.getElementById(`adm-slide-url-${idx}`).value;

      currentHeroSlideIndex = idx;
      saveCMSState();
      renderCMSHeroAndTopbar();
      showToast(`¡Banner #${idx + 1} guardado y actualizado en el carrusel!`);
    }

    function saveAdminBentoCard(idx) {
      const card = cmsData.bentoCards[idx];
      if (!card) return;
      card.badge = document.getElementById(`adm-bento-badge-${idx}`).value;
      card.priceText = document.getElementById(`adm-bento-price-${idx}`).value;
      card.title = document.getElementById(`adm-bento-title-${idx}`).value;
      card.desc = document.getElementById(`adm-bento-desc-${idx}`).value;
      card.img = document.getElementById(`adm-bento-img-${idx}`).value;
      saveCMSState();
      renderCMSHeroAndTopbar();
      showToast(`Tarjeta Bento #${idx + 1} actualizada`);
    }

    // ==========================================
    // TAB 6: PLAN CANJE, WHATSAPP Y TIENDAS FÍSICAS
    // ==========================================
    function renderAdminCanjeTab(container) {
      const c = cmsData.canjeConfig;
      container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <!-- Configuración Plan Canje -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-extrabold text-gray-900">Cotizador Plan Canje & WhatsApp Oficial</h4>
              <button type="button" onclick="saveAdminCanjeTexts()" class="px-4 py-2 rounded-xl crimson-btn text-white font-bold">Guardar Textos</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="font-bold text-gray-700 block mb-1">Número WhatsApp (con indicativo 57)</label>
                <input id="adm-wa-num" type="text" value="${cmsData.whatsappNumber}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono font-bold text-emerald-700">
              </div>
              <div>
                <label class="font-bold text-gray-700 block mb-1">Monto Máximo Destacado</label>
                <input id="adm-canje-max" type="text" value="${c.maxText.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-primary">
              </div>
            </div>

            <div>
              <label class="font-bold text-gray-700 block mb-1">Descripción de Plan Canje</label>
              <textarea id="adm-canje-desc" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-300">${c.desc}</textarea>
            </div>

            <div class="pt-3 border-t border-gray-200 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-gray-900">Equipos Recibidos y Valor Base Máximo (COP)</span>
                <button type="button" onclick="addCanjeDeviceOption()" class="px-2.5 py-1 rounded-lg bg-zinc-900 text-white font-bold">+ Agregar Equipo</button>
              </div>
              <div class="max-h-64 overflow-y-auto space-y-2 pr-1">
                ${c.devices.map((dev, idx) => `
                  <div class="flex items-center gap-2">
                    <input id="adm-cdev-name-${idx}" type="text" value="${dev.name.replace(/"/g, '&quot;')}" class="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300">
                    <input id="adm-cdev-val-${idx}" type="number" step="50000" value="${dev.value}" class="w-32 px-2.5 py-1.5 rounded-lg border border-gray-300 font-bold text-primary">
                    <button type="button" onclick="saveCanjeDeviceOption(${idx})" class="px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white font-bold">OK</button>
                    <button type="button" onclick="deleteCanjeDeviceOption(${idx})" class="p-1.5 rounded-lg bg-red-50 text-red-600">
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Tiendas Físicas -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-extrabold text-gray-900">Tiendas Físicas Oficiales (${cmsData.stores.length})</h4>
              <button type="button" onclick="addAdminStore()" class="px-3 py-1.5 rounded-xl crimson-btn text-white font-bold">+ Añadir Sede</button>
            </div>
            <div class="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
              ${cmsData.stores.map((st, idx) => `
                <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div class="grid grid-cols-2 gap-2">
                    <input id="adm-st-city-${idx}" type="text" value="${st.city.replace(/"/g, '&quot;')}" class="px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-bold" placeholder="Ciudad">
                    <input id="adm-st-badge-${idx}" type="text" value="${st.badge.replace(/"/g, '&quot;')}" class="px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white text-primary font-semibold" placeholder="Especialidad">
                  </div>
                  <input id="adm-st-addr-${idx}" type="text" value="${st.address.replace(/"/g, '&quot;')}" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white" placeholder="Dirección / Centro Comercial">
                  <div class="grid grid-cols-2 gap-2">
                    <input id="adm-st-hours-${idx}" type="text" value="${st.hours.replace(/"/g, '&quot;')}" class="px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white" placeholder="Horarios">
                    <div class="flex items-center gap-1.5">
                      <input id="adm-st-phone-${idx}" type="text" value="${st.phone.replace(/"/g, '&quot;')}" class="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-bold" placeholder="Teléfono">
                      <button type="button" onclick="saveAdminStore(${idx})" class="px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-bold">Guardar</button>
                      <button type="button" onclick="deleteAdminStore(${idx})" class="p-1.5 rounded-lg bg-red-50 text-red-600">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    function saveAdminCanjeTexts() {
      cmsData.whatsappNumber = document.getElementById('adm-wa-num').value.trim() || '573001234567';
      cmsData.canjeConfig.maxText = document.getElementById('adm-canje-max').value;
      cmsData.canjeConfig.desc = document.getElementById('adm-canje-desc').value;
      saveCMSState();
      renderCMSCanjeAndStores();
      showToast('Configuración de Plan Canje y WhatsApp guardada');
    }

    function saveCanjeDeviceOption(idx) {
      const item = cmsData.canjeConfig.devices[idx];
      if (!item) return;
      item.name = document.getElementById(`adm-cdev-name-${idx}`).value;
      item.value = parseInt(document.getElementById(`adm-cdev-val-${idx}`).value, 10) || 1000000;
      saveCMSState();
      renderCMSCanjeAndStores();
      showToast('Valor de equipo en Plan Canje actualizado');
    }

    function addCanjeDeviceOption() {
      cmsData.canjeConfig.devices.unshift({
        name: 'Nuevo Modelo Apple para Canje',
        value: 2500000
      });
      saveCMSState();
      renderCMSCanjeAndStores();
      renderAdminCanjeTab(document.getElementById('admin-tab-content'));
    }

    function deleteCanjeDeviceOption(idx) {
      if (cmsData.canjeConfig.devices.length <= 1) return;
      cmsData.canjeConfig.devices.splice(idx, 1);
      saveCMSState();
      renderCMSCanjeAndStores();
      renderAdminCanjeTab(document.getElementById('admin-tab-content'));
    }

    function saveAdminStore(idx) {
      const st = cmsData.stores[idx];
      if (!st) return;
      st.city = document.getElementById(`adm-st-city-${idx}`).value;
      st.badge = document.getElementById(`adm-st-badge-${idx}`).value;
      st.address = document.getElementById(`adm-st-addr-${idx}`).value;
      st.hours = document.getElementById(`adm-st-hours-${idx}`).value;
      st.phone = document.getElementById(`adm-st-phone-${idx}`).value;
      saveCMSState();
      renderCMSCanjeAndStores();
      showToast(`Tienda ${st.city} actualizada`);
    }

    function addAdminStore() {
      cmsData.stores.push({
        id: 'store-' + Date.now(),
        city: 'Nueva Ciudad',
        badge: 'Tienda Oficial RedCover',
        address: 'Centro Comercial Principal • Local 101',
        hours: 'Lun - Sáb: 10:00 AM - 8:00 PM',
        phone: '(601) 000-0000'
      });
      saveCMSState();
      renderCMSCanjeAndStores();
      renderAdminCanjeTab(document.getElementById('admin-tab-content'));
    }

    function deleteAdminStore(idx) {
      if (cmsData.stores.length <= 1) return;
      cmsData.stores.splice(idx, 1);
      saveCMSState();
      renderCMSCanjeAndStores();
      renderAdminCanjeTab(document.getElementById('admin-tab-content'));
    }

    // ==========================================
    // EXPORTAR / IMPORTAR / RESTAURAR FÁBRICA
    // ==========================================
    function exportAllStoreData() {
      const payload = {
        exportedAt: new Date().toISOString(),
        devices: allCatalogDevices,
        cmsData: cmsData
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'redcover-colombia-catalogo-completo.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Copia de seguridad JSON descargada');
    }

    function importAllStoreData(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = JSON.parse(e.target.result);
          if (data.devices && Array.isArray(data.devices)) allCatalogDevices = data.devices;
          if (data.cmsData) cmsData = data.cmsData;
          saveCMSState();
          renderAllCMSContent();
          switchAdminTab(currentAdminTab);
          showToast('¡Datos importados y aplicados con éxito!');
        } catch (err) {
          showToast('Archivo JSON inválido');
        }
      };
      reader.readAsText(file);
    }

    
    // Paletas de acabados y colores por categoría / modelo
    const COLOR_PALETTES = {
      desert: { name: 'Titanio Desierto', hex: '#C5B29F', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXQCduY9KlZvDYMM12SNOKJ-UC7ud1w54GbunUI6a2Q6SQabwiz8Q2kaJBmntthx-YaCV8Wy8kQSKZmqDGQNYE9KcWrlbHdYwS8a_Ik-HauhOP6ewcTQJvWq3bt3UskJGN3TrdEt9BCFmGItcuKAUfBFXsjs8lfmRrz8yRzae409mM-WE221baiPBrvHCkacPhhb7xNklcGToW038Ak9jS7ImnRihPrS4ETqWMiTot3fPVgnVc_FZM' },
      natural: { name: 'Titanio Natural', hex: '#9B968F', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Vbp8i7NcqJPqqwjnib7N5kojQ12qGEvJgIy1wgV3-32WO0IHIp3LcK4Ii52b8UHFqKq4nvW7NQozR1cqvE9Qi9YJvFMfEglIWYtutmYXcOCAHk7kKQ1fAZlk8G6cnyTsgxyq8-axeHjd0Kz_VsZNFP_I2DfY1IYtOchlgLNey5Za6e4zt0u21jvBsIQptmckP2q5sEk66EL0qAqhSdjjneDIX9ws4Uhh05RrKjuOfyasw9Bl-f51' },
      white: { name: 'Titanio Blanco', hex: '#E8E8E6', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKpi-7626i_BJoAesODslUPkoHF04It4WQfIRb2gDCzY-XPTt0M4AWO3WivVPvllUKPqKO1qhdw_EkyK6IsQgqWFmrYCyz666iavAdl6p3SM5Rd7J82vr0lZhy3YDHo9sPYN5PQUCyWDPW9pdYh6VzFQp3QVDOIaAfKgJXAz2givYj5_BDYXPsmJsCXvxGgS-JuiYI6ziK3EGAf1dO_3gPjpA3eRj_FrcGJ__DTBAC1ChH96IN4DBt' },
      black: { name: 'Titanio Negro', hex: '#343332', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMv6ybGEqgj4q7JB0905STGqvKkmeSjkOwJKHIsW3lZQs4t7J9z3Amool_EzZPhTuq47-VhCiR1KPVV_-avHCio8xc3fr8wI60m9tDqXziuhwgWSjPM1LTVzemNhlB7eDtEfWXuEjN91U0oRvU3KQv-a9Q-5xFxWdZlqEEJzeVWzKrhgXeEuRV3YEQMRl6YOAUBssA02c0rygPJNmzDND3-L9BBigYBXR_GsW5GtkuUN7mn8VyrNqi' },
      silver: { name: 'Plata Estelar', hex: '#E2E4E5' },
      spacegray: { name: 'Gris Espacial', hex: '#535150' },
      midnight: { name: 'Medianoche', hex: '#2E3642' },
      starlight: { name: 'Blanco Estelar', hex: '#F0EAD6' },
      gold: { name: 'Oro Champán', hex: '#F5E7D0' },
      blue: { name: 'Azul Titanio', hex: '#3B4459' },
      green: { name: 'Verde Salvia', hex: '#879788' },
      crimson: { name: 'Carmesí RedCover', hex: '#EF233C' }
    };

    function getBaseDeviceColorOptions(device) {
      if (!device) return [];

      const id = (device.id || '').toLowerCase();
      const title = (device.title || '').toLowerCase();
      const cat = (device.category || '').toLowerCase();
      const baseImg = device.img;

      // 1. Serie iPhone 11
      if (id.includes('iphone-11-pro') || title.includes('iphone 11 pro')) {
        return [
          { name: 'Gris espacial (Space Gray)', hex: '#4C4B49', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E2E4E1', img: baseImg },
          { name: 'Oro (Gold)', hex: '#FAD7BD', img: baseImg },
          { name: 'Verde noche (Midnight Green)', hex: '#4E5851', img: baseImg }
        ];
      }
      if (id.includes('iphone-11') || title.includes('iphone 11')) {
        return [
          { name: 'Negro (Black)', hex: '#1F2024', img: baseImg },
          { name: 'Blanco (White)', hex: '#F9F6EF', img: baseImg },
          { name: 'Verde (Green - menta pastel)', hex: '#AEE1CD', img: baseImg },
          { name: 'Amarillo (Yellow)', hex: '#FFE680', img: baseImg },
          { name: 'Morado / Malva (Purple)', hex: '#D1CDDA', img: baseImg },
          { name: 'Rojo ((PRODUCT)RED)', hex: '#BA0C2F', img: baseImg }
        ];
      }

      // 2. Serie iPhone 12
      if (id.includes('iphone-12-pro') || title.includes('iphone 12 pro')) {
        return [
          { name: 'Grafito (Graphite)', hex: '#504F4B', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E5E5E2', img: baseImg },
          { name: 'Oro (Gold)', hex: '#F9E5C9', img: baseImg },
          { name: 'Azul pacífico (Pacific Blue)', hex: '#2F4B54', img: baseImg }
        ];
      }
      if (id.includes('iphone-12') || title.includes('iphone 12')) {
        return [
          { name: 'Negro (Black)', hex: '#1D1D1F', img: baseImg },
          { name: 'Blanco (White)', hex: '#F9F6EF', img: baseImg },
          { name: 'Azul (Blue)', hex: '#273C4C', img: baseImg },
          { name: 'Verde (Green)', hex: '#DBEFE1', img: baseImg },
          { name: 'Morado (Purple)', hex: '#BDB7DC', img: baseImg },
          { name: 'Rojo ((PRODUCT)RED)', hex: '#D62934', img: baseImg }
        ];
      }

      // 3. Serie iPhone 13
      if (id.includes('iphone-13-pro') || title.includes('iphone 13 pro')) {
        return [
          { name: 'Grafito (Graphite)', hex: '#54524F', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E9EAE8', img: baseImg },
          { name: 'Oro (Gold)', hex: '#FAE7CF', img: baseImg },
          { name: 'Azul Sierra (Sierra Blue)', hex: '#9BB5CE', img: baseImg },
          { name: 'Verde alpino (Alpine Green)', hex: '#576856', img: baseImg }
        ];
      }
      if (id.includes('iphone-13') || title.includes('iphone 13')) {
        return [
          { name: 'Medianoche (Midnight)', hex: '#1C232E', img: baseImg },
          { name: 'Blanco estelar (Starlight)', hex: '#F8F7F2', img: baseImg },
          { name: 'Azul (Blue)', hex: '#3B6B88', img: baseImg },
          { name: 'Rosa (Pink)', hex: '#FADDD7', img: baseImg },
          { name: 'Verde (Green)', hex: '#3B5240', img: baseImg },
          { name: 'Rojo ((PRODUCT)RED)', hex: '#C82333', img: baseImg }
        ];
      }

      // 4. iPhone 14 / Pro
      if (id.includes('iphone-14-pro') || title.includes('iphone 14 pro')) {
        return [
          { name: 'Negro espacial (Space Black)', hex: '#38363B', img: baseImg },
          { name: 'Plata (Silver)', hex: '#F1F2ED', img: baseImg },
          { name: 'Oro (Gold)', hex: '#F4E8CE', img: baseImg },
          { name: 'Morado oscuro (Deep Purple)', hex: '#483F50', img: baseImg }
        ];
      }
      if (id.includes('iphone-14') || title.includes('iphone 14')) {
        return [
          { name: 'Medianoche (Midnight)', hex: '#1E232A', img: baseImg },
          { name: 'Blanco estelar (Starlight)', hex: '#FAF7F2', img: baseImg },
          { name: 'Azul (Blue)', hex: '#A0B4C7', img: baseImg },
          { name: 'Morado (Purple)', hex: '#E3DFF2', img: baseImg },
          { name: 'Amarillo (Yellow)', hex: '#F9E378', img: baseImg },
          { name: 'Rojo ((PRODUCT)RED)', hex: '#DE263E', img: baseImg }
        ];
      }

      // 5. iPhone 15 / Pro
      if (id.includes('iphone-15-pro') || title.includes('iphone 15 pro')) {
        return [
          { name: 'Titanio negro (Black Titanium)', hex: '#3C3B3A', img: baseImg },
          { name: 'Titanio blanco (White Titanium)', hex: '#E3E4E5', img: baseImg },
          { name: 'Titanio azul (Blue Titanium)', hex: '#3B4454', img: baseImg },
          { name: 'Titanio natural (Natural Titanium)', hex: '#888681', img: baseImg }
        ];
      }
      if (id.includes('iphone-15') || title.includes('iphone 15')) {
        return [
          { name: 'Negro (Black)', hex: '#35393B', img: baseImg },
          { name: 'Azul (Blue)', hex: '#D4E0E6', img: baseImg },
          { name: 'Verde (Green)', hex: '#D3E1D4', img: baseImg },
          { name: 'Amarillo (Yellow)', hex: '#F3E9C4', img: baseImg },
          { name: 'Rosa (Pink)', hex: '#EAD2D4', img: baseImg }
        ];
      }

      // 6. iPhone 16 / Plus / Pro
      if (id === 'iphone-16-pro' || id === 'iphone-16-pro-max' || title.includes('iphone 16 pro')) {
        return [
          { name: 'Titanio negro (Black Titanium)', hex: '#343538', img: COLOR_PALETTES.black.img },
          { name: 'Titanio blanco (White Titanium)', hex: '#E2E3E5', img: COLOR_PALETTES.white.img },
          { name: 'Titanio natural (Natural Titanium)', hex: '#9A958D', img: COLOR_PALETTES.natural.img },
          { name: 'Titanio desierto (Desert Titanium)', hex: '#C5A58A', img: COLOR_PALETTES.desert.img }
        ];
      }
      if (id.includes('iphone-16') || title.includes('iphone 16')) {
        return [
          { name: 'Negro (Black)', hex: '#2F3337', img: baseImg },
          { name: 'Blanco (White)', hex: '#F3F3F5', img: baseImg },
          { name: 'Rosa (Pink)', hex: '#EA8CA5', img: baseImg },
          { name: 'Verde azulado (Teal)', hex: '#84BDAC', img: baseImg },
          { name: 'Ultramarino (Ultramarine)', hex: '#4B6BB5', img: baseImg }
        ];
      }

      // 7. iPhone 17 / Air / Pro
      if (id.includes('iphone-17-air') || title.includes('iphone 17 air')) {
        return [
          { name: 'Azul cielo (Sky Blue)', hex: '#87CEEB', img: baseImg },
          { name: 'Dorado claro (Light Gold)', hex: '#F5E6AB', img: baseImg },
          { name: 'Blanco nube (Cloud White)', hex: '#F5F6F8', img: baseImg },
          { name: 'Negro espacial (Space Black)', hex: '#2B2D42', img: baseImg }
        ];
      }
      if (id.includes('iphone-17-pro') || title.includes('iphone 17 pro')) {
        return [
          { name: 'Naranja cósmico (Cosmic Orange)', hex: '#E05A2B', img: baseImg },
          { name: 'Azul oscuro (Dark Blue)', hex: '#1E3A8A', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E2E8F0', img: baseImg }
        ];
      }
      if (id.includes('iphone-17') || title.includes('iphone 17')) {
        return [
          { name: 'Lavanda (Lavender)', hex: '#C8BFE7', img: baseImg },
          { name: 'Verde salvia (Sage)', hex: '#9EAB9D', img: baseImg },
          { name: 'Azul neblina (Mist Blue)', hex: '#A7BED3', img: baseImg },
          { name: 'Blanco (White)', hex: '#F8F9FA', img: baseImg },
          { name: 'Negro (Black)', hex: '#212529', img: baseImg }
        ];
      }

      // 8. iPhone 18 / Duo
      if (id.includes('iphone-duo') || id.includes('fold') || title.includes('duo')) {
        return [
          { name: 'Blanco estelar (Starlight)', hex: '#F8FAFC', img: baseImg },
          { name: 'Cielo nocturno (Night Sky)', hex: '#0F172A', img: baseImg }
        ];
      }
      if (id.includes('iphone-18') || title.includes('iphone 18')) {
        return [
          { name: 'Negro carbón (Black)', hex: '#18181B', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E4E4E7', img: baseImg },
          { name: 'Azul glaciar (Glacier)', hex: '#7DD3FC', img: baseImg },
          { name: 'Borgoña (Burgundy)', hex: '#831843', img: baseImg }
        ];
      }

      // 9. MacBooks
      if (id.includes('macbook-neo') || title.includes('macbook neo')) {
        return [
          { name: 'Plata (Silver)', hex: '#CBD5E1', img: baseImg },
          { name: 'Rosa nube (Cloud Pink)', hex: '#F472B6', img: baseImg },
          { name: 'Cítrico (Citrus)', hex: '#FBBF24', img: baseImg },
          { name: 'Índigo (Indigo)', hex: '#6366F1', img: baseImg }
        ];
      }
      if (id.includes('macbook-air') || title.includes('macbook air')) {
        return [
          { name: 'Azul cielo (Sky Blue)', hex: '#93C5FD', img: baseImg },
          { name: 'Medianoche (Midnight)', hex: '#1E293B', img: baseImg },
          { name: 'Blanco estelar (Starlight)', hex: '#F1F5F9', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E2E8F0', img: baseImg }
        ];
      }
      if (id.includes('macbook-pro') || title.includes('macbook pro')) {
        return [
          { name: 'Negro espacial (Space Black)', hex: '#1E1E24', img: baseImg },
          { name: 'Plata (Silver)', hex: '#E2E8F0', img: baseImg }
        ];
      }

      // 10. AirPods
      if (cat === 'airpods' || id.includes('airpods') || title.includes('airpods')) {
        return [
          { name: 'Blanco (White)', hex: '#FFFFFF', img: baseImg }
        ];
      }

      // 11. Apple Watch
      if (id.includes('ultra') || title.includes('ultra')) {
        return [
          { name: 'Titanio natural (Natural Titanium)', hex: '#A8A29E', img: baseImg },
          { name: 'Titanio negro (Black Titanium)', hex: '#1C1917', img: baseImg }
        ];
      }
      if (cat === 'watch' || id.includes('watch') || title.includes('watch') || title.includes('serie')) {
        return [
          { name: 'Aluminio Negro azabache (Jet Black)', hex: '#0A0A0A', img: baseImg },
          { name: 'Aluminio Oro rosa (Rose Gold)', hex: '#E8B4B8', img: baseImg },
          { name: 'Aluminio Plata (Silver)', hex: '#E2E8F0', img: baseImg },
          { name: 'Aluminio Gris espacial (Space Grey)', hex: '#4A4E69', img: baseImg },
          { name: 'Titanio Natural (Natural)', hex: '#A8A29E', img: baseImg },
          { name: 'Titanio Oro (Gold)', hex: '#D4AF37', img: baseImg },
          { name: 'Titanio Pizarra (Slate)', hex: '#475569', img: baseImg }
        ];
      }

      // 12. Samsung
      if (id.includes('s26') || title.includes('s26')) {
        return [
          { name: 'Violeta Cobalto (Cobalt Violet)', hex: '#581C87', img: baseImg },
          { name: 'Azul Cielo (Sky Blue)', hex: '#38BDF8', img: baseImg },
          { name: 'Negro (Black)', hex: '#18181B', img: baseImg },
          { name: 'Blanco (White)', hex: '#F8FAFC', img: baseImg },
          { name: 'Gris (Gray)', hex: '#64748B', img: baseImg },
          { name: 'Oro Rosa (Pink Gold)', hex: '#F43F5E', img: baseImg }
        ];
      }
      if (id.includes('s25') || title.includes('s25')) {
        return [
          { name: 'Titanio Negro (Titanium Black)', hex: '#18181B', img: baseImg },
          { name: 'Titanio Gris (Titanium Gray)', hex: '#71717A', img: baseImg },
          { name: 'Titanio Plata Azul (Titanium Silverblue)', hex: '#94A3B8', img: baseImg },
          { name: 'Titanio Blanco Plata (Titanium Whitesilver)', hex: '#F1F5F9', img: baseImg },
          { name: 'Titanio Negro Intenso (Titanium Jetblack)', hex: '#09090B', img: baseImg },
          { name: 'Titanio Verde Jade (Titanium Jadegreen)', hex: '#059669', img: baseImg },
          { name: 'Titanio Oro Rosa (Titanium Pinkgold)', hex: '#FB7185', img: baseImg }
        ];
      }

      if (Array.isArray(device.colors) && device.colors.length > 0) {
        return device.colors.map(c => ({
          name: c.name,
          hex: c.hex,
          img: c.img || baseImg
        }));
      }

      return [
        { name: 'Negro (Black)', hex: '#18181B', img: baseImg },
        { name: 'Plata (Silver)', hex: '#E4E4E7', img: baseImg }
      ];
    }

    function applyCustomColorImages(rawColors, device) {
      if (!Array.isArray(rawColors) || !device) return rawColors || [];
      return rawColors.map((c, idx) => {
        let custom = null;
        if (Array.isArray(device.colorImages) && device.colorImages[idx]) {
          custom = device.colorImages[idx];
        } else if (device.colorImages && typeof device.colorImages === 'object' && device.colorImages[c.name]) {
          custom = device.colorImages[c.name];
        } else if (Array.isArray(device.colors) && device.colors[idx] && device.colors[idx].img) {
          custom = device.colors[idx].img;
        }
        return {
          name: c.name,
          hex: c.hex,
          img: custom || c.img || device.img
        };
      });
    }

    function getDeviceColorOptions(device) {
      const baseColors = getBaseDeviceColorOptions(device);
      return applyCustomColorImages(baseColors, device);
    }

    // ==========================================
    // TAB 7: CONFIGURACIÓN DIRECTA DE IPHONE-16-PRO.HTML
    // ==========================================
    function renderAdminIphone16ProTab(container) {
      if (!cmsData.iphone16proConfig) {
        cmsData.iphone16proConfig = {
          title: "iPhone 16 Pro y iPhone 16 Pro Max",
          subtitle: "Configura tu iPhone 16 Pro y iPhone 16 Pro Max. Elige acabado en Titanio, almacenamiento, cotiza Plan Canje y financia cómodamente en RedCover Colombia.",
          stickyBadge: "Titanio Grado 5",
          heroStockPill: "En Stock Colombia",
          heroBadgeText: "Apple Intelligence Ready",
          guaranteeText: "Distribuidor Autorizado Oficial Apple & Samsung Colombia • Factura legal DIAN",
          stockLocation: "San Andresito de la 38 C.C. Caribe (Locales 136 y 197)",
          installmentText: "o 24 cuotas",
          tradeInTitle: "Plan Canje RedCover: Ahorra hasta $2.500.000",
          baseDeviceId: "iphone-16-pro"
        };
      }
      const cfg = cmsData.iphone16proConfig;
      let targetId = cfg.baseDeviceId || 'iphone-16-pro';
      let dev = allCatalogDevices.find(d => d.id === targetId);
      if (!dev) {
        dev = allCatalogDevices.find(d => d.id === 'iphone-16-pro') || allCatalogDevices[0];
        targetId = dev.id;
        cfg.baseDeviceId = dev.id;
      }
      const devColors = getDeviceColorOptions(dev);

      container.innerHTML = `
        <div class="space-y-6 max-w-5xl mx-auto">
          <!-- Banner Superior Informativo -->
          <div class="bg-gradient-to-r from-zinc-900 via-neutral-900 to-zinc-900 text-white p-5 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span class="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">Editor Universal de Producto</span>
              </div>
              <h4 class="text-lg font-black tracking-tight">Página iPhone 16 Pro &amp; Configurador (<code class="text-xs text-red-300 font-mono">configuracion.html</code>)</h4>
              <p class="text-xs text-zinc-400">Modifica precios, colores de titanio, fotos, variantes de memoria, textos de stock y garantía. Todos los cambios se sincronizan en vivo.</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <a href="configuracion.html?id=${dev.id}" target="_blank" class="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 border border-zinc-700 transition-all">
                <span class="material-symbols-outlined text-sm">open_in_new</span> Ver Página
              </a>
              <button type="button" onclick="saveAdminIphone16ProChanges()" class="px-5 py-2.5 rounded-xl crimson-btn text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-sm">save</span> Guardar Cambios
              </button>
            </div>
          </div>

          <!-- Selector de Producto Activo -->
          <div class="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-xl">tune</span>
              <span class="text-xs font-bold text-gray-800">Producto a Configurar en la Página:</span>
            </div>
            <select id="adm-i16-target-device" onchange="changeIphone16ProTarget(this.value)" class="px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white text-gray-900 min-w-[280px]">
              ${allCatalogDevices.map(d => `<option value="${d.id}" ${d.id === dev.id ? 'selected' : ''}>${d.title} (${formatCOP(d.price)})</option>`).join('')}
            </select>
          </div>

          <!-- Formulario de Configuración Dividido en Secciones -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Columna Izquierda: Datos del Producto & Fotos (7 cols) -->
            <div class="lg:col-span-7 space-y-5">
              
              <!-- 1. Título, Precio y Badges -->
              <div class="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
                <h5 class="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-base">info</span> 1. Información Principal del Producto
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Nombre / Título Oficial *</label>
                    <input id="adm-i16-title" type="text" value="${dev.title.replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-900">
                  </div>
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Precio Base Contado (COP) *</label>
                    <input id="adm-i16-price" type="number" step="1000" value="${dev.price}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-extrabold text-primary">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Badge Superior en Escenario</label>
                    <input id="adm-i16-badge" type="text" value="${(dev.badge || 'Apple Intelligence Ready').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-semibold">
                  </div>
                  <div>
                    <label class="block font-bold text-gray-700 mb-1">Badge de Material (Barra Flotante)</label>
                    <input id="adm-i16-sticky-badge" type="text" value="${(cfg.stickyBadge || 'Titanio Grado 5').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-semibold">
                  </div>
                </div>

                <div class="text-xs">
                  <label class="block font-bold text-gray-700 mb-1">Descripción del Producto</label>
                  <textarea id="adm-i16-desc" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-normal">${dev.shortDesc || ''}</textarea>
                </div>
              </div>

              <!-- 2. Foto Principal en Escenario Hero & Fotos por Color -->
              <div class="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
                <div class="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h5 class="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">photo_camera</span> 2. Foto Principal en Escenario Hero &amp; Fotos por Color
                  </h5>
                  <span class="text-[11px] font-bold text-gray-500">${devColors.length} Colores Oficiales</span>
                </div>

                <!-- Foto Principal Base (Portada) -->
                <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <span class="text-[11px] font-extrabold text-gray-800 block">Foto Principal Predeterminada</span>
                  <div class="flex flex-col sm:flex-row items-center gap-4 text-xs">
                    <img id="adm-i16-img-preview" src="${dev.img}" class="w-24 h-24 rounded-2xl object-contain bg-white border border-gray-200 p-2 shrink-0 shadow-2xs">
                    <div class="flex-1 w-full space-y-2">
                      <label class="block font-bold text-gray-700 text-[11px]">URL de la Imagen o Subir desde tu PC</label>
                      <input id="adm-i16-img" type="text" value="${dev.img}" oninput="document.getElementById('adm-i16-img-preview').src=this.value" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-[11px] bg-white font-mono">
                      <div class="flex flex-wrap items-center gap-2">
                        <label class="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-primary text-white text-[11px] font-bold cursor-pointer inline-flex items-center gap-1 shadow-sm transition-colors">
                          <span class="material-symbols-outlined text-sm">upload_file</span> Subir Foto desde PC
                          <input type="file" accept="image/*" class="hidden" onchange="handleAdminImageUpload(this, 'adm-i16-img', 'adm-i16-img-preview')">
                        </label>
                        <button type="button" onclick="document.getElementById('adm-i16-img').value=IMG_IPHONE_PRO; document.getElementById('adm-i16-img-preview').src=IMG_IPHONE_PRO;" class="px-2.5 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] font-semibold">Foto Oficial</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Fotos Individuales por cada Color del Teléfono -->
                <div class="space-y-3 pt-1">
                  <div class="flex items-center justify-between">
                    <div>
                      <h6 class="text-xs font-black text-gray-900 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-primary">palette</span> Fotos según el Color del Celular
                      </h6>
                      <p class="text-[11px] text-gray-500">Al seleccionar un color en el configurador, el escenario hero y las miniaturas cambiarán a la foto que elijas aquí.</p>
                    </div>
                  </div>

                  <div class="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    ${devColors.map((col, idx) => `
                      <div class="p-3 rounded-xl border border-gray-200 bg-white space-y-2 shadow-2xs hover:border-gray-300 transition-all">
                        <div class="flex items-center justify-between border-b border-gray-100 pb-1.5">
                          <div class="flex items-center gap-2 min-w-0">
                            <span class="w-4 h-4 rounded-full border border-gray-300 shrink-0 shadow-2xs" style="background-color: ${col.hex};"></span>
                            <span class="text-xs font-bold text-gray-900 truncate" title="${col.name}">${col.name}</span>
                          </div>
                          <span class="text-[10px] font-mono text-gray-400 shrink-0">Color #${idx + 1}</span>
                        </div>

                        <div class="flex items-center gap-3">
                          <img id="adm-i16-col-preview-${idx}" src="${col.img}" class="w-16 h-16 rounded-xl object-contain bg-gray-50 border border-gray-200 p-1 shrink-0">
                          <div class="flex-1 space-y-1.5 min-w-0">
                            <input id="adm-i16-col-img-${idx}" type="text" value="${col.img}" oninput="document.getElementById('adm-i16-col-preview-${idx}').src=this.value" placeholder="URL de imagen para este color..." class="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-[11px] bg-white font-mono">
                            <div class="flex items-center gap-2">
                              <label class="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-primary text-white text-[10px] font-bold cursor-pointer inline-flex items-center gap-1 transition-colors shadow-2xs">
                                <span class="material-symbols-outlined text-xs">upload_file</span> Subir Foto
                                <input type="file" accept="image/*" class="hidden" onchange="handleAdminImageUpload(this, 'adm-i16-col-img-${idx}', 'adm-i16-col-preview-${idx}')">
                              </label>
                              <button type="button" onclick="document.getElementById('adm-i16-col-img-${idx}').value=document.getElementById('adm-i16-img').value; document.getElementById('adm-i16-col-preview-${idx}').src=document.getElementById('adm-i16-img').value;" class="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-medium">Usar Portada</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- 3. Especificaciones Técnicas de Ingeniería -->
              <div class="bg-white p-5 rounded-2xl border border-gray-200 space-y-3">
                <h5 class="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-base">memory</span> 3. Especificaciones de Ingeniería (1 por línea)
                </h5>
                <textarea id="adm-i16-specs" rows="4" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono text-[11px] leading-relaxed">${(dev.specs || []).join('\n')}</textarea>
              </div>

            </div>

            <!-- Columna Derecha: Variantes, Colores y Textos de Tienda (5 cols) -->
            <div class="lg:col-span-5 space-y-5">
              
              <!-- 4. Variantes de Almacenamiento & Precios -->
              <div class="bg-white p-5 rounded-2xl border border-gray-200 space-y-3">
                <h5 class="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-base">storage</span> 4. Capacidades y Precios (1 por línea)
                </h5>
                <p class="text-[11px] text-gray-500">Formato: <code>Capacidad - $Precio COP</code> (Ejemplo: <code>128 GB - $4.899.000</code>)</p>
                <textarea id="adm-i16-variants" rows="5" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono text-[11px] leading-relaxed">${(dev.variants || []).join('\n')}</textarea>
              </div>

              <!-- 5. Textos de Garantía, Stock y Financiación -->
              <div class="bg-white p-5 rounded-2xl border border-gray-200 space-y-4 text-xs">
                <h5 class="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-base">verified</span> 5. Textos de Stock y Financiación
                </h5>
                <div>
                  <label class="block font-bold text-gray-700 mb-1">Estado de Stock</label>
                  <input id="adm-i16-stock" type="text" value="${(dev.stockStatus || '● En Stock Colombia').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-emerald-700 font-bold">
                </div>
                <div>
                  <label class="block font-bold text-gray-700 mb-1">Ubicación de Stock en Tiendas</label>
                  <input id="adm-i16-location" type="text" value="${(cfg.stockLocation || 'San Andresito de la 38 C.C. Caribe (Locales 136 y 197)').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                </div>
                <div>
                  <label class="block font-bold text-gray-700 mb-1">Texto de Garantía Oficial</label>
                  <input id="adm-i16-guarantee" type="text" value="${(cfg.guaranteeText || 'Distribuidor Autorizado Oficial Apple & Samsung Colombia • Factura legal DIAN').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                </div>
                <div>
                  <label class="block font-bold text-gray-700 mb-1">Texto de Cuotas en Barra</label>
                  <input id="adm-i16-installment" type="text" value="${(cfg.installmentText || 'o 24 cuotas').replace(/"/g, '&quot;')}" class="w-full px-3 py-2 rounded-xl border border-gray-300">
                </div>
              </div>

              <!-- Botón Guardar Cambios -->
              <div class="pt-2">
                <button type="button" onclick="saveAdminIphone16ProChanges()" class="w-full py-4 rounded-full crimson-btn text-white text-xs font-black uppercase tracking-wider shadow-xl flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-lg">save</span> Guardar y Aplicar Cambios a configuracion.html
                </button>
              </div>

            </div>

          </div>
        </div>
      `;
    }

    function changeIphone16ProTarget(newId) {
      if (!cmsData.iphone16proConfig) cmsData.iphone16proConfig = {};
      cmsData.iphone16proConfig.baseDeviceId = newId;
      saveCMSState();
      renderAdminIphone16ProTab(document.getElementById('admin-tab-content'));
    }

    function saveAdminIphone16ProChanges() {
      if (!cmsData.iphone16proConfig) cmsData.iphone16proConfig = {};
      const cfg = cmsData.iphone16proConfig;
      const targetId = document.getElementById('adm-i16-target-device')?.value || cfg.baseDeviceId || 'iphone-16-pro';
      cfg.baseDeviceId = targetId;

      let dev = allCatalogDevices.find(d => d.id === targetId);
      if (!dev) return;

      dev.title = document.getElementById('adm-i16-title').value.trim() || dev.title;
      dev.price = parseInt(document.getElementById('adm-i16-price').value, 10) || dev.price;
      dev.badge = document.getElementById('adm-i16-badge').value.trim() || dev.badge;
      dev.shortDesc = document.getElementById('adm-i16-desc').value.trim() || dev.shortDesc;
      dev.img = document.getElementById('adm-i16-img').value.trim() || dev.img;
      dev.stockStatus = document.getElementById('adm-i16-stock').value.trim() || '● En Stock';

      dev.specs = document.getElementById('adm-i16-specs').value.split('\n').map(s => s.trim()).filter(Boolean);
      dev.variants = document.getElementById('adm-i16-variants').value.split('\n').map(s => s.trim()).filter(Boolean);

      cfg.stickyBadge = document.getElementById('adm-i16-sticky-badge').value.trim() || 'Titanio Grado 5';
      cfg.stockLocation = document.getElementById('adm-i16-location').value.trim();
      cfg.guaranteeText = document.getElementById('adm-i16-guarantee').value.trim();
      cfg.installmentText = document.getElementById('adm-i16-installment').value.trim();

      // Guardar fotos personalizadas por color
      dev.colorImages = Array.isArray(dev.colorImages) ? dev.colorImages : [];
      const currentDevColors = getDeviceColorOptions(dev);
      currentDevColors.forEach((col, idx) => {
        const inputEl = document.getElementById(`adm-i16-col-img-${idx}`);
        if (inputEl) {
          const val = inputEl.value.trim();
          dev.colorImages[idx] = val || col.img || dev.img;
        }
      });
      if (Array.isArray(dev.colors)) {
        dev.colors.forEach((c, idx) => {
          if (dev.colorImages[idx]) c.img = dev.colorImages[idx];
        });
      }

      saveCMSState();

      if (typeof initProductConfigurator === 'function') {
        initProductConfigurator();
        showToast('✅ ¡Página de iPhone 16 Pro actualizada en vivo!');
      } else {
        renderAllCMSContent();
        showToast(`✅ ¡Página configuracion.html y producto "${dev.title}" actualizados exitosamente!`);
      }
      renderAdminIphone16ProTab(document.getElementById('admin-tab-content'));
    }

    function resetStoreToFactoryDefaults() {
      localStorage.removeItem(CMS_STORAGE_KEY);
      allCatalogDevices = JSON.parse(JSON.stringify(factoryCatalogDevices));
      cmsData = JSON.parse(JSON.stringify(defaultCMSData));
      renderAllCMSContent();
      switchAdminTab(currentAdminTab);
      showToast('Catálogo y configuración restaurados a los valores originales de fábrica');
    }

    // Inicializar Catálogo, CMS y Carrito al cargar la página
    window.addEventListener('DOMContentLoaded', () => {
      loadCMSState();
      renderAllCMSContent();
      updateCartUI();
      if (window.location.hash) {
        const h = window.location.hash.replace('#', '');
        if (h === 'admin') {
          setTimeout(() => openAdminPanel(), 200);
        } else if (['iphone', 'airpods', 'mac', 'ipad', 'watch', 'samsung'].includes(h)) {
          filterDevices(h);
        }
      }
    });