if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        // eslint-disable-next-line
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        // eslint-disable-next-line
        console.log('SW registration failed: ', registrationError);
      });
  });
}
