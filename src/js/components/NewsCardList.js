export default class NewsCardList {
  constructor(newsApi, element, createCard, userInfo) {
    this.createCard = createCard;
    this.element = element;
    this.newsApi = newsApi;
    this.userInfo = userInfo;
  }

  addCard(elem) {
    this.element.appendChild(elem);
  }

  render() {
    this.newsApi.loadCards()
      .then((cards) => {
        cards.forEach((item) => {
          const card = this.createCard(item.name, item.link, item._id, item.isMine);
          this.addCard(card.create());
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`${err} Запрос не выполнен.`);
      });
  }
}
