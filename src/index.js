import _debounce from 'lodash/debounce';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Form from './js/components/Form';
import createHeader from './js/components/Header';
import createArticle from './js/components/Article';
import Popup from './js/components/Popup';
// import Search from './js/components/Search';
import ErrorHandler from './js/utils/errorHandler';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';

import './page/index.css';

const { loadingNews, 
  notFoundNews, newsList, 
  firstIndexArray, nullResult, articleStatus, loadingResults, months
 } = require('./js/constants/others');

// import config from './js/constants/config';

const ITEM_KEY = 'userData';

const LIMIT = 4;

let loginEmailInputValue = '';
let loginPasswordInputValue = '';
let searchInputValue = '';
let offset = 0;
let articles = [];
// const DEBOUNCE_DELAY = 500;

// const errHandler = new ErrorHandler(errorElem);



// const {
//   MAINAPI_URL,
//   NEWSAPI_KEY,
//   NEWSAPI_URL,
//   PAGE_SIZE,
//   NEWSAPI_DAYS,
// } = config;

const mainApi = new MainApi();
// let newsApi = null;
let newsApi = new NewsApi();
const userData = JSON.parse(localStorage.getItem(ITEM_KEY));


const articlesContainer = document.querySelector('.article__list');



async function fetchArticles(keyWord) {
  [...articlesContainer.children].forEach((child) => child.remove());
  const result = await newsApi.getArticles(keyWord);
  articles = result.articles;
  offset = 0;
  renderCurrentArticles();
}

function renderCurrentArticles() {
  const currentArticles = articles.slice(offset, offset + LIMIT);
  offset += LIMIT;
  currentArticles.forEach((articleData) => {
    createArticle(articleData);
  })
}

function searchInputHandler(e) {
  searchInputValue = e.target.value;
}

const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
searchInput.addEventListener('input', searchInputHandler);
const newsCard = new NewsCard(mainApi);
const newsCardList = new NewsCardList(newsCard, loadingResults, moreNewsButton, mainApi);
// const search = new Search(newsApi, loadingNews, notFoundNews, moreNewsButton);

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const loadingBlock = document.querySelector('.loading')
  loadingBlock.classList.remove('loading_hidden')
  fetchArticles(searchInputValue);
});

const moreNewsButton = document.querySelector('.loading__button');
moreNewsButton.addEventListener('click', renderCurrentArticles);

//

// if (userData) {

//   newsApi = new NewsApi(userData.token);
//   newsApi.getArticles('природа');
// }

// рендерим header
console.log(userData)
createHeader(userData);

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
    const userData = await mainApi.signin({
      email: loginEmailInputValue,
      password: loginPasswordInputValue,
    });
    localStorage.setItem(ITEM_KEY, JSON.stringify(userData));
    newsApi = new NewsApi(userData.token);
    const headerContainer = document.querySelector('.header__container');
    [...headerContainer.children].forEach((child) => child.remove());
    createHeader(userData);
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


// newsCardList.eventListeners();