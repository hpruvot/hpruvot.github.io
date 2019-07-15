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

    // Get country select and zipcode input
    let inputCountry = document.querySelector('#mcam-fieldset-country select');
    let inputZipcode = document.querySelector('#mcam-fieldset-zipcode');

    if (inputCountry && inputZipcode) {
      inputCountry.addEventListener('change', (e) => this.changeCountry(e, inputZipcode));
    }
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

  changeCountry(e, inputZipcode) {
    e.preventDefault();
    // If USA or Germany is selected
    if (e.target.value === 'United States of America' || e.target.value === 'Germany') {
      // We display the zipcode inpute
      inputZipcode.classList.remove('hidden')
    } else {
      // Else we hide it
      inputZipcode.classList.add('hidden')
    }
  }
}