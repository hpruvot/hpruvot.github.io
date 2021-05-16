import '../styles/styles.scss';

import Map from './map';

const App = {
  init() {
    console.log('init')

    new Map();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

