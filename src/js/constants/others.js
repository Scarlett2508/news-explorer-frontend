const searchForm = document.querySelector('.search__form');
const searchButton = document.querySelector('.search__button');

const newsList = document.querySelector('.article__list'); // контейнер карточек
const caseResults = document.querySelector('.results'); // секция результатов

const loadingNews = document.querySelector('.loading__search');

const notFoundNews = document.querySelector('.loading__not-found');


const moreNewsButton = document.querySelector('.loading__button');



module.exports = { searchForm, searchButton, loadingNews, notFoundNews, moreNewsButton, newsList };