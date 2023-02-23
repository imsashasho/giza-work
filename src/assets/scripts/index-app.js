import { gsap, ScrollTrigger, Flip } from 'gsap/all';
import axios from 'axios';
import SplitType from 'split-type';
import imagesLoaded from 'imagesloaded';
import './common/header';
import './common/footer';
import { preloader } from './common/loader';

global.gsap = gsap;
global.axios = axios;

// window.addEventListener('load', () => {
//   setTimeout(() => {
//     preloader.remove();
//   }, 100);
// });

/*
 * form handlers end
 */
// function disableScroll() {
//   const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
//   containersScroll.forEach(block => {
//     block.addEventListener('mouseenter', () => {
//       locoScroll.stop();
//     });
//     block.addEventListener('mouseleave', () => {
//       locoScroll.start();
//     });
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   // disableScroll();
//   window.locoScroll.update();
// });

/** ******************************* */
