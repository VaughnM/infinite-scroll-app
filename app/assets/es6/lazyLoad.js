'use strict';

var infApp = infApp || {};

(function(){

  function prepLazyLoading() {
    window.addEventListener("DOMContentLoaded", lazyLoadImages);
    window.addEventListener("load", lazyLoadImages);
    window.addEventListener("resize", lazyLoadImages);
    window.addEventListener("scroll", lazyLoadImages);
    lazyLoadImages();
  }

  function lazyLoadImages() {
    var images = document.querySelectorAll("#shots-container img[data-src]"),
        item;

    [].forEach.call(images, function(image, index) {
      if (isElementInViewport(image)) {
        console.log('image ' + index + ' loading.. ');
        image.setAttribute("src",image.getAttribute("data-src"));
        image.removeAttribute("data-src");
      }
    })
  };

  function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

  infApp.prepLazyLoading = prepLazyLoading;


}());