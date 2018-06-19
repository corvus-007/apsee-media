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
  var gotToSearchIcons = document.querySelectorAll('.go-to-search__icon');

  $(headerSearchForm).stop().hide();

  function toggleSeachIcons() {
    for (var i = 0; i < gotToSearchIcons.length; i++) {
      gotToSearchIcons[i].classList.toggle('go-to-search__icon--hidden')
    }
  }

  function onHeaderSearchFormEscPress(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideHeaderSearchForm();
      toggleSeachIcons();
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

    toggleSeachIcons();
  });
})();

window.comments = (function () {
  'use strict';

  console.log('comments');

  var $ = window.jQuery;
  var commentsList = document.querySelector('.comments-list');

  if (!commentsList) {
    return;
  }

  var addCommentForm = document.querySelector('.add-comment-form');
  var commentTextarea = addCommentForm.querySelector('.add-comment-form__textarea')
  var commentTemplate = document.querySelector('#comment-template').content;

  function collectionCommentDataForm(form) {
    var dataForm = {
      username: 'mrnobody'
    };

    var commentTextarea = form.querySelector('.add-comment-form__textarea')

    dataForm.text = commentTextarea.value;
    dataForm.commentId = 'comment-' + Math.random().toFixed(10).slice(2);

    return dataForm;
  }

  addCommentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var dataCommentForm = collectionCommentDataForm(addCommentForm);
    $(commentsList).prepend(generateCommentElement(dataCommentForm));
  });

  function generateCommentElement(data) {
    var commentNode = commentTemplate.cloneNode(true);
    commentNode.querySelector('.comment').dataset.commentId = data.commentId;
    commentNode.querySelector('.comment__username').textContent = data.username;
    commentNode.querySelector('.comment__text').textContent = data.text;
    return commentNode;
  }

  $(commentsList).on('click', '.comment__reply', function (event) {
    event.preventDefault();
    var $currentComment = $(this).closest('.comment');
    var currentCommentId = $currentComment.data('comment-id');
    var $currentCommentBody = $currentComment.children('.comment__body');
    var $commentChild = $currentCommentBody.children('.comment__child');

    if (!$commentChild.length) {
      $commentChild = $('<div></div>', {
        class: 'comment__child'
      });
    }

    $currentCommentBody.append($commentChild);

    var commentReplyFormTemplate = addCommentForm.cloneNode(true);
    commentReplyFormTemplate.classList.remove('add-comment-form');
    commentReplyFormTemplate.classList.add('comment__reply-form');

    var inputParentCommentId = document.createElement('input');
    inputParentCommentId.type = 'hidden';
    inputParentCommentId.name = 'parentCommentId';
    inputParentCommentId.value = currentCommentId;
    commentReplyFormTemplate.appendChild(inputParentCommentId);

    $commentChild.append(commentReplyFormTemplate);

    commentReplyFormTemplate.addEventListener('submit', function (event) {
      event.preventDefault();

      var dataCommentForm = collectionCommentDataForm(commentReplyFormTemplate);
      var $commentsListChild = $commentChild.children('.comments-list');

      if (!$commentsListChild.length) {
        $commentsListChild = $('<ul></ul>', {
          class: 'comments-list comments-list--child'
        });
      }

      $commentChild.append($commentsListChild);

      $commentsListChild.append(generateCommentElement(dataCommentForm));
      $(commentReplyFormTemplate).remove();
    });
  });
})();
