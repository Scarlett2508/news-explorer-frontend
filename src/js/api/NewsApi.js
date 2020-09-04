import config from '../constants/config';

export default class NewsApi {
  constructor(token, pageSize) {
    this.url = config.MAINAPI_URL;
    this.token = token;
    this.pageSize = pageSize;
    this.apiKey = config.NEWSAPI_KEY;
  }

  getArticles(keyWord) {
    return fetch(`${this.url}?q=${keyWord}&pageSize=${this.pageSize}`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  // eslint-disable-next-line class-methods-use-this
  parseResponce(res) {
    if (res.ok) {
      return res.json();
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}
