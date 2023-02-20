import { popupFactory } from './popupFactory';

export const successPopup = popupFactory(document.querySelector('.thank-you-popup'));

const closeBtnRef = document.querySelector('.thank-you-popup__btn');
const closeAllBtnRef = document.querySelector('.close-popup');

closeBtnRef.addEventListener('click', () => {
  successPopup.close();
});

closeAllBtnRef.addEventListener('click', () => {
  successPopup.close();
});
