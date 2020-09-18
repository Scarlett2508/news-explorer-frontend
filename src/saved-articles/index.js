import '../page/loggedin.css';

import createHeader from '../js/components/Header';
import createMobileMenu from '../js/components/MobileMenu';
import createSavedArticle from '../js/components/SavedArticle';
import { ITEM_KEY } from '../js/constants';
import MainApi from '../js/api/MainApi';
import createTopTitles from '../js/components/TopTitle';

const userData = JSON.parse(localStorage.getItem(ITEM_KEY));

const mainApi = new MainApi();
let articles = [];

createHeader(userData, true);
createMobileMenu(userData);

const loader = document.querySelector('.loading__search')

async function fetchArticles() {
  const result = await mainApi.getArticles();
  articles = result.data;
  loader.classList.add('loading__search_hidden');
  createTopTitles(userData, articles);
  articles.forEach((articleData) => {
    createSavedArticle({articleData, mainApi, updateArticles})
  })
}


const updateArticles = (articleId) => {
  articles = articles.filter((article) => {
    return article._id !== articleId; 
  });
  const articlesContainer = document.querySelector('.top');
  [...articlesContainer.children].forEach((child) => child.remove());
  createTopTitles(userData, articles);
}

fetchArticles();
