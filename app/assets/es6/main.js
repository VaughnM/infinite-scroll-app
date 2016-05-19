var infApp = infApp || {};

(function() {
  if (document.readyState != 'loading'){
    infApp.getShots();
    // console.log(infApp.shots);
  } else {
    document.addEventListener('DOMContentLoaded', infApp.getShots());
    // console.info(infApp.shots);
  }
}());

