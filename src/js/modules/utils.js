// Utilidades compartidas de RedCover Colombia

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
  if (!toast || !toastMsg) return;
  toastMsg.innerText = msg;
  toast.classList.remove('hidden');
  toast.classList.add('flex', 'toast-enter');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex', 'toast-enter');
  }, 2800);
}

function getDeviceCondition(item) {
  if (!item) return null;
  const raw = String(item.condition || '').trim().toLowerCase();
  if (raw === 'none' || raw === 'ninguna') return null;
  if (raw === 'exhibicion' || raw === 'exhibición') return 'exhibicion';
  if (raw === 'nuevo') return 'nuevo';

  const haystack = `${item.id || ''} ${item.title || ''} ${item.badge || ''} ${item.shortDesc || ''}`.toLowerCase();
  if (/(exhibici[oó]n|vitrina|seminuevo|demo\b)/i.test(haystack)) {
    return 'exhibicion';
  }
  if ((item.category === 'iphone' || item.displayCategory === 'iphone') && /iphone[- ](11|12|13|14)\b/i.test(haystack)) {
    return 'exhibicion';
  }
  return 'nuevo';
}

function renderConditionBadge(item, extraClass = '') {
  const cond = getDeviceCondition(item);
  if (!cond) return '';
  if (cond === 'exhibicion') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-300/90 text-amber-800 text-[10px] font-bold tracking-wide shadow-sm ${extraClass}"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Exhibición</span>`;
  }
  return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-300/90 text-emerald-700 text-[10px] font-bold tracking-wide shadow-sm ${extraClass}"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Nuevo</span>`;
}
