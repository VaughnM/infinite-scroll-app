'use strict';

var infApp = infApp || {};


(function() {
  infApp.init = function() {
    var axajOptions = {
      page: 1
    };
    var successCallback = function() {
      console.log('successCallback')
      infApp.prepLazyLoading();
      infApp.addMoreShotsOnScroll();
    };

    infApp.getShots(axajOptions, successCallback);
  };

  if (document.readyState != 'loading'){
    infApp.init();

  } else {
    document.addEventListener('DOMContentLoaded', infApp.init());

  }
}());

