import _debounce from 'lodash/debounce';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import createHeader from './js/components/Header';
import createArticle from './js/components/Article';
import createMobileMenu from './js/components/MobileMenu';
import Popup from './js/components/Popup';

import { ITEM_KEY } from './js/constants';

import './page/index.css';

const LIMIT = 4;

let signupNameInputValue = '';
let loginEmailInputValue = '';
let loginPasswordInputValue = '';
let searchInputValue = '';
let offset = 0;
let articles = [];
let savedArticles = null;


const userData = JSON.parse(localStorage.getItem(ITEM_KEY));

const mainApi = new MainApi();
let newsApi = new NewsApi();


const articlesContainer = document.querySelector('.article__list');

async function fetchArticles(keyWord) {
  [...articlesContainer.children].forEach((child) => child.remove());
  const result = await newsApi.getArticles(keyWord);

  if (!savedArticles && userData) {
    await fetchSavedArticles();
  }
  articles = result.articles;
  offset = 0;
  renderCurrentArticles();
}

const fetchSavedArticles = () => {
  return new Promise(async (resolve) => {
    const result = await mainApi.getArticles();
    savedArticles = result.data;
    resolve();
  }) 
}

const updateSavedArticles = ({articleId, article}) => {
  if (articleId) {
    savedArticles = savedArticles.filter((savedArticle) => {
      return savedArticle._id !== articleId;
    })
  } else if (article) {
    savedArticles.push(article)
  }

  
}

function renderCurrentArticles() {
  const currentArticles = articles.slice(offset, offset + LIMIT);
  offset += LIMIT;
  currentArticles.forEach((articleData) => {
    createArticle({
      articleData, 
      userData, 
      mainApi, 
      savedArticles: savedArticles || articles, 
      keyWord: searchInputValue,
      updateSavedArticles,
     });
  })
}
function searchInputHandler(e) {
  searchInputValue = e.target.value;
}

const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
searchInput.addEventListener('input', searchInputHandler);

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const loadingBlock = document.querySelector('.loading')
  loadingBlock.classList.remove('loading_hidden')
  // if (userData) {
  //   fetchArticles(searchInputValue);
  // }
  fetchArticles(searchInputValue);
});

const moreNewsButton = document.querySelector('.loading__button');
moreNewsButton.addEventListener('click', renderCurrentArticles);


// рендерим header
createHeader(userData);
createMobileMenu(userData);

const loginEmailInput = document.getElementById('login_email');
const loginPasswordInput = document.getElementById('login_password');
const buttonLogout = document.querySelector('.menu__button_exit');
const signupNameInput = document.getElementById('signup_name');
const signupEmailInput = document.getElementById('signup_email');
const signupPasswordInput = document.getElementById('signup_password');

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

const popupPerfromEnter = document.querySelector('.popup__link-perform')

const popup = new Popup(document.querySelector('.popup__signup'));
const popupEnterLink = new Popup(document.querySelector('.popup__login'));
const popupSuccessAuth = new Popup(document.querySelector('.popup__success'));

if (popupAuth) {
  popupAuth.addEventListener('click', popup.open);
}

popupEnter.addEventListener('click', popup.close);
popupEnter.addEventListener('click', popupEnterLink.open);
popupAuthLink.addEventListener('click', popupEnterLink.close);
popupAuthLink.addEventListener('click', popup.open);

popupPerfromEnter.addEventListener('click', popupEnterLink.open);
popupPerfromEnter.addEventListener('click', popupSuccessAuth.close);

// mobile-menu

const mobileAuth = document.querySelector('.mobile-menu__link_auth');
mobileAuth.addEventListener('click', popup.open);

const menuButtonExitMobile = document.querySelector('.menu__button_exit-mobile');


if (menuButtonExitMobile) {
  menuButtonExitMobile.addEventListener('click', () => {
    localStorage.removeItem(ITEM_KEY);
  });
}

// авторизация по клику по кнопке
signupNameInput.addEventListener('input', (e) => {
  signupNameInputValue = e.target.value;
});

signupEmailInput.addEventListener('input', (e) => {
  loginEmailInputValue = e.target.value;
});
signupPasswordInput.addEventListener('input', (e) => {
  loginPasswordInputValue = e.target.value;
});

loginEmailInput.addEventListener('input', (e) => {
  loginEmailInputValue = e.target.value;
});
loginPasswordInput.addEventListener('input', (e) => {
  loginPasswordInputValue = e.target.value;
});
const toAuthorize = document.querySelector('.popup__button_auth');

toAuthorize.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const userData = await mainApi.signup({
      name: signupNameInputValue,
      email: loginEmailInputValue,
      password: loginPasswordInputValue,
    });
    if (userData !== undefined) {
      popup.close();
      popupSuccessAuth.open();
    }
  } catch (error) {
    console.error(`signup failed ${error}`);
  }
});

const toEnter = document.querySelector('.popup__button_enter');

toEnter.addEventListener('click', async (e) => {
  e.preventDefault();

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



