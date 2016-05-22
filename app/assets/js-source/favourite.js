'use strict';

var infApp = infApp || {};

(function run() {
  infApp.favourites = {
    toggle: toggle,
    isFavourite: isFavourite
  };

  function toggle(shotId) {
    var storage = window.localStorage;
    var favourites = storage.getItem('favourites');
    var newArray = [];

    if (!favourites) {
      newArray.push(shotId);
      return storage.setItem('favourites', JSON.stringify(newArray));
    }

    if (isFavourite(shotId)) {
      return _remove(shotId);
    }

    newArray = JSON.parse(favourites);
    newArray.push(shotId);
    infApp.helpers.toggleClass('#shotId-' + shotId, 'favourite');

    return storage.setItem('favourites', JSON.stringify(newArray));
  }

  function isFavourite(shotId) {
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

  function _remove(shotId) {
    var storage = window.localStorage;
    var favourites = storage.getItem('favourites');
    var newArray = JSON.parse(favourites);
    var index = newArray.indexOf(shotId);

    if (index > -1) {
      newArray.splice(index, 1);
      infApp.helpers.toggleClass('#shotId-' + shotId, 'favourite');
    }

    return storage.setItem('favourites', JSON.stringify(newArray));
  }
}());
