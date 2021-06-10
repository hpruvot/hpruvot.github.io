export default class Map {
  constructor() {
    let map = document.querySelector('.o-map');

    if (map.length <= 0) return;

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
      areaItem.querySelector('.o-country__close').addEventListener('click', () => {
        // Reset map style
        document.querySelector('.o-map').classList.remove('-open');

        // Reset areas + pins
        this.closeZone();
      });
    });

    // For each animal
    document.querySelectorAll('.o-country__animal').forEach((animalItem) => {
      // Handle click animal overlay
      animalItem.addEventListener('click', () => this.openAnimalOverlay(animalItem.dataset.name), false);
    });

    // For each back to region on animal overlay
    document.querySelectorAll('.o-animalOverlay').forEach((animalOverlay) => {
      animalOverlay.querySelector('.o-animalOverlay__closeRegion').addEventListener('click', () => this.closeAnimalOverlay(), false);
      animalOverlay.querySelector('.o-animalOverlay__closeHome').addEventListener('click', () => this.closeZone(), false);
    });
  }
  /**
   * openZone
   *
   * @param  {number} index
   */
  openZone(index) {
    // Add class on the map
    document.querySelector('.o-map').classList.add('-open');

    this.closeZone();

    // Add class on the pin
    document.querySelectorAll('.o-map__zoneItem')[index].classList.add('-open');

    // Remove all active classes and style of areas
    document.querySelectorAll('.o-map__contentItem').forEach((contentItem) => {
      contentItem.style.transform = "";
      contentItem.classList.remove('-open');
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
    // Remove all active classes and style of areas
    document.querySelectorAll('.o-map__contentItem').forEach((contentItem) => {
      contentItem.style.transform = "";
      contentItem.classList.remove('-open');
    });

    // Remove all active classes and style of pins
    document.querySelectorAll('.o-map__zoneItem').forEach((zoneItem) => {
      zoneItem.classList.remove('-open');
    });

    this.closeAnimalOverlay();
  }
  openAnimalOverlay(name) {
    const overlayToOpen = document.querySelector('.o-animalOverlay[data-name='+ name +']');
    overlayToOpen.classList.add('-open');
  }
  closeAnimalOverlay() {
    console.log('closeAnimalOverlay');
    document.querySelectorAll('.o-animalOverlay').forEach((animalOverlay) => {
      animalOverlay.classList.remove('-open');
    });
  }
}
