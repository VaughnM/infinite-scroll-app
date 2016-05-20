'use strict';

var infApp = infApp || {};

(function(){

infApp.settings = {
  api: {
    baseUrl: 'https://api.dribbble.com/v1',
    access_token: '3402bc128ab90bdc0d1ddab729be14c034154ba0fdca8bd1e0d8f230cac3d82c'
  }
};

}());
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
'use strict';

var infApp = infApp || {};

(function(){

  function getShots(options){
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


        // callbacks
        infApp.prepLazyLoading();

        // console.debug(infApp.pageCount);

      } else {
        console.error(request.responseText);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.error("Something went wrong with API request");
    };

    request.send();
  };


  infApp.getShots = getShots;

}());
'use strict';

var infApp = infApp || {};

(function(){

  function prepLazyLoading() {
    // console.log('prepLazyLoading');
    window.addEventListener("DOMContentLoaded", lazyLoadImages);
    window.addEventListener("load", lazyLoadImages);
    window.addEventListener("resize", lazyLoadImages);
    window.addEventListener("scroll", lazyLoadImages);
    lazyLoadImages();
  }

    function lazyLoadImages() {
      var images = document.querySelectorAll("#shots-container img[data-src]"),
          item;

          console.warn(images);

          images[0].setAttribute("src",images[0].getAttribute("data-src"));
          images[0].removeAttribute("data-src");

      // images.forEach(function(image){
      //   if (isElementInViewport(image)) {
      //     image.setAttribute("src",image.getAttribute("data-src"));
      //     image.removeAttribute("data-src");
      //   }
      // });

      // if all the images are loaded, stop calling the handler
      // if (images.length === 0) {
      //   window.removeEventListener("DOMContentLoaded", lazyLoadImages);
      //   window.removeEventListener("load", lazyLoadImages);
      //   window.removeEventListener("resize", lazyLoadImages);
      //   window.removeEventListener("scroll", lazyLoadImages);
      // }
    }

  function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

  infApp.prepLazyLoading = prepLazyLoading;


}());
(function(){
 console.log('I can use es6 magic now!');

  var apiUrl = 'https://api.dribbble.com/v1'
  var accessToken = "3402bc128ab90bdc0d1ddab729be14c034154ba0fdca8bd1e0d8f230cac3d82c";

  var request = new XMLHttpRequest();
  request.open('GET', apiUrl + '/shots/?access_token=' + accessToken, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
          console.log(data);
    } else {
      // We reached our target server, but it returned an error

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

} ());
'use strict';

var infApp = infApp || {};

(function(){
  function addMoreShotsOnScroll() {
    var body = document.body,
        html = document.documentElement;

        console.info(document.body.scrollHeight)

    var offset = window.pageYOffset;
    var iHeight = window.innerHeight;
    var wHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    // console.log('offset: ' + offset +
    //             '\nheight: ' + wHeight);

    // adding min offset to prevent double loading
    if (offset > wHeight && offset + iHeight === wHeight) {
      console.info('reached the bottom');
      infApp.getShots({page:infApp.pageCount + 1});
    }

  };

  window.onscroll = addMoreShotsOnScroll;

  infApp.addMoreShotsOnScroll = addMoreShotsOnScroll;
}());
'use strict';

var infApp = infApp || {};


(function() {
  infApp.init = function() {
    infApp.getShots();
    infApp.addMoreShotsOnScroll();
    // infApp.prepLazyLoading();
  };

  if (document.readyState != 'loading'){
    infApp.init();

  } else {
    document.addEventListener('DOMContentLoaded', infApp.init());

  }
}());


//# sourceMappingURL=scripts.js.map
