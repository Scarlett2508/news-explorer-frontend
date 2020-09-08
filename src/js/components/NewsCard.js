import { imageUrl, articleStatus } from '../constants/others';
import { setDate } from '../utils/setdate';

export default class NewsCard {
    constructor(mainApi) {
      this.mainApi = mainApi;
      this.findKeyword = '';
    }

    getTemplate(articleObj, keyword) {
      this.searchKeyword = '';
      this.searchKeyword = keyword;
      const image = articleObj.urlToImage === null ? imageUrl : articleObj.urlToImage;
      if (articleStatus === articleStatus.articleStatusLoggedOut) {
        return  `<div class="article">
          <div class="article__image-container">
            <img src="${this._cleanHtmlUpdate(image)}" alt="${(this._cleanHtmlUpdate(articleObj.title))}" class="article__pic">
            <div class="article__addition">
            <button class="article__addition article__button article__addition-remove article__addition-remove-login"><span
              class="article__remove article__remove_is-closed">Войдите, чтобы сохранять статьи</span></div></button>
            </div>
          </div>
          <a href="${this._cleanHtmlUpdate(articleObj.url)}" target="_blank" class="article__link">
            <span class="article__date">${this._cleanHtmlUpdate(setDate(articleObj.publishedAt))}</span>
            <h3 class="article__title">${this._cleanHtmlUpdate(articleObj.title)}</h3>
            <p class="article__text">${this._cleanHtmlUpdate(articleObj.description)}</p>
            <span class="article__source">${this._cleanHtmlUpdate(articleObj.source.name)}</span>
          </a>
        </div>`;
      }
      if (articleStatus === articleStatus.articleStatusLoggedIn) {
        return `<div class="article">
          <div class="article__image-container">
            <img src="${this._cleanHtmlUpdate(image)}" alt="${(this._cleanHtmlUpdate(articleObj.title))}" class="article__pic">
            <div class="article__addition">
              <button class="button article__button"></button>
            </div>
          </div>
          <a href="${this._cleanHtmlUpdate(articleObj.url)}" target="_blank" class="card__link">
            <span class="article__date">${this._cleanHtmlUpdate(setDate(articleObj.publishedAt))}</span>
            <h3 class="article__title">${this._cleanHtmlUpdate(articleObj.title)}</h3>
            <p class="article__text">${this._cleanHtmlUpdate(articleObj.description)}</p>
            <span class="article__source">${this._cleanHtmlUpdate(articleObj.source.name)}</span>
          </a>
        </div>`;
      }
      if (articleStatus === articleStatus.articleStatusSaved) {
        return `<div class="article" id="${articleObj._id}">
          <div class="article__image-container">
            <img src="${this._cleanHtmlUpdate(articleObj.image)}" alt="${(this._cleanHtmlUpdate(articleObj.title))}" class="article__pic">
            <div class="article__addition">
              <div class="article___name"><span class="article__name-is">${this._cleanHtmlUpdate(articleObj.keyword)}</span></div>
              <button class="article__bookmark"><span class="article__bookmark_pressed">Убрать из сохранённых</span></button>
              <button class="article__addition article__addition-remove"></button>
            </div>
          </div>
          <a href="${this._cleanHtmlUpdate(articleObj.link)}" target="_blank" class="article__link">
            <span class="article__date">${this._cleanHtmlUpdate(articleObj.date)}</span>
            <h3 class="article__title">${this._cleanHtmlUpdate(articleObj.title)}</h3>
            <p class="article__text">${this._cleanHtmlUpdate(articleObj.text)}</p>
            <span class="article__source">${this._cleanHtmlUpdate(articleObj.source)}</span>
          </a>
        </div>`;
  }
    }


    removeArticle(e) {
      if (e.target.classList.contains('article__addition-remove')) {
        if (confirm('Вы точно ходите удалить статью?')) {
          const article = event.target.closest('.article');
          this.mainApi.deleteArticleById(article.id).then((data) => {
            if (data !== undefined) {
              article.remove();
            }
          })
          .catch((err) => {
            console.log(err);
          })
        }
      }
      saveArticle = (e) => {
        if(e.target.classList.contains('article__button')) {
          const button = event.target.closest('.article__button');
          const article = event.target.closest('.article');
          const articleInfo = {
            keyword: this.searchKeyword,
            title: article.querySelector('.article__title').textContent,
            text: article.querySelector('.article__text').textContent,
            date: article.querySelector('.article__date').textContent,
            source: article.querySelector('.article__source').textContent,
            link: article.querySelector('.article_link').getAttribute('href'),
            image: article.querySelector('.article__pic').getAttribute('src')
          }
          this.mainApi.createArticle(articleInfo).then((data) => {
            if (data !== undefined) {
              button.classList.add('article__button_pressed');
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      }

    }

  // save() {
  //   this.saveButton.classList.toggle('article__bookmark_pressed');
  // }

  // create() {
  //   this.elem = document.createElement('div');
  //   this.elem.classList.add('article');
  //   this.elem.dataset.id = this.id;
  //   const template = `<div class="article">
  //     div class="article__image-container">
  //       <img class="article__pic" alt="Фотография новости">
  //       <div class="article__addition article__addition-remove article__addition-remove-login"><span
  //         class="article__remove">Войдите, чтобы сохранять статьи</span></div>
  //         <div class="article__bookmark"></div>
  //       </div>
  //       <span class="article__date"></span>
  //       <h3 class="article__title"></h3>
  //       <p class="article__text"></p>
  //       <a class="article__source"></a>
  //     </div>`;
  //   this.elem.insertAdjacentHTML('beforeend', template);
  //   this.eventListeners();
  //   return this.elem;
  // }

  // eventListeners() {
  //   this.saveButton = this.elem.querySelector('.article__bookmark');
  //   this.saveButton.addEventListener('click', this.save.bind(this));

  //   this.removeButton = this.elem.querySelector('.place-card__delete-icon');
  //   this.removeButton.addEventListener('click', this.remove.bind(this));
  // }
}
