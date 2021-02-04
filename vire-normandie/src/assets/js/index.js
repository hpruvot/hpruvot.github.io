document.querySelector('.zone').addEventListener('click', () => {
  document.querySelector('.popup').classList.add('-isShowed');
});

document.querySelector('.popup__back').addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('-isShowed');
});