const swiper = new Swiper('.accessories__slider', {
  loop: true,
   slidesPerView: 3,
        spaceBetween: 40,

  navigation: {
    nextEl: '.accessories__arrow--next',
    prevEl: '.accessories__arrow--prev',
  },
});



const swiperReviews = new Swiper('.reviews__slider', {
  loop: true,
   slidesPerView: 8,
        spaceBetween: 16,

  navigation: {
    nextEl: '.reviews__arrow--next',
    prevEl: '.reviews__arrow--prev',
  },
    pagination: {
          el: '.reviews__pagination',
          type: 'fraction',
        },
}); 
