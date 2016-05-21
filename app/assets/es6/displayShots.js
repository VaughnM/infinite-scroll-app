'use strict';

var infApp = infApp || {};

(function(){

  // creating a HTML template using a json object
  function prepTemplate(shot) {
    var t = "";
    var favourite = infApp.checkIfFavourite(shot.id) ? ' favourite' : '';
    var pixelRation = window.devicePixelRatio;
    var imageUrl = window.devicePixelRatio > 1 && shot.images.hidpi
                    ? shot.images.hidpi
                    : shot.images.normal;

    t += '<figure class="shot'+ favourite +'" id="' + shot.id + '">' +
            '<figcaption class="shot-overlay">'+
              '<div class="shot-overlay-text">' +
                '<h2 class="shot-title">' + shot.title + '</h2>' +
                '<hr>' +
                '<p class="shot-author">' + shot.user.name + '</p>' +
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

  function prepAllHtml(jsonObj) {

  }

  infApp.prepTemplate = prepTemplate;

}());