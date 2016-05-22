'use strict';

var infApp = infApp || {};

(function run() {
  infApp.helpers = {
    toggleClass: toggleClass
  };

  function toggleClass(selector, className) {
    var el = document.querySelectorAll(selector);
    el[0].classList.toggle(className);
  }
}());
