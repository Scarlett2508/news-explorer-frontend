import './page/index.css';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

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

const popupEdit = document.querySelector('.edit__button');
const popupButton = document.querySelector('.user-info__button');

const popup = new PopupPlace(document.querySelector('.popup__picture'), cardList, card);

const popupForEdit = new PopupProfile(document.querySelector('.popup__edit'), userInfo, document.querySelector('.popup__profile-form'));

// popup.open

popupButton.addEventListener('click', popup.open);
popupEdit.addEventListener('click', popupForEdit.open);

// mobile-menu

document.querySelector('.mobil-menu').classList.remove('mobil-menu_is-opened');