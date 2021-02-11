let interviewStep = 1;

document.querySelectorAll('.zone__item').forEach(item => {
  item.addEventListener('click', () => {
    const index = item.getAttribute('data-zone');
    document.querySelector('[data-popup="'+ index +'"]').classList.add('-isShowed');
    if (index == 6) {
      document.querySelector('[data-interview="1"]').classList.add('-isShowed')
    }
  });
})

document.querySelectorAll('.popup__back').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.-isShowed').classList.remove('-isShowed');
    interviewStep = 1;
    document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
      interview.classList.remove('-isShowed');
    })
  });
});


document.querySelector('.o-interview__tooltipNext').addEventListener('click', () => {
  document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
    interview.classList.remove('-isShowed');
  })
  document.querySelector('[data-interview="'+ (interviewStep += 1) +'"]').classList.add('-isShowed');
});
