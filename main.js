btnInstall.addEventListener('click', () => {
    // Update the install UI to remove the install button
    document.querySelector('#install-button').disabled = true;
    // Show the modal add to home screen dialog
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      installPromptEvent = null;
    });
  });