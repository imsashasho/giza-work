
const swiper = new Swiper('.projects-swiper', {
  grabCursor: true,
  loop: true,
  keyboard: true,
  spaceBetween: 20,
  initialSlide: 1,
  preloadImages: false,
  lazy: true,
  watchSlidesVisibility: true,
  centeredSlides: true,
  speed: 1600,

  breakpoints: {
    1366: {
      spaceBetween: 20,
      // autoHeight: true,
      slidesPerView: 3,
      loop: true,
    },
    768: {
      spaceBetween: 10,
      slidesPerView: 2,
      centeredSlides: true,
    },
    360: {
      spaceBetween: 0,
      slidesPerView: 1.35,
      centeredSlides: true,
      autoHeight: true,
    },
  },
  simulateTouch: true,
  navigation: {
    nextEl: document.querySelector('.projects-swiper-button-next'),
    prevEl: document.querySelector('.projects-swiper-button-prev'),
  },
  //   pagination: {
  //     el: '.news-slider__pagination',
  //     clickable: true,
  //     type: 'progressbar',
  //   },
});

// paralax('[img-paralax]', '', 20);
