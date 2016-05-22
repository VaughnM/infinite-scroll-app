'use strict';

var infApp = infApp || {};

(function run() {
  function getShots(options, successCallback, failureCallback) {
    var request = new XMLHttpRequest();

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

    request.open('GET', requestUrl, true);
    toggleMainPreloader();

    request.onload = function onload() {
      var html = [];
      var htmlString;

      if (request.status >= 200 && request.status < 400) {
        infApp.shots = JSON.parse(request.responseText);

        infApp.shots.forEach(function forEachLoop(item) {
          html.push(infApp.prepTemplate(item));
        });

        htmlString = html.join('');

        document.getElementById('shots-container').innerHTML += htmlString;

        infApp.pageCount = (infApp.pageCount += 1) || 1;
        toggleMainPreloader();
        document.addEventListener('scroll', infApp.addMoreShotsOnScroll, false);

        if (successCallback && typeof successCallback === 'function') {
          successCallback();
        }
      }
    };

    request.onerror = function onerror() {
      // There was a connection error of some sort
      if (failureCallback && typeof failureCallback === 'function') {
        failureCallback();
      }
    };

    request.send();
  }

  function toggleMainPreloader() {
    var element = document.getElementById('main-preloader');

    element.classList.toggle('hidden');
  }

  infApp.getShots = getShots;
}());
