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
