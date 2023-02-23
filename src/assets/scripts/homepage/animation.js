import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const stage = document.querySelector('.page__content');
const slides = document.querySelectorAll('.slide');
const titles = document.querySelectorAll('.col__content-title');

function initIntro() {
  // animate the intro elements into place

  let tl = gsap.timeline({ delay: 0.3 });

  tl.fromTo(
    '.main-screen-intro-logo svg',
    { x: 300, y: 0 },
    {
      y: 0,
      x: 0,
      ease: 'power4',
      duration: 4,
    },
  ).fromTo(
    '.main-screen-intro-descr',
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power4',
    },
    0.3,
  );

  // set up scrollTrigger animation for the when the intro scrolls out

  //   let stl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '.main-screen',
  //       scrub: 1,
  //       start: 'top bottom', // position of trigger meets the scroller position
  //       end: 'bottom top',
  //     },
  //   });

  //   stl
  //     .to('.main-screen-intro-logo svg', {
  //       y: 50,
  //       ease: 'power4.in',
  //       duration: 1,
  //     })
  //     .to('.main-screen-intro-descr', {
  //       y: 50,
  //       ease: 'power4.in',
  //       duration: 1,
  //     });
}

function initSlides() {
  // Animation of each slide scrolling into view

  slides.forEach(slide => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: slide,
        start: '40% 50%', // position of trigger meets the scroller position
      },
    });

    tl.from(slide.querySelectorAll('.col__content-title'), {
      ease: 'power4',
      y: 100,
      duration: 2.5,
    }).from(
      slide.querySelectorAll('.col__content-txt'),
      {
        x: 100,
        y: 0,
        opacity: 0,
        duration: 2,
        ease: 'power4',
      },
      0.4,
    );
  });
}

function initParallax() {
  slides.forEach(slide => {
    let images = slide.querySelectorAll('[img-paralax]');

    images.forEach(image => {
      const wrap = document.createElement('div');
      wrap.style.overflow = 'hidden';
      wrap.style.height = '100%';
      image.parentElement.prepend(wrap);
      //   gsap.set(image, { willChange: 'transform', scale: 1.1 });
      wrap.prepend(image);

      gsap.fromTo(
        image,
        {
          y: '-20px',
          scale: 1.3,
        },
        {
          y: '5vh',
          scrollTrigger: {
            trigger: slide,
            scrub: true,
            start: 'top bottom', // position of trigger meets the scroller position
          },
          ease: 'sine',
        },
      );
    });
  });
}

// function scrollTop() {
//     gsap.to(window, {
//         duration: 2,
//         scrollTo: {
//             y: "#slide-0"
//         },
//         ease: "power2.inOut"
//     });
//     gsap.to('.footer__link-top-line', {
//         scaleY: 1,
//         transformOrigin: "bottom center",
//         duration: 0.6,
//         ease: "power4"
//     });
// }

function init() {
  gsap.set(stage, { autoAlpha: 1 });
  initIntro();
  initSlides();
  initParallax();
}

window.onload = () => {
  init();
};
