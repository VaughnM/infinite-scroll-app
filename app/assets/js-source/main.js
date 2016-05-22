'use strict';

var infApp = infApp || {};

(function run() {
  infApp.init = function init() {
    var axajOptions = {
      page: 1
    };
    var successCallback = function successCallback() {
      infApp.lazyLoad.init();
      infApp.scroll.callForMoreShots();
    };

    infApp.ajax.get(axajOptions, successCallback);
  };

  // document.ready function
  if (document.readyState !== 'loading') {
    infApp.init();
  } else {
    document.addEventListener('DOMContentLoaded', infApp.init);
  }
}());

