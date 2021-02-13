const videoHome = document.querySelector('.video.-home');
const videoMenace = document.querySelector('.video.-menace');
const instructions = document.querySelector('.instructions');
const interviewPrev = document.querySelector('.o-interview__tooltipPrev');
const interviewNext = document.querySelector('.o-interview__tooltipNext');

let interviewStep = 1;
let isHomeScreen = false;
let timeoutInMiliseconds = 90000; // 90 seconds
let timeoutId;

instructions.addEventListener('click', () => {
  instructions.classList.add('-isHidden');
  isHomeScreen = true;
  startTimer();
});

/**
 * Display popup
 */
document.querySelectorAll('.zone__item').forEach(item => {
  item.addEventListener('click', () => {
    // Not home => Reset timer
    isHomeScreen = false;
    resetTimer();

    // Show popup
    const index = item.getAttribute('data-zone');
    document.querySelector('[data-popup="'+ index +'"]').classList.add('-isShowed');

    // If popup 5
    if (index == 5) {
      // Play video
      videoMenace.currentTime = 0;
      videoMenace.play();
    }

    // If popup 6
    if (index == 6) {
      // Show first interview screen
      interviewStep = 1;
      document.querySelector('[data-interview="1"]').classList.add('-isShowed');
      // Set prev/next buttons
      showInterviewPrev(1);
      showInterviewNext(1);
    }
  });
});

/**
 * Back to home screen
 */
document.querySelectorAll('.popup__back').forEach(item => {
  item.addEventListener('click', () => {
    // Home => launch timer
    isHomeScreen = true;
    startTimer();

    // Hide all popup
    document.querySelectorAll('.popup__item').forEach(popup => {
      popup.classList.remove('-isShowed');
    });

    // Hide interview screens
    document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
      interview.classList.remove('-isShowed');
    });
  });
});

/**
 * Prev button on interview screens
 */
interviewPrev.addEventListener('click', () => {
  const prevIndex = interviewStep -= 1;
  document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
    interview.classList.remove('-isShowed');
  })
  document.querySelector('[data-interview="'+ prevIndex +'"]').classList.add('-isShowed');
  showInterviewPrev(prevIndex);
  showInterviewNext(prevIndex);
});

/**
 * Next button on interview screens
 */
interviewNext.addEventListener('click', () => {
  const nextIndex = interviewStep += 1;
  document.querySelectorAll('.o-interview__tooltipList').forEach(interview => {
    interview.classList.remove('-isShowed');
  })
  document.querySelector('[data-interview="'+ nextIndex +'"]').classList.add('-isShowed');
  showInterviewPrev(nextIndex);
  showInterviewNext(nextIndex);
});

/**
 * Handle video
 */
document.querySelector('.video.-menace').addEventListener('ended', () => {
  document.querySelector('[data-popup="5"]').classList.remove('-isShowed');
  videoMenace.currentTime = 0;
  isHomeScreen = true;
  startTimer();
});

const showInterviewPrev = (interviewIndex) => {
  if (interviewIndex === 1) {
    interviewPrev.classList.add('-isHidden');
  } else {
    interviewPrev.classList.remove('-isHidden');
  }
}

const showInterviewNext = (interviewIndex) => {
  if (interviewIndex === 7) {
    interviewNext.classList.add('-isHidden');
  } else {
    interviewNext.classList.remove('-isHidden');
  }
}

const startTimer = () => {
  timeoutId = window.setTimeout(() => {
    instructions.classList.remove('-isHidden');
  }, timeoutInMiliseconds)
}

const resetTimer = () => {
  window.clearTimeout(timeoutId);
  if(isHomeScreen) {
    startTimer();
  }
}

document.addEventListener("keypress", resetTimer, false);
document.addEventListener("touchmove", resetTimer, false);

