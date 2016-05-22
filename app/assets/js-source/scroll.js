'use strict';

var infApp = infApp || {};

(function run() {
  infApp.scroll = {
    callForMoreShots: callForMoreShots
  };

  function callForMoreShots() {
    var body = document.body;
    var html = document.documentElement;

    var offset  = window.pageYOffset;
    var iHeight = window.innerHeight;
    var wHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    // adding min offset to prevent double loading
    if (offset + iHeight === wHeight) {
      infApp.ajax.get({ page: infApp.pageCount + 1 });

      // remove listener to prevent adding the same shots twice
      document.removeEventListener('scroll', infApp.scroll.callForMoreShots, false);
    }
  }
}());
