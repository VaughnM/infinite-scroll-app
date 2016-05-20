'use strict';

var infApp = infApp || {};

(function(){

  function prepLazyLoading() {
    // console.log('prepLazyLoading');
    window.addEventListener("DOMContentLoaded", lazyLoadImages);
    window.addEventListener("load", lazyLoadImages);
    window.addEventListener("resize", lazyLoadImages);
    window.addEventListener("scroll", lazyLoadImages);
    lazyLoadImages();
  }

    function lazyLoadImages() {
      var images = document.querySelectorAll("#shots-container img[data-src]"),
          item;

          console.warn(images);

          images[0].setAttribute("src",images[0].getAttribute("data-src"));
          images[0].removeAttribute("data-src");

      // images.forEach(function(image){
      //   if (isElementInViewport(image)) {
      //     image.setAttribute("src",image.getAttribute("data-src"));
      //     image.removeAttribute("data-src");
      //   }
      // });

      // if all the images are loaded, stop calling the handler
      // if (images.length === 0) {
      //   window.removeEventListener("DOMContentLoaded", lazyLoadImages);
      //   window.removeEventListener("load", lazyLoadImages);
      //   window.removeEventListener("resize", lazyLoadImages);
      //   window.removeEventListener("scroll", lazyLoadImages);
      // }
    }

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