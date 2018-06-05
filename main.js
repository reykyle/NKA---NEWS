let deferredPrompt;;

window.addEventListener('beforeinstallprompt', (event) => {
    e.preventDefault();
    deferredPrompt = e;
  btnAdd.style.display = 'block';
});
