const Utils = require('./utils');

export default class Engineered {
  constructor(bloc) {
    this.bloc = document.querySelector(bloc);
    this.engineeredIconInterval = null;
    this.engineeredListInterval = null;

    if (this.bloc.length <= 0) return

    this.init();
  }

  init() {
    this.initEvents();
  }

  initEvents() {
    this.manageEngineeredList();
  }

  manageEngineeredList() {
    const engineeredIconLeft = document.querySelector('.mcam-block-engineered__arrow--left');
    const engineeredIconRight = document.querySelector('.mcam-block-engineered__arrow--right');

    if (engineeredIconRight) {
      engineeredIconRight.addEventListener('mouseover', () => this.scrollEngineeredList('left'));
      engineeredIconRight.addEventListener('mouseout', () => clearInterval(this.engineeredListInterval));
    }

    if (engineeredIconLeft) {
      engineeredIconLeft.addEventListener('mouseover', () => this.scrollEngineeredList('right'));
      engineeredIconLeft.addEventListener('mouseout', () => clearInterval(this.engineeredListInterval));
    }
  }

  scrollEngineeredList(scrollTo) {
    const engineeredDiv = document.querySelector('.mcam-block-engineered__content');
    const scrollMax = engineeredDiv.scrollWidth - engineeredDiv.clientWidth;
    const engineeredIconLeft = document.querySelector('.mcam-block-engineered__arrow--left');
    const engineeredIconRight = document.querySelector('.mcam-block-engineered__arrow--right');

    this.engineeredListInterval = Utils.scrollElement(scrollTo, engineeredDiv, 2);

    this.engineeredIconInterval = setInterval(() => {
      if (engineeredDiv.scrollLeft >= scrollMax) {
        engineeredIconRight.classList.add('hidden');
      } else {
        engineeredIconRight.classList.remove('hidden');
      }

      if (engineeredDiv.scrollLeft <= 0) {
        engineeredIconLeft.classList.add('hidden');
      } else {
        engineeredIconLeft.classList.remove('hidden');
      }
    }, 50);
  }
}