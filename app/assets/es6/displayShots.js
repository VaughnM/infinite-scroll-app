var infApp = infApp || {};

(function(){

  // creating a HTML template using a json object
  function prepTemplate(item) {
    var template = "";

    template += '<img src="' + item.images.normal + '" alt="' + item.title +'" style="max-widht:100%;">';

    return template;
  }

  function prepAllHtml(jsonObj) {

  }

  infApp.prepTemplate = prepTemplate;

}());