import { fadeUpLines, splitToLines } from '../modules/effects/animationHelpers';

const prevIndex = 0;
const swiper1 = new Swiper('.news-gallery-swiper', {
  grabCursor: true,
  loop: true,
  keyboard: true,
  spaceBetween: 10,
  // initialSlide: 0,
  preloadImages: false,
  lazy: true,
  height: 600,
  centeredSlides: false,
  watchSlidesVisibility: true,
  allowTouchMove: false,
  speed: 1400,
  on: {
    init: e => {
      let { slides } = e;
      slides = slides.filter(el => !el.classList.contains('swiper-slide-duplicate'));
      document.querySelector('.news .news-slides-nav__index-total').textContent = slides.length;
    },
    beforeTransitionStart: e => {
      // console.log(e);
      // console.log(prevIndex, e.realIndex);
      // console.log((prevIndex < e.realIndex) ? 'next' : 'prev');
      // const direction = e.touches.startX > e.touches.currentX ? 'forward' : 'backward';
      // console.log(direction);
      // // debugger
      // const item = document.querySelector('.advantages-slider .swiper-slide-prev img');
      // item.style.transition = '.1s ease-out';
      // item.style.opacity = 0;
      // setTimeout(() => {
      //   item.style.opacity = 1;
      // }, 1000);
      // prevIndex = e.realIndex;
    },
    activeIndexChange: e => {
      // console.log(e);
      document.querySelector('.news-slides-nav__index-current').textContent = e.realIndex + 1;
    },
  },
  breakpoints: {
    1400: {
      autoHeight: true,
      slidesPerView: 2,
    },
    768: {
      initialSlide: 1,
      autoHeight: true,
      slidesPerView: 1.2,
      centeredSlides: false,
    },
    360: {
      spaceBetween: 0,
      slidesPerView: 1,
      autoHeight: true,
      centeredSlides: false,
    },
  },
  simulateTouch: true,
  navigation: {
    nextEl: '.news-swiper-button-next',
    prevEl: '.news-swiper-button-prev',
  },
  pagination: {
    el: '.news-gallery__pagination',
    clickable: true,
    type: 'progressbar',
  },
});
document.querySelector('.news-swiper-button-next').addEventListener('click', evt => {
  const item = document.querySelector('.news-gallery-swiper .swiper-slide-prev img');
  item.style.transition = '.1s ease-out';
  item.style.opacity = 0;
  setTimeout(() => {
    item.style.opacity = '';
  }, 1000);
});
document.querySelector('.news-swiper-button-prev').addEventListener('click', evt => {
  const item = document.querySelector('.news-gallery-swiper .swiper-slide-active img');
  item.style.transition = '.3s ease-out';
  item.style.opacity = 0;
  setTimeout(() => {
    item.style.opacity = '';
  }, 1000);
});
const swiper2 = new Swiper('.news-intro-swiper', {
  grabCursor: true,
  loop: true,
  keyboard: true,
  spaceBetween: 50,
  // initialSlide: 0,
  preloadImages: false,
  lazy: true,
  height: 600,
  centeredSlides: false,
  watchSlidesVisibility: true,
  speed: 900,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  breakpoints: {
    1400: {
      autoHeight: true,
      slidesPerView: 1,
      noSwiping: false,
    },
    768: {
      initialSlide: 1,
      autoHeight: true,
      centeredSlides: false,
      init: false,
    },
    360: {
      spaceBetween: 0,
      autoHeight: true,
      centeredSlides: false,
      init: false,
    },
  },
  simulateTouch: true,
  navigation: {
    nextEl: '.news-swiper-button-next',
    prevEl: '.news-swiper-button-prev',
  },
  on: {
    init: e => {
      e.slidesForAnimation = [];
      e.titlesForAnimation = [];
      document.querySelectorAll('.news-intro-swiper-wrap .text-to-animate-js').forEach(text => {
        splitToLines(text);
        e.slidesForAnimation.push(text);
      });
      document
        .querySelectorAll('.news .news-intro-slide:not(.btn-container):not(.btn-container--light)')
        .forEach(text => {
          console.log('kkkk');
          splitToLines(text);
          e.titlesForAnimation.push(text);
        });
    },
    activeIndexChange: e => {
      if (!e.slidesForAnimation) return;
      const currentText = e.slidesForAnimation[e.activeIndex];
      const currentTitle = e.titlesForAnimation[e.activeIndex];
      if (!currentTitle) return;
      fadeUpLines(currentText);
      fadeUpLines(currentTitle);
    },
  },
});
