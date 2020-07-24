export default class NewsCardList {
  constructor(element, createCard, api, userInfo) {
    this.createCard = createCard;
    this.element = element;
    this.api = api;
    this.userInfo = userInfo;
  }

  addArticle(elem) {
    this.element.appendChild(elem);
  }

  render() {
    this.api.loadArticles()
      .then((articles) => {
        articles.forEach((item) => {
          const article = this.createArticle(item.name, item.link, item._id, item.isMine);
          this.addArtucle(article.create());
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`${err} Запрос не выполнен.`);
      });
  }
}
