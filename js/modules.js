'use strict';

window.util = (function () {
  return {
    setMaxHeight: function (selector) {
      var maxHeight;
      var elements = document.querySelectorAll(selector);

      if (!elements.length) {
        return;
      }

      maxHeight = Array.from(elements).reduce(function findMaxHeight(prevValue, element) {
        var currentValue = element.offsetHeight;
        return (prevValue > currentValue) ? prevValue : currentValue;
      }, 0);

      Array.from(elements).forEach(function specifyMaxHeight(it) {
        it.style.height = maxHeight + 'px';
      });
    }
  }
})();

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

