'use strict';

var infApp = infApp || {};

(function(){

  // creating a HTML template using a json object
  function prepTemplate(shot) {
    var t = "";

    // console.info(shot);

    t += '<figure class="shot" data-id="' + shot.id + '">' +
            '<figcaption class="shot-overlay">'+
              '<div class="shot-overlay-text">' +
                '<h2 class="shot-title">' + shot.title + '</h2>' +
                '<hr>' +
                '<p class="shot-author">' + shot.user.name + '</p>' +
              '</div>' +
              '<div class="shot-overlay-cta">' +
                '<button onclick="infApp.favouriteShot(' + shot.id + ')">Favourite</button>' +
              '</div>' +
            '</figcaption>' +
            '<img data-src="' + shot.images.teaser + '" alt="' + shot.title + '">' +
          '</figure>';

    return t;
  }

  function prepAllHtml(jsonObj) {

  }

  infApp.prepTemplate = prepTemplate;

}());