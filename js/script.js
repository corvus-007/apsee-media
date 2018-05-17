document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $('.top-news-carousel').flickity({
    wrapAround: true,
    prevNextButtons: false,
    autoPlay: true,
    contain: true,
    cellSelector: '.top-news-carousel__item'
  });
});
