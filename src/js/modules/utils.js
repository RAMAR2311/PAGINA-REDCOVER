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
