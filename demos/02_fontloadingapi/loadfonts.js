// NOTE: Use this inline in your <head>
// NOTE: Do not forget to inline the @font-face declaration as <style> in <head>
// Not shown: polyfill, see loadfonts-full.js

'use strict';

(function() {
  // Optimisation for Repeat Views
  if (sessionStorage.fontsLoaded) {
    document.documentElement.classList.add('fonts-active');
    return;
  }

  // Only act if the Font Loading API is supported
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load('700 1em Lato'),
      document.fonts.load('1em Noto Serif')
    ])
      .then(function() {
        document.documentElement.classList.add('fonts-active');
        sessionStorage.fontsLoaded = true;
      })
      .catch(function(err) {
        // Debatable whether you want this
        console.error('Fonts could not be loaded ', err);
        document.documentElement.classList.add('fonts-inactive');
      });
  } else {
    // If no Font Loading API, use browser behaviour
    document.documentElement.classList.add('fonts-active');
  }
})();
