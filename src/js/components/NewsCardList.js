import { nullResult, articleStatus, firstIndexArray } from '../constants/others.js';

export default class NewsCardList {
  constructor(mainApi, newsCard, moreNewsButton, renderPosition) {
    this.mainApi = mainApi;
    this.newsCard = newsCard;
    this.moreNewsButton = moreNewsButton;
    this.renderPosition = renderPosition;
    this.items = [];
    this.articleStatus = articleStatus.articleStatusLoggedOut;
    this.keyword = '';
  }

  _addArticle = (articleObj) => {
    return this.renderPosition.insertAdjacentHTML('beforeend', this.newsCard.getTemplate(articleObj, this.articleStatus, this.keyword));
  }

  

  _clearArticleList = () => {
    while (this.renderPosition.firstChild) {
      this.renderPosition.removeChild(this.renderPosition.firstChild);
    }
  }

  _showMoreArticles = () => {
    let currentIndex = 0;
    let currentLimit = 3;
    if (this.items[firstIndexArray].length !== nullResult) {
      this.moreNewsButton.removeAttribute('disabled', true);
      currentLimit += currentIndex;
      for (currentIndex; currentIndex < currentLimit && currentIndex < this.items[firstIndexArray].length; currentIndex++) {
        this._addArticle(this.items[firstIndexArray][currentIndex]);
        this.items[firstIndexArray].shift();
      }
    } else {
      this.moreNewsButton.classList.setAttribute('disabled', true);;
    }
  }

  createCardList = (array) => {
    this._clearArticleList();
    this.items = [];
    this.items.push(array);
    this.mainApi.getUserById().then((data) => {
      if (data !== undefined) {
        this.articleStatus = articleStatus.articleStatusLoggedIn;
        this._showMoreArticles();
      } else {
        this.articleStatus = articleStatus.articleStatusLoggedOut;
        this._showMoreArticles();
      }
    }).catch((err) => {
      console.log(err);
      this._showMoreArticles();
    })
  }

  createCardListKeyword = (word) => {
    this.keyword = '';
    this.keyword = word;
  }
  eventListeners = () => {
    this.renderPosition.addEventListener('click', this.newsCard.saveArticle);
    this.renderPosition.addEventListener('click', this.newsCard.removeArticle);
  }
}

