const searchForm = document.querySelector('.search__form');

const newsList = document.querySelector('.article__list'); 
const loadingResults = document.querySelector('.loading'); 

const loadingNews = document.querySelector('.loading__search');

const notFoundNews = document.querySelector('.loading__not-found');
const firstIndexArray = 0;
const nullResult = 0;
const moreNewsButton = document.querySelector('.loading__button');
const imageUrl = 'https://via.placeholder.com/300';

const articleStatus = {
    articleStatusLoggedOut:0,
    articleStatusLoggedIn:1,
    articleStatusSaved:2,
  }
// const ARTICLE_STATUS 

const months = ['Января', 'Февраля', 'Марта', 'Апреля', 
  'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  
module.exports = { searchForm, loadingNews, notFoundNews, moreNewsButton, 
    newsList, firstIndexArray, nullResult, articleStatus, loadingResults, imageUrl, months };