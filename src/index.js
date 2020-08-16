import './page/index.css';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

import Popup from './js/components/Popup';

import ErrorHandler from './js/utils/errorHandler';

import config from './js/constants/config';

const errorElem = document.querySelector('.error-text');

const errHandler = new ErrorHandler(errorElem);

const {
  MAINAPI_URL, NEWSAPI_KEY, NEWSAPI_URL, PAGE_SIZE, NEWSAPI_DAYS,
} = config;

const mainApi = new MainApi(MAINAPI_URL);
const newsApi = new NewsApi(NEWSAPI_URL, NEWSAPI_KEY, PAGE_SIZE, NEWSAPI_DAYS);

// popup
const popupAuth = document.querySelector('.menu__button_auth');
const popupEnter = document.querySelector('.popup__link');
const popupAuthLink = document.querySelector('.popup__link-auth');

// const popupEdit = document.querySelector('.edit__button');
// const popupButton = document.querySelector('.user-info__button');

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