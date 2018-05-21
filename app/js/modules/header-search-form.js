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
