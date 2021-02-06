document.querySelectorAll('.zone__item').forEach(item => {
  item.addEventListener('click', () => {
    const index = item.getAttribute('data-zone');
    console.log(index);
    document.querySelector('[data-popup="'+ index +'"]').classList.add('-isShowed');
  });
})

document.querySelectorAll('.popup__back').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.-isShowed').classList.remove('-isShowed');
  })
});
