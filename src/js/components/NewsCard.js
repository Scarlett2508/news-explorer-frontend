export default class NewsCard {
  constructor(name, link, id, isMine, api) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.elem = null;
    this.isMine = isMine;
    this.api = api;
    this.saveButton = document.querySelector('.article__bookmark');
    this.removeButton = null;
  }

  remove() {
    this.elem.remove();
  }

  save() {
    this.saveButton.classList.toggle('article__bookmark_pressed');
  }

  create() {
    this.elem = document.createElement('div');
    this.elem.classList.add('article');
    this.elem.dataset.id = this.id;
    const template = `<div class="article">
      div class="article__image-container">
        <img class="article__pic" alt="Фотография новости">
        <div class="article__addition article__addition-remove article__addition-remove-login"><span
          class="article__remove">Войдите, чтобы сохранять статьи</span></div>
          <div class="article__bookmark"></div>
        </div>
        <span class="article__date"></span>
        <h3 class="article__title"></h3>
        <p class="article__text"></p>
        <a class="article__source"></a>
      </div>`;
    this.elem.insertAdjacentHTML('beforeend', template);
    this.eventListeners();
    return this.elem;
  }

  eventListeners() {
    this.saveButton = this.elem.querySelector('.article__bookmark');
    this.saveButton.addEventListener('click', this.save.bind(this));

    this.removeButton = this.elem.querySelector('.place-card__delete-icon');
    this.removeButton.addEventListener('click', this.remove.bind(this));
  }
}
