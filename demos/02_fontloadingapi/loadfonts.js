'use strict';

(function() {
  // Not shown: polyfill
  // Only act if the Font Loading API is supported
  if ('fonts' in document) {
    Promise
      .all([
        document.fonts.load('700 1em Lato'),
        document.fonts.load('1em Noto Serif'),
      ])
      .then(function() {
        document.documentElement.classList.add('fonts-active');
        sessionStorage.fontsLoaded = true;
      })
      .catch(function(err) {
        // Debatable whether you want this
        console.error("Fonts could not be loaded ", err);
        document.documentElement.classList.add('fonts-inactive');
      });
  }
})();
