// import { nullResult, loadingResults, searchForm } from '../constants/others';

// export default class Search {
//     constructor(newsApi, loadingNews, moreNewsButton) {
//       this.newsApi = newsApi;
//       console.log("search.construct", newsApi)
//       this.loadingNews = loadingNews;
//       this.moreNewsButton = moreNewsButton;
//       this.notFoundNews = document.querySelector('.loading__not-found');
//       this.searchForm = searchForm;
//       // this.cardList = document.querySelector('.article__list');
//       this.cardList = [];
      
//       this.loadingResults = loadingResults; 
//     }
  
//     _findNews(e) {
//       e.preventDefault();
//       const that = this;
//       const searchInput = document.querySelector('.search__input');
//       if (searchInput.value === '') {
//         alert('Введите ключевое слово')
//         return;
//       }
//       const button = document.querySelector('.search__button');
//       // this._setDisabled(button, searchInput);
//      // this._renderLoading(false);
      
//       // this.notFoundNews.classList.add('loading__not-found_hidden');
      
//       this.newsApi.getArticles(searchInput.value).then(function(data) {
//         console.log("_findNews this", this)
//         //this._removeDisabled(searchInput, button);
//         if ((data === undefined || data.totalResults === nullResult)) {
//           this.notFoundNews.classList.remove('loading__not-found_hidden');
//           this.loadingResults.classList.remove('loading_hidden');
          
//          //  this.moreNewsButton.setAttribute('disabled', true);
//          that.cardList.createCardListKeyword(searchInput.value);
//          that.cardList.createCardList(data.articles);
          
          
//         } else {
//           // this.loadingResults.classList.remove('loading_hidden');
//           that.cardList.createCardListKeyword(searchInput.value);
//           that.cardList.createCardList(data.articles);
//         }
  
//       }).catch((err) => {
//         this.notFoundNews.classList.remove('loading__not-found_hidden');
//         this.loadingResults.classList.remove('loading_hidden');
//         // this.moreNewsButton.setAttribute('disabled', true);
//         this._removeDisabled(searchInput, button);
//         console.log(err);
//       }).finally(() => {
//         this._renderLoading(true);
//       })
//     }
//     _removeDisabled(button) {
//       button.removeAttribute('disabled', true);
//     }
//     // _setDisabled = (button) => {
//     //   button.setAttribute('disabled', true);
//     // }
  
//     _renderLoading(isLoading) {
//       if (!isLoading) {
//         this.loadingNews.classList.remove('loading__search_hidden');
//       } else {
//         this.loadingNews.classList.add('loading__search_hidden');
//       }
//     }
//   }