export function showAlert(title, message, onConfirm) {
  const alertModal = document.getElementById('alertModal');
  const alertDialogContent = document.getElementById('alertDialogContent');

  document.getElementById('alertTitle').textContent = title;
  document.getElementById('alertMessage').textContent = message;

  alertModal.classList.remove('hidden');

  setTimeout(() => {
    alertDialogContent.classList.add('scale-100', 'opacity-100');
    alertDialogContent.classList.remove('scale-95', 'opacity-0');
  }, 10);

  document.getElementById('alertConfirmButton').onclick = function () {
    onConfirm();
    closeAlert();
  };

  document.getElementById('alertCancelButton').onclick = function () {
    closeAlert();
  };
}

export function closeAlert() {
  const alertModal = document.getElementById('alertModal');
  const alertDialogContent = document.getElementById('alertDialogContent');

  alertDialogContent.classList.add('scale-95', 'opacity-0');
  alertDialogContent.classList.remove('scale-100', 'opacity-100');

  setTimeout(() => {
    alertModal.classList.add('hidden');
  }, 300);
}
