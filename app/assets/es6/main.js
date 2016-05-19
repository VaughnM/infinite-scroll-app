var infApp = infApp || {};

(function() {
  if (document.readyState != 'loading'){
    infApp.getShots();
  } else {
    document.addEventListener('DOMContentLoaded', infApp.getShots());
  }
}());

