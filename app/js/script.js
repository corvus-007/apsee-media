document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $('.top-news-carousel').flickity({
    // options
    wrapAround: true,
    contain: true,
    cellSelector: '.top-news-carousel__item'
  });
});
