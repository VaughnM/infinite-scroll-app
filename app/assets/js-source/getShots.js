'use strict';

var infApp = infApp || {};

(function run() {
  infApp.ajax = {
    get: get
  };

  function get(ajaxOptions, successCallback, failureCallback) {
    var request  = new XMLHttpRequest();

    var options    = ajaxOptions || {};
    var endPoint   = options.endPoint || '/shots/';
    var page       = options.page || '1';
    var perPage    = options.perPage || '10';

    var requestUrl = infApp.settings.api.baseUrl +
                      endPoint +
                      '?page=' +
                      page +
                      '&per_page=' +
                      perPage +
                      '&access_token=' +
                      infApp.settings.api.access_token;

    request.open('GET', requestUrl, true);

    // hide preloader animation
    infApp.helpers.toggleClass('#main-preloader', 'hidden');

    // hide add more shots button to prevent double loading
    infApp.helpers.toggleClass('#get-more-shots', 'hidden');

    // define callbacks
    request.addEventListener('load', function onLoad() {
      _success(request, successCallback);
    });
    request.addEventListener('error', function onError() {
      _error(request, failureCallback);
    });

    request.send();
  }

  function _success(request, callback) {
    var html = [];
    var htmlString;

    if (request.status >= 200 && request.status < 400) {
      infApp.shots = JSON.parse(request.responseText);

      infApp.shots.forEach(function forEachLoop(item) {
        html.push(infApp.template.prepare(item));
      });

      htmlString = html.join('');

      document.getElementById('shots-container').innerHTML += htmlString;

      infApp.pageCount = (infApp.pageCount += 1) || 1;
      infApp.helpers.toggleClass('#main-preloader', 'hidden');
      infApp.helpers.toggleClass('#get-more-shots', 'hidden');

      document.addEventListener('scroll', infApp.scroll.callForMoreShots, false);

      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }

  function _error(request, callback) {
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
}());
