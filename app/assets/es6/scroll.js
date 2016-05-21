'use strict';

var infApp = infApp || {};

(function(){
  function addMoreShotsOnScroll() {
    var body = document.body,
        html = document.documentElement;

    var offset = window.pageYOffset;
    var iHeight = window.innerHeight;
    var wHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    // console.log('offset: ' + offset +/* ' iHeight: ' + iHeight +
                // ' = ' + (offset + iHeight) +*/
                // '\nheight: ' + wHeight);

    // adding min offset to prevent double loading
    if (offset + iHeight === wHeight) {
      infApp.getShots({page:infApp.pageCount + 1});
      document.removeEventListener('scroll', infApp.addMoreShotsOnScroll, false);
    }

  };

  infApp.addMoreShotsOnScroll = addMoreShotsOnScroll;
  document.addEventListener('scroll', infApp.addMoreShotsOnScroll, false);
}());