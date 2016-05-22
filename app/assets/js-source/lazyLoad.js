'use strict';

var infApp = infApp || {};

(function run() {
  function prepLazyLoading() {
    window.addEventListener('DOMContentLoaded', lazyLoadImages);
    window.addEventListener('load', lazyLoadImages);
    window.addEventListener('resize', lazyLoadImages);
    window.addEventListener('scroll', lazyLoadImages);
    lazyLoadImages();
  }

  function lazyLoadImages() {
    var images = document.querySelectorAll('#shots-container img[data-src]');

    [].forEach.call(images, function forEachLoop(image) {
      if (isElementInViewport(image)) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.removeAttribute('data-src');
      }
    });
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  infApp.prepLazyLoading = prepLazyLoading;
}());
