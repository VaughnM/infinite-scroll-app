'use strict';

var infApp = infApp || {};

(function run() {
  infApp.lazyLoad = {
    init: init
  };

  function init() {
    window.addEventListener('DOMContentLoaded', _lazyLoad);
    window.addEventListener('load', _lazyLoad);
    window.addEventListener('resize', _lazyLoad);
    window.addEventListener('scroll', _lazyLoad);
    _lazyLoad();
  }

  function _lazyLoad() {
    var images = document.querySelectorAll('#shots-container img[data-src]');

    [].forEach.call(images, function forEachLoop(image) {
      if (_isElementInViewport(image)) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.removeAttribute('data-src');
      }
    });
  }

  function _isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}());
