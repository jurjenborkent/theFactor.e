module.exports.customPIP = function (video, button) {
  if (!document.pictureInPictureEnabled) {
    console.error('PiP is not supported in your browser.')
    button.style.display = 'none'
    button.disabled = true
  }

  button.addEventListener('click', () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture()
        .then(() => {
          button.style.backgroundImage = 'url(src/assets/img/enter_pip.svg)'
        })
        .catch(() => {
          console.error('PiP','Failed to exit')
        });
    } else {
      video.requestPictureInPicture()
      .then(() => {
        button.style.backgroundImage = 'url(src/assets/img/exit_pip.svg)'
      })
      .catch(() => {
        console.error('PIi','Failed to enter')
      });
    }
  });

}
