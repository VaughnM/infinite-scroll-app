'use strict';

var infApp = infApp || {};

(function run() {
  infApp.settings = {
    api: {
      baseUrl: 'https://api.dribbble.com/v1',
      access_token: '3402bc128ab90bdc0d1ddab729be14c034154ba0fdca8bd1e0d8f230cac3d82c'
    }
  };
}());

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

'use strict';

var infApp = infApp || {};

(function run() {
  function favouriteShot(shotId) {
    var storage = window.localStorage;
    var favourites = storage.getItem('favourites');
    var newArray = [];

    if (!favourites) {
      newArray.push(shotId);
      return storage.setItem('favourites', JSON.stringify(newArray));
    }

    if (checkIfFavourite(shotId)) {
      return removeFromFavourites(shotId);
    }

    newArray = JSON.parse(favourites);
    newArray.push(shotId);
    toggleFavouriteCssClass(shotId);

    return storage.setItem('favourites', JSON.stringify(newArray));
  }

  function checkIfFavourite(shotId) {
    var storage = window.localStorage;
    var favourites = storage.getItem('favourites');
    var favouritesArr;
    var result = false;

    if (!favourites) { return false; }

    favouritesArr = JSON.parse(favourites);

    favouritesArr.forEach(function forEachLoop(favouriteItem) {
      if (favouriteItem === shotId) {
        result = true;
      }
    });

    return result;
  }

  function removeFromFavourites(shotId) {
    var storage = window.localStorage;
    var favourites = storage.getItem('favourites');
    var newArray = JSON.parse(favourites);
    var index = newArray.indexOf(shotId);

    if (index > -1) {
      newArray.splice(index, 1);
      toggleFavouriteCssClass(shotId);
    }

    return storage.setItem('favourites', JSON.stringify(newArray));
  }

  function toggleFavouriteCssClass(shotId) {
    var element = document.getElementById(shotId);

    element.classList.toggle('favourite');
  }

  infApp.favouriteShot = favouriteShot;
  infApp.checkIfFavourite = checkIfFavourite;
}());

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

'use strict';

var infApp = infApp || {};

(function run() {
  function prepLazyLoading() {
    window.addEventListener('DOMContentLoaded', lazyLoadImages);
    window.addEventListener('load', lazyLoadImages);
    window.addEventListener('resize', lazyLoadImages);
    window.addEventListener('scroll', lazyLoadImages);
    lazyLoadImages();
  }

  function lazyLoadImages() {
    var images = document.querySelectorAll('#shots-container img[data-src]');

    [].forEach.call(images, function forEachLoop(image) {
      if (isElementInViewport(image)) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.removeAttribute('data-src');
      }
    });
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  infApp.prepLazyLoading = prepLazyLoading;
}());

'use strict';

var infApp = infApp || {};

(function run() {
  function addMoreShotsOnScroll() {
    var body = document.body;
    var html = document.documentElement;

    var offset = window.pageYOffset;
    var iHeight = window.innerHeight;
    var wHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    // adding min offset to prevent double loading
    if (offset + iHeight === wHeight) {
      infApp.getShots({ page: infApp.pageCount + 1 });

      // remove listener to prevent adding the same shots twice
      document.removeEventListener('scroll', infApp.addMoreShotsOnScroll, false);
    }
  }

  infApp.addMoreShotsOnScroll = addMoreShotsOnScroll;

  // initial listener
  document.addEventListener('scroll', infApp.addMoreShotsOnScroll, false);
}());

'use strict';

var infApp = infApp || {};


(function run() {
  infApp.init = function init() {
    var axajOptions = {
      page: 1
    };
    var successCallback = function successCallback() {
      infApp.prepLazyLoading();
      infApp.addMoreShotsOnScroll();
    };

    infApp.getShots(axajOptions, successCallback);
  };

  // document.ready function
  if (document.readyState !== 'loading') {
    infApp.init();
  } else {
    document.addEventListener('DOMContentLoaded', infApp.init());
  }
}());


//# sourceMappingURL=scripts.js.map
