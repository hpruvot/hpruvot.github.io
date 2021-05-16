export default class Map {
  constructor() {
    let map = document.querySelector('.o-map');

    if (map.length <= 0) return

    this.init();
  }

  init() {
    this.initEvents();
    console.log('map');
  }

  initEvents() {
    document.querySelectorAll('.o-map__zoneItem').forEach((zoneItem, index) => {
      zoneItem.addEventListener('click', () => this.openZone(index), false);
    })

    document.querySelector('.o-country__drag').addEventListener('touchstart', () => {
      console.log('drag');
    })
  }

  openZone(index) {
    console.log('click', index);
    // Add class to the parent
    document.querySelector('.o-map').classList.add('-open')

    // Remove all active classes
    document.querySelectorAll('.o-map__contentItem').forEach((contentItem, index) => {
      contentItem.classList.remove('-open')
    })

    // Add class active on the selected item
    document.querySelectorAll('.o-map__contentItem')[index].classList.add('-open')
  }
}
