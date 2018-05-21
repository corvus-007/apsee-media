'use strict';

window.util = (function () {
  return {
    KEYCODE_ESC: 27,
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
  'use strict';

  var $ = window.jQuery;
  var mainNav = document.querySelector('.main-nav');
  var mainNavToggle = document.querySelector('.main-nav-toggle');

  if (window.matchMedia("(max-width: 991px)").matches) {
    $(mainNav).stop().hide();
  }

  mainNavToggle.addEventListener('click', function (event) {
    event.preventDefault();
    $(mainNavToggle).toggleClass('main-nav-toggle--opened');
    $(mainNav).stop().slideToggle();
  });
})();

window.headerSearchForm = (function () {
  'use strict';

  var $ = window.jQuery;
  var headerSearchForm = document.querySelector('.header-search-form');
  var headerSearchFormInput = headerSearchForm.querySelector('.header-search-form__input');
  var headerSearchFormToggle = document.querySelector('.go-to-search__button');

  $(headerSearchForm).stop().hide();

  function onHeaderSearchFormEscPress(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideHeaderSearchForm();
    }
  }

  function showHeaderSearchForm() {
    headerSearchFormToggle.classList.add('go-to-search__button--opened');
    $(headerSearchForm).stop().slideDown();
    headerSearchFormInput.focus();
    document.addEventListener('keydown', onHeaderSearchFormEscPress);
  }

  function hideHeaderSearchForm() {
    headerSearchFormToggle.classList.remove('go-to-search__button--opened');
    $(headerSearchForm).stop().slideUp();
    headerSearchFormInput.blur();
    document.removeEventListener('keydown', onHeaderSearchFormEscPress);
  }

  headerSearchFormToggle.addEventListener('click', function (event) {
    event.preventDefault();
    if (headerSearchFormToggle.classList.contains('go-to-search__button--opened')) {
      hideHeaderSearchForm();
    } else {
      showHeaderSearchForm();
    }
  });
})();

