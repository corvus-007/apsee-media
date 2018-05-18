window.mainNav = (function () {
  var $ = window.jQuery;
  var mainNav = document.querySelector('.main-nav');
  var mainNavToggle = document.querySelector('.main-nav-toggle');

  mainNavToggle.addEventListener('click', function (event) {
    event.preventDefault();
    $(mainNavToggle).toggleClass('main-nav-toggle--opened');
    $(mainNav).stop().slideToggle();
  });
})();
