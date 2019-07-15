module.exports = {
  insertParam: function (key, value) {
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i = kvp.length; var x; while (i--) {
      x = kvp[i].split('=');

      if (x[0] == key) {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
      }
    }

    if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
  },
  
  removeHash: function() {
    if (history.pushState) {
      history.pushState(null, null, '#');
    }
    else {
      location.hash = '#';
    }
  },

  scrollElement: function (scrollTo, el, value) {
    const interval = setInterval(() => {
      switch (scrollTo) {
        case 'left':
          el.scrollLeft += value;
          break;
        case 'right':
          el.scrollLeft -= value;
          break;
        case 'top':
          el.scrollTop += value;
          break;
        case 'bottom':
          el.scrollTop -= value;
          break;
      }
    }, 5);

    return interval;
  },
};
