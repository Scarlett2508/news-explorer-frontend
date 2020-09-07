import { nullResult, loadingResults } from '../constants/others';

export default class Search {
    constructor(newsApi, searchForm, loadingNews, notFoundNews, cardList, moreNewsButton) {
      this.newsApi = newsApi;
      this.searchForm = searchForm;
      this.loadingNews = loadingNews;
      this.notFoundNews = notFoundNews;
      this.cardList = cardList;
      this.moreNewsButton = moreNewsButton;
      this.loadingResults = loadingResults; 
    }
  
    _findNews = (e) => {
      e.preventDefault();
      const searchInput = this.searchForm.querySelector('.search__input');
      if (searchInput.value === '') {
        alert('Введите ключевое слово')
        return;
      }
      const button = document.querySelector('.search__button');
      // this._setDisabled(button, searchInput);
      this._renderLoading(false);
      
      this.notFoundNews.classList.add('results__not-found_hidden');
      this.newsApi.getArticles(searchInput.value).then((data) => {
        
        //this._removeDisabled(searchInput, button);
        if ((data === undefined || data.totalResults === nullResult)) {
          this.notFoundNews.classList.remove('results__not-found_hidden');
          this.loadingResults.classList.remove('loading_hidden');
          
          this.moreNewsButton.setAttribute('disabled', true);
          this.cardList.createCardListKeyword(searchInput.value);
          this.cardList.createCardList(data.articles);
        } else {
          this.loadingResults.classList.remove('loading_hidden');
          this.cardList.createCardListKeyword(searchInput.value);
          this.cardList.createCardList(data.articles);
        }
  
      }).catch((err) => {
        this.notFoundNews.classList.remove('results__not-found_hidden');
        this.loadingResults.classList.remove('loading_hidden');
        this.moreNewsButton.setAttribute('disabled', true);
        this._removeDisabled(searchInput, button);
        console.log(err);
      }).finally(() => {
        this._renderLoading(true);
      })
    }
    _removeDisabled = (button) => {
      button.removeAttribute('disabled', true);
    }
    // _setDisabled = (button) => {
    //   button.setAttribute('disabled', true);
    // }
  
    _renderLoading = (isLoading) => {
      if (!isLoading) {
        this.loadingNews.classList.remove('loading__search_hidden');
      } else {
        this.loadingNews.classList.add('loading__search_hidden');
      }
    }
  }