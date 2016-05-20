'use strict';

var infApp = infApp || {};

(function(){

  function getShots(options, successCallback, failureCallback){
    var request = new XMLHttpRequest();

    var options = options || {};
    var endPoint = options.endPoint || '/shots/';
    var page = options.page || '1';
    var perPage = options.perPage || '10';

    var requestUrl = infApp.settings.api.baseUrl +
                      endPoint +
                      '?page=' +
                      page +
                      '&per_page=' +
                      perPage +
                      '&access_token=' +
                      infApp.settings.api.access_token;


    request.open('GET', requestUrl , true);

    request.onload = function() {
      var html = [];
      var htmlString;

      if (request.status >= 200 && request.status < 400) {
        infApp.shots = JSON.parse(request.responseText);

        console.debug(infApp.shots);

        infApp.shots.forEach(function(item){
          html.push(infApp.prepTemplate(item));
        });

        htmlString = html.join('');

        document.getElementById('shots-container').innerHTML += htmlString;

        infApp.pageCount = (infApp.pageCount += 1) || 1;


        if (successCallback && typeof successCallback === 'function') {
          successCallback();
        }

      } else {
        console.error(request.responseText);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.error("Something went wrong with API request");
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback();
      }

    };

    request.send();
  };


  infApp.getShots = getShots;

}());