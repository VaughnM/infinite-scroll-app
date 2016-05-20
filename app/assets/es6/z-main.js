'use strict';

var infApp = infApp || {};


(function() {
  infApp.init = function() {
    infApp.getShots();
    infApp.addMoreShotsOnScroll();
    // infApp.prepLazyLoading();
  };

  if (document.readyState != 'loading'){
    infApp.init();

  } else {
    document.addEventListener('DOMContentLoaded', infApp.init());

  }
}());

