import './page/index.css';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

import Popup from './js/components/Popup';

import ErrorHandler from './js/utils/errorHandler';

import config from './js/constants/config';

const errorElem = document.querySelector('.error-text');

const errHandler = new ErrorHandler(errorElem);

const {
  MAINAPI_URL,
  NEWSAPI_KEY,
  NEWSAPI_URL,
  PAGE_SIZE,
  NEWSAPI_DAYS,
} = config;

const mainApi = new MainApi();
const newsApi = new NewsApi(NEWSAPI_URL, NEWSAPI_KEY, PAGE_SIZE, NEWSAPI_DAYS);

// popup
const popupAuth = document.querySelector('.menu__button_auth');
const popupEnter = document.querySelector('.popup__link');
const popupAuthLink = document.querySelector('.popup__link-auth');

const popup = new Popup(document.querySelector('.popup__signup'));
const popupEnterLink = new Popup(document.querySelector('.popup__login'));

// popup.open

popupAuth.addEventListener('click', popup.open);
popupEnter.addEventListener('click', popup.close);
popupEnter.addEventListener('click', popupEnterLink.open);
popupAuthLink.addEventListener('click', popupEnterLink.close);
popupAuthLink.addEventListener('click', popup.open);

// mobile-menu

// document.querySelector('.mobil-menu').classList.remove('mobil-menu_is-opened');

// search

const toAuthorize = document.querySelector('.popup__button_ auth');

toAuthorize.addEventListener('click', mainApi.signup);

const toEnter = document.querySelector('.popup__button_enter');

toEnter.addEventListener('click', mainApi.signin);

// function searchHandler() {
//   return fetch(`${config.MAINAPI_URL}signup`, {
//     method: 'POST',
//     credentials: 'include',
//     withCredentials: true,
//     body: JSON.stringify({
//     name: 'alia',
//                 email: 'alia@a.ru',
//                 password: '1232457',
//             }),
//         })
//         .then((res) => this.parseResponce(res))
//         .catch((err) => {
//             throw err;
//         });
// }