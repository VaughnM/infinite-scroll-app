'use strict';

var infApp = infApp || {};

(function(){

  // creating a HTML template using a json object
  function prepTemplate(item) {
    var template = "";

    template += '<img data-src="' + item.images.normal + '" alt="' + item.title +'">';

    return template;
  }

  function prepAllHtml(jsonObj) {

  }

  infApp.prepTemplate = prepTemplate;

}());