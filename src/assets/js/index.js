require('../icons/svgxuse.min');
require('./tarteaucitron.js');
import AOS from 'aos';

import Form from './form';
import Slider from './slider';
import Filters from './filters';


const App = {
  init() {
    // test for touch events support and if not supported, attach .no-touch class to the HTML tag.
    if (!("ontouchstart" in document.documentElement)) {
      document.documentElement.className += " no-touch";
    }

    let browser = window.navigator.userAgent;
    let ie = browser.indexOf("MSIE ");

    if (ie > 0 || !!window.MSInputMethodContext && !!document.documentMode) {
      document.documentElement.className += " ie";
    }

    new Form();

    new Filters();

    if (document.querySelector('.mcam-section-homeslider__list')) {
      new Slider('.mcam-section-homeslider__list', '.mcam-section-homeslider__item', '.mcam-section-homeslider__bullet', '.mcam-section-homeslider__title', 0);
    }

    AOS.init({
      disable: 'mobile'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
