'use strict';

var infApp = infApp || {};

(function(){

  // creating a HTML template using a json object
  function prepTemplate(shot) {
    var t = "";

    console.info(shot);

    t += '<figure class="shot" data-id="' + shot.id + '">' +
            '<figcaption class="shot-overlay">'+
              '<h2 class="shot-title">' + shot.title + '</h2>' +
              '<hr>' +
              '<p>' + shot.user.name + '</p>' +
              '<button onclick="infApp.favouriteShot(' + shot.id + ')">Favourite</button>' +
            '</figcaption>' +
            '<img data-src="' + shot.images.normal + '" alt="' + shot.title + '">' +
          '</figure>';

    return t;
  }

  function prepAllHtml(jsonObj) {

  }

  infApp.prepTemplate = prepTemplate;

}());