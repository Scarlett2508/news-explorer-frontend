export default class Search {
    constructor(newsApi, searchForm, loadingNews, notFoundNews, newsList, moreNewsButton) {
      this.newsApi = newsApi;
      this.searchForm = searchForm;
      this.loadingNews = loadingNews;
      this.notFoundNews = notFoundNews;
      this.newsList = newsList;
      this.moreNewsButton = moreNewsButton;
    }
  
    _findNews = (e) => {
      e.preventDefault();
      const searchInput = this.searchForm.querySelector('.search__input');
      if (searchInput.value === '') {
        alert('Введите ключевое слово')
        return;
      }
      const button = event.currentTarget;
      this._removeEnabled(button, searchInput);
      this._renderLoading(false);
      this.notFoundNews.classList.add('results__not-found_hidden');
      this.newsApi.getNews(searchInput.value).then((data) => {
        this._removeDisabled(searchInput, button);
        if ((data === undefined || data.totalResults === nullResult)) {
          this.notFoundNews.classList.remove('results__not-found_hidden');
          //this.caseResults.classList.remove('results_hidden');
          this.showMoreButton.setAttribute('disabled');
          this.cardList.initCardListKeyword(searchInput.value);
          this.cardList.initCardList(data.articles);
        } else {
          //this.caseResults.classList.remove('results_hidden');
          this.cardList.initCardListKeyword(searchInput.value);
          this.cardList.initCardList(data.articles);
        }
  
      }).catch((err) => {
        this.notFoundNews.classList.remove('results__not-found_hidden');
        //this.caseResults.classList.remove('results_hidden');
        this.showMoreButton.setAttribute('disabled');
        this._removeDisabled(searchInput, button);
        console.log(err);
      }).finally(() => {
        this._renderLoading(true);
      })
    }
    _removeDisabled = (button) => {
      button.removeAttribute('disabled');
    }
    _removeEnabled = (button) => {
      button.setAttribute('disabled', true);
    }
  
    _renderLoading = (isLoading) => {
      if (!isLoading) {
        this.loadingNews.classList.remove('loading__search_hidden');
      } else {
        this.loadingNews.classList.add('loading__search_hidden');
      }
    }
  }