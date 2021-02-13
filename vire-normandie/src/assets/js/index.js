let interviewStep = 1;

document.querySelectorAll('.zone__item').forEach(item => {
  item.addEventListener('click', () => {
    const index = item.getAttribute('data-zone');
    document.querySelector('[data-popup="'+ index +'"]').classList.add('-isShowed');
    if (index == 6) {
      document.querySelector('[data-interview="1"]').classList.add('-isShowed');
      showInterviewPrev(1);
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

document.querySelector('.o-interview__tooltipPrev').addEventListener('click', () => {
  const prevIndex = interviewStep -= 1;
  document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
    interview.classList.remove('-isShowed');
  })
  document.querySelector('[data-interview="'+ prevIndex +'"]').classList.add('-isShowed');
  showInterviewPrev(prevIndex);
  showInterviewNext(prevIndex);
});

document.querySelector('.o-interview__tooltipNext').addEventListener('click', () => {
  const nextIndex = interviewStep += 1;
  document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
    interview.classList.remove('-isShowed');
  })
  document.querySelector('[data-interview="'+ nextIndex +'"]').classList.add('-isShowed');
  showInterviewPrev(nextIndex);
  showInterviewNext(nextIndex);
});

const showInterviewPrev = (interviewIndex) => {
  const prevInterviewElement = document.querySelector('.o-interview__tooltipPrev');
  if (interviewIndex === 1) {
    prevInterviewElement.classList.add('-isHidden');
  } else {
    prevInterviewElement.classList.remove('-isHidden');
  }
}

const showInterviewNext = (interviewIndex) => {
  const nextInterviewElement = document.querySelector('.o-interview__tooltipNext');
  if (interviewIndex === 7) {
    nextInterviewElement.classList.add('-isHidden');
  } else {
    nextInterviewElement.classList.remove('-isHidden');
  }
}
