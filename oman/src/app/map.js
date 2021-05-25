export default class Map {
  constructor() {
    let map = document.querySelector('.o-map');

    if (map.length <= 0) return

    this.init();
  }

  init() {
    this.initEvents();
  }
  /**
   * initEvents
   */
  initEvents() {
    // For each map pin
    document.querySelectorAll('.o-map__zoneItem').forEach((zoneItem, index) => {
      // Handle click open
      zoneItem.addEventListener('click', () => this.openZone(index), false);
    });

    // For each area
    document.querySelectorAll('.o-map__contentItem').forEach((areaItem) => {
      // Handle click close
      areaItem.querySelector('.o-country__close').addEventListener('click', () => this.closeZone(), false);
    });
  }
  /**
   * openZone
   *
   * @param  {number} index
   */
  openZone(index) {
    // Add class on the map
    document.querySelector('.o-map').classList.add('-open')

    // Remove all active classes and style of areas
    document.querySelectorAll('.o-map__contentItem').forEach((contentItem) => {
      contentItem.style.transform = "";
      contentItem.classList.remove('-open')
    });

    // Add class active on the selected item
    document.querySelectorAll('.o-map__contentItem')[index].classList.add('-open');

    // Handle touch move
    document.querySelectorAll('.o-map__contentItem')[index].querySelector('.o-country__drag').addEventListener('touchmove', (ev) => {
      // If swipe left
      if (ev.targetTouches[0].clientX % 2 && ev.targetTouches[0].clientX < 835) {
        // Translate zone
        document.querySelector('.o-map__contentItem.-open').style.transform = "translateX("+ ev.targetTouches[0].clientX +"px)";
      }
    });

    // Handle touch end
    document.querySelectorAll('.o-map__contentItem')[index].querySelector('.o-country__drag').addEventListener('touchend', (ev) => {
      if (ev.changedTouches[0].clientX < 420) {
        // Open zone
        document.querySelector('.o-map__contentItem.-open').style.transform = "translateX(0px)";
      } else {
        // Close zone
        document.querySelector('.o-map__contentItem.-open').style.transform = "translateX(835px)";
      }
    });
  }
  closeZone() {
    // Remove class of the map
    document.querySelector('.o-map').classList.remove('-open')

    // Remove all active classes and style of areas
    document.querySelectorAll('.o-map__contentItem').forEach((contentItem) => {
      contentItem.style.transform = "";
      contentItem.classList.remove('-open')
    });
  }
}
