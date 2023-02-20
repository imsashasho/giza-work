import gsap from 'gsap';
import { loader } from './helpers/helpers';

/**
 *
 * @param containerArg - Елемент для вставки полотная для изображений
 * @param path - путь к json файлу с массивом изображений внутри
 * @param frames - кол-во изображений в секвенции
 * @param reverse
 * @returns {Object} - массив с изображениями, кол-во изображений, функция changeImage(процент этапа секвенции)
 */
export default function fake3d(
  containerArg,
  path = 'wp-content/themes/romankiv/static/romankiv.json',
  frames = 60,
) {
  // if (window.matchMedia('(max-width: 575px)').matches) return;
  const containerToAdd = document.createElement('img');
  containerToAdd.classList.add('js-transform-img');
  containerToAdd.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
      object-fit: cover;
      will-change: contents;
      z-index: -1;
  `;
  const container = containerArg;
  container.style.overflow = 'hidden';
  container.append(containerToAdd);
  const imagesCount = frames;
  const array = [];
  const IMG_PATH = path;

  const loadedCounter = 0;
  /** Флаг блокировки при играющей анимации */
  const isAnimating = false;
  window.currentDisplayedImage = 0;
  let currentDisplayedImage = 0;

  /** если изображения не в JSON-t */
  // for (let index = 1; index < imagesCount; index++) {
  //     const element = imagesCount[index];
  //     fetch(`${IMG_PATH}${index}.jpg`)
  //         .then(el => el.blob())
  //         .then(el => {
  //             array[index] = URL.createObjectURL(el);
  //             loadedCounter += 1;
  //             // loadText.innerHTML = 'Loading ' + (loadedCounter * 100  / (imagesCount - 1)).toFixed(0);
  //             if ((loadedCounter * 100  / (imagesCount - 1)).toFixed(0) == 100) {
  //                 // loadText.innerHTML = 'Start move';
  //                 // console.log('loaded');
  //                 container.querySelector(':first-child').style.opacity = 0;
  //                 container.style.background = 'none';
  //                 gsap.set(containerToAdd, { attr: { src: array[2] } });
  //             };
  //         })
  // }

  fetch(path)
    .then(el => el.json())
    .then((el) => {
      el.forEach(img => array.push(img));
      container.querySelector(':first-child').style.opacity = 0;
      container.style.background = 'none';
      gsap.set(containerToAdd, { attr: { src: array[2] } });
    });
  function changeImage(posInPercent, mouseenter = false) {
    if (isAnimating) return;
    // if (mouseenter) {
    //   /** Переход от прошлой точки до текущей при заходе в контейнер */
    //   isAnimating = true;
    //   if (+currentDisplayedImage > +posInPercent) {
    //     const tlBig = gsap.timeline({ immediateRender: true });
    //     tlBig.pause();
    //     for (let k = +currentDisplayedImage; k >= +posInPercent; k--) {
    //       tlBig.set(containerToAdd, { attr: { src: array[k] } }, '<+0.02');
    //     }
    //     tlBig.add(() => {
    //       isAnimating = false;
    //       currentDisplayedImage = posInPercent;
    //     });
    //     tlBig
    //       // .to(containerToAdd, { x: posInPercent/-100, duration: 0.5 })
    //       .play();
    //   } else if (+currentDisplayedImage < +posInPercent) {
    //     const tlBig = gsap.timeline({ immediateRender: true });
    //     tlBig.pause();
    //     for (let k = +currentDisplayedImage; k <= +posInPercent; k++) {
    //       tlBig.set(containerToAdd, { attr: { src: array[k] } }, '<+0.02');
    //     }
    //     tlBig.add(() => {
    //       isAnimating = false;
    //       currentDisplayedImage = posInPercent;
    //     });
    //     tlBig
    //       // .to(containerToAdd, { x: posInPercent/-100, duration: 0.5 })
    //       .play();
    //   }
    //   return;
    // }
    if (
      currentDisplayedImage !== posInPercent
      && array[posInPercent] !== undefined
      && isAnimating === false
    ) {
      containerToAdd.src = array[posInPercent];
      currentDisplayedImage = posInPercent;
    }
  }
  return {
    images: array,
    imagesCount,
    changeImage,
  };
}
