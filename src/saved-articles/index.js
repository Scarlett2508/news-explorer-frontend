import '../page/loggedin.css';

import createHeader from '../js/components/Header';
import createSavedArticle from '../js/components/SavedArticle';
import { ITEM_KEY } from '../js/constants';
import MainApi from '../js/api/MainApi';


const userData = JSON.parse(localStorage.getItem(ITEM_KEY));

const mainApi = new MainApi();
let articles = [];

createHeader(userData, true);

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

function getKeywordsData(articles) {
  const result = {};
  articles.forEach((article) => {
    if (!result[article.keyword]) {
      result[article.keyword] = 1;
    } else {
      result[article.keyword] += 1;
    }
  });
  return Object.entries(result).sort((a, b) => b[1] - a[1]).map((pair) => pair[0]);
}
// let [first, second, ...other] = Object.entries(obj2).sort((a, b) => b[1] - a[1]).map((pair) => pair[0])
// TODO: вынести в отдельный файл 
function createTopTitles(userData, articles) {
  const rootNode = document.querySelector('.top')
  console.log(userData, articles)
  const [first, second, ...other] = getKeywordsData(articles);
  const template = `
    <h2 class="top__title">Сохранённые статьи</h2>
    <div class="top__description">
      <h3 class="top__subtitle">${userData.userName}, у вас ${articles.length} сохранённых статей</h3>
      <p class="top__text">По ключевым словам: <span class="top__text_bold">${first}, ${second} и ${other.length} другим</span></p>
    </div>
  `
  rootNode.insertAdjacentHTML('beforeend', template);
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
