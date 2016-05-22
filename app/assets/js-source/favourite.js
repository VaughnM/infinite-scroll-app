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
