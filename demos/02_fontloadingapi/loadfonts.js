'use strict';
(function() {
  if (sessionStorage.fontsLoaded) {
    document.documentElement.classList.remove('fonts-loading');
    document.documentElement.classList.add('fonts-active');
    return;
  } else {
    if ('fonts' in document) {
      loadFonts([
        document.fonts.load('1em NotoBold'),
        document.fonts.load('1em Charter'),
        document.fonts.load('1em Noto')
      ]);
    } else {
      loadScript('/js/fontfaceobserver.js', function() {
        var notobold = new FontFaceObserver('NotoBold');
        var charter = new FontFaceObserver('Charter');
        var noto = new FontFaceObserver('Noto');
        loadFonts(notobold.load(), charter.load(), noto.load());
      });
    }
    function loadScript(src, done) {
      var js = document.createElement('script');
      js.src = src;
      js.onload = function() {
        done();
      };
      js.onerror = function() {
        done(new Error('Failed to load script ' + src));
      };
      document.head.appendChild(js);
    }
    function loadFonts(fontPromises) {
      Promise.all(fontPromises)
        .then(function() {
          document.documentElement.classList.remove('fonts-loading');
          document.documentElement.classList.add('fonts-active');
          sessionStorage.fontsLoaded = true;
        })
        .catch(function(err) {
          console.error(err);
          document.documentElement.classList.remove('fonts-loading');
          document.documentElement.classList.add('fonts-inactive');
        });
    }
  }
})();
