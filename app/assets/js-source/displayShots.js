'use strict';

var infApp = infApp || {};

(function run() {
  // creating a HTML template using a json object
  function prepTemplate(shot) {
    var t = '';
    var favourite = infApp.checkIfFavourite(shot.id) ? ' favourite' : '';
    // serving 2x images only when device pixel ration can handle them
    var imageUrl = window.devicePixelRatio > 1 && shot.images.hidpi
                    ? shot.images.hidpi
                    : shot.images.normal;

    t += '<figure class="shot' + favourite + '" id="' + shot.id + '">' +
            '<figcaption class="shot-overlay">' +
              '<div class="shot-overlay-text">' +
                '<h2 class="shot-title">' +
                  '<a href="' + shot.html_url + '" target="_blank">' + shot.title + '</a>' +
                '</h2>' +
                '<hr>' +
                '<a class="shot-author" href="' + shot.user.html_url + '" target="_blank">' + shot.user.name + '</a>' +
                '<span class="favourite-heart"></span>' +
              '</div>' +
              '<div class="shot-overlay-cta">' +
                '<button onclick="infApp.favouriteShot(' + shot.id + ')">Favourite</button>' +
              '</div>' +
            '</figcaption>' +
            '<img data-src="' + imageUrl + '" alt="' + shot.title + '">' +
          '</figure>';

    return t;
  }

  infApp.prepTemplate = prepTemplate;
}());
