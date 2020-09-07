import './page/index.css';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Form from './js/components/Form';
import createHeader from './js/components/Header';
import Popup from './js/components/Popup';
import Search from './js/components/Search';
import ErrorHandler from './js/utils/errorHandler';

// import config from './js/constants/config';

const ITEM_KEY = 'userData';

const errHandler = new ErrorHandler(errorElem);

const search = new Search(newsApi, searchForm, loadingNews, notFoundNews, newsList, moreNewsButton);

// const {
//   MAINAPI_URL,
//   NEWSAPI_KEY,
//   NEWSAPI_URL,
//   PAGE_SIZE,
//   NEWSAPI_DAYS,
// } = config;

let loginEmailInputValue = '';
let loginPasswordInputValue = '';

const mainApi = new MainApi();
let newsApi = null;

const userData = JSON.parse(localStorage.getItem(ITEM_KEY));

// if (userData) {
//   newsApi = new NewsApi(userData.token);
//   newsApi.getArticles('природа');
//   searchButton.addEventListener('click', newsApi.getArticles());
// }

// рендерим header

createHeader({ isLogged: Boolean(userData) });

const errorElem = document.querySelector('.error-text');
const loginEmailInput = document.getElementById('login_email');
const loginPasswordInput = document.getElementById('login_password');
const buttonLogout = document.querySelector('.menu__button_exit');

const popupAuth = document.querySelector('.menu__button_auth');
const buttonSavedArticles = document.querySelector('.menu__button_saved-articles');

// click по кнопке выхода

if (buttonLogout) {
  buttonLogout.addEventListener('click', () => {
    localStorage.removeItem(ITEM_KEY);
    buttonLogout.classList.add('popup__button_hidden');
    popupAuth.classList.remove('popup__button_hidden');
    buttonSavedArticles.classList.add('popup__button_hidden');
  });
}
// popup

const popupEnter = document.querySelector('.popup__link');
const popupAuthLink = document.querySelector('.popup__link-auth');
const mobileAuth = document.querySelector('.mobile-menu__link_auth');

const popup = new Popup(document.querySelector('.popup__signup'));
const popupEnterLink = new Popup(document.querySelector('.popup__login'));
// const popupSuccessAuth = new Popup(document.querySelector('.popup__success'));

if (popupAuth) {
  popupAuth.addEventListener('click', popup.open);
}

popupEnter.addEventListener('click', popup.close);
popupEnter.addEventListener('click', popupEnterLink.open);
popupAuthLink.addEventListener('click', popupEnterLink.close);
popupAuthLink.addEventListener('click', popup.open);
mobileAuth.addEventListener('click', popup.open);

// авторизация по клику по кнопке

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
    buttonSavedArticles.classList.remove('popup__button_hidden');
    popupEnterLink.close();
  } catch (error) {
    console.error(`signin failed ${error}`);
  }
});

// const formValidator = new Form(document.querySelector('.popup__form'));
// formValidator.setEventListeners();

// search

const searchButton = document.querySelector('.search__button');
searchButton.addEventListener('click', search._findNews);
