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