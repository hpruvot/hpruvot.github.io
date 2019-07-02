export default class Form {
  constructor() {
    let forms = document.querySelectorAll('form');

    if (forms.length < 1) return

    this.init()
  }

  init() {
    this.initEvents()
  }

  initEvents() {
    // Foreach fieldset
    [].slice.call(document.querySelectorAll('.mcam-fieldset')).forEach((fieldsetEl) => {
      // Find the input
      let inputEl = fieldsetEl.querySelector('.mcam-fieldset__input');

      if (inputEl) {
        // In case the input is already filled
        if (inputEl.value !== '') {
          inputEl.classList.add('filled');
        }

        // Events:
        inputEl.addEventListener('focus', (e) => this.onInputFocus(e, inputEl));
        inputEl.addEventListener('blur', (e) => this.onInputBlur(e, inputEl));
      }
    });
  }

  // On focus
  onInputFocus(e, inputEl) {
    e.preventDefault();
    inputEl.classList.add('filled')
  }

  // On focus out 
  onInputBlur(e, inputEl) {
    e.preventDefault();

    // If the input is filled
    if (e.target.value.trim() === '') {
      inputEl.classList.remove('filled')
    }
  }
}