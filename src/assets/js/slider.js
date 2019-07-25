export default class Slider {
  constructor(container, slides, dots, titles, activeSlideIndex) {
    this.container = container;
    this.slides = document.querySelectorAll(slides);
    this.titles = document.querySelectorAll(titles);
    this.dots = document.querySelectorAll(dots);
    this.activeSlideIndex = activeSlideIndex;

    this.init()
  }

  init() {
    this.slides[0].classList.add('active');
    this.titles[0].classList.add('active');

    this.initEvents()
  }

  initEvents() {

    let autoSlide = setInterval(function () {
      this.handleSlider(this.activeSlideIndex);
    }.bind(this), 5000);

    // Foreach title
    [].slice.call(this.dots).forEach((dot, index) => {
      // check mouse over on title
      dot.addEventListener('click', () => {
        clearInterval(autoSlide);

        // remove current active class
        this.removeActiveClasses(this.dots);
        this.removeActiveClasses(this.slides);
        this.removeActiveClasses(this.titles);
        dot.classList.add('active');
        this.slides[index].classList.add('active');
        this.titles[index].classList.add('active');
        this.activeSlideIndex = index;
      });
    })
  }

  // Remove active class on each elements
  removeActiveClasses(elements) {
    [].slice.call(elements).forEach((element) => {
      element.classList.remove('active');
    });
  }

  handleSlider() {
    this.activeSlideIndex = this.activeSlideIndex += 1;

    if (this.activeSlideIndex === 3) {
      this.activeSlideIndex = 0;
    }

    this.removeActiveClasses(this.dots);
    this.removeActiveClasses(this.slides);
    this.removeActiveClasses(this.titles);
    this.dots[this.activeSlideIndex].classList.add('active');
    this.slides[this.activeSlideIndex].classList.add('active');
    this.titles[this.activeSlideIndex].classList.add('active');
  }
}