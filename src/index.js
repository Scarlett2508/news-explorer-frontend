import './page/index.css';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Form from './js/components/Form';
import createHeader from './js/components/Header';
import Popup from './js/components/Popup';

import ErrorHandler from './js/utils/errorHandler';

import config from './js/constants/config';

const ITEM_KEY = 'userData';

const errHandler = new ErrorHandler(errorElem);

const {
  MAINAPI_URL,
  NEWSAPI_KEY,
  NEWSAPI_URL,
  PAGE_SIZE,
  NEWSAPI_DAYS,
} = config;

let loginEmailInputValue = '';
let loginPasswordInputValue = '';

const mainApi = new MainApi();
// const newsApi = new NewsApi(NEWSAPI_URL, NEWSAPI_KEY, PAGE_SIZE, NEWSAPI_DAYS);
let newsApi = null;

const userData = JSON.parse(localStorage.getItem(ITEM_KEY));

if (userData) {
  newsApi = new NewsApi(userData.token);
  newsApi.getArticles('природа');
}

// header

createHeader({ isLogged: Boolean(userData) });

const errorElem = document.querySelector('.error-text');
const loginEmailInput = document.getElementById('login_email');
const loginPasswordInput = document.getElementById('login_password');
const buttonLogout = document.querySelector('.menu__button_exit');

const popupAuth = document.querySelector('.menu__button_auth');

if (buttonLogout) {
  buttonLogout.addEventListener('click', () => {
    // убрать кнопку выхода и сохранённых статей
    // добавить кнопку авторизации
    localStorage.removeItem(ITEM_KEY);
    buttonLogout.classList.add('popup__button_hidden');
    popupAuth.classList.remove('popup__button_hidden');
  });
}
// popup

const popupEnter = document.querySelector('.popup__link');
const popupAuthLink = document.querySelector('.popup__link-auth');
const mobileAuth = document.querySelector('.mobile-menu__link_auth');

const popup = new Popup(document.querySelector('.popup__signup'));
const popupEnterLink = new Popup(document.querySelector('.popup__login'));

if (popupAuth) {
  popupAuth.addEventListener('click', popup.open);
}

popupEnter.addEventListener('click', popup.close);
popupEnter.addEventListener('click', popupEnterLink.open);
popupAuthLink.addEventListener('click', popupEnterLink.close);
popupAuthLink.addEventListener('click', popup.open);
mobileAuth.addEventListener('click', popup.open);

const toAuthorize = document.querySelector('.popup__button_auth');

toAuthorize.addEventListener('click', () => {
  mainApi.signup();
});

const toEnter = document.querySelector('.popup__button_enter');
loginEmailInput.addEventListener('input', (e) => {
  loginEmailInputValue = e.target.value;
});
loginPasswordInput.addEventListener('input', (e) => {
  loginPasswordInputValue = e.target.value;
});
toEnter.addEventListener('click', async () => {
  try {
    const { token } = await mainApi.signin({
      email: loginEmailInputValue,
      password: loginPasswordInputValue,
    });
    localStorage.setItem(ITEM_KEY, JSON.stringify({ token }));
    newsApi = new NewsApi(token);
    popupAuth.classList.add('popup__button_hidden');
    buttonLogout.classList.remove('popup__button_hidden');
    popupEnterLink.close();
  } catch (error) {
    console.error(`signin failed ${error}`);
  }
});

// const searchButton = document.querySelector('.search__button');
// searchButton.addEventListener('click', newsApi.getArticles);

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

// const formValidator = new Form(document.querySelector('.popup__form'));
// formValidator.setEventListeners();
