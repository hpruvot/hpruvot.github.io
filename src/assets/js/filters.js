const Utils = require('./utils');

export default class Filters {
  constructor() {
    let filters = document.querySelectorAll('[data-filter]');

    if (filters.length <= 0) return

    this.init();
  }

  init() {
    this.initEvents()
  }
  
  initEvents() {
    let filters = document.querySelectorAll('[data-filter]');
    let products = document.querySelectorAll('.mcam-card-product');
    let more = document.querySelector('.mcam-layout-section--more');
    
    // If page contains already a filter hash
    if (document.location.hash) {
      // Get the value
      let filterHash = document.location.hash.substr(1).split('#')[0];

      // Get the corresponding element
      let filterElement = document.querySelector('.mcam-block-tab[data-filter=' + filterHash + ']');
  
      // Apply filter
      this.filterProducts(null, filters, filterElement, products, more)
    }

    // For each filter on the solution page
    for (var filter of filters) {
      // Handle click and apply filter
      filter.addEventListener('click', (e) => this.filterProducts(e, filters, e.currentTarget, products, more));
    }
  }

  // On focus
  filterProducts(e, filters, filter, products, more) {
    // We get all the detail sections
    let details = more.querySelectorAll('.mcam-section-more');

    // If on click it's already selected
    if (filter.classList.contains('selected')) {
      // We reset the filters (= all)
      this.resetFilter(e, filters, products, more);
      return;
    }
    
    // for each filters
    [].slice.call(filters).forEach((filter) => {
      // we first remove the selected current class
      filter.classList.remove('selected');
    });
    
    // Then we get the filter value
    let filterValue = filter.getAttribute('data-filter');
    
    // We display the know more section
    more.classList.remove('hidden');

    // for each detail section
    [].slice.call(details).forEach((detail) => {
      // we hide the sections
      detail.classList.add('hidden');
      
      // And show the corresponding detail section
      if(detail.classList.contains(filterValue)) {
        detail.classList.remove('hidden');
      }
    });
    
    // Then for each products
    [].slice.call(products).forEach((product) => {
      // if the product contains the filter value
      if (product.classList.contains(filterValue)) {
        // we show it
        product.style.display = '';
        // we apply the selected class to the filter
        filter.classList.add('selected');
      }
      // else we hide the product
      else {
        product.style.display = 'none';
      }
    })
  }

  resetFilter(e, filters, products, more) {
    e ? e.preventDefault() : null;

    // We unselect the filter
    [].slice.call(filters).forEach((filter) => {
      filter.classList.remove('selected');
    });

    // We show the all the products
    [].slice.call(products).forEach((product) => {
      product.style.display = '';
    });

    // Then we hide the know more section
    more.classList.add('hidden');

    // Finally we remove the hash from URL
    Utils.removeHash();
  }
}