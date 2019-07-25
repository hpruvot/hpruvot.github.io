require('../icons/svgxuse.min');
require('./tarteaucitron.js');
import LazyLoad from "vanilla-lazyload";
import AOS from 'aos';

import Form from './form';
import Filters from './filters';
import Engineered from './engineered';


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

    let whitepaper = document.querySelector('.mcam-page--home .mcam-block-whitepaper');
    let whitepaperClose = document.querySelector('.mcam-page--home .mcam-block-whitepaper__close');

    if (whitepaper && whitepaperClose) {
      whitepaperClose.addEventListener('click', () => whitepaper.classList.add('hidden'));
    }

    new LazyLoad({
      threshold: 100
    });

    new Form();

    new Filters();

    if (document.querySelector('.mcam-block-engineered')) {
      new Engineered('.mcam-block-engineered');
    }

    AOS.init({
      disable: 'mobile'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
