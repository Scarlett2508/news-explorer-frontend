import config from '../constants/config';

export default class NewsApi {
  constructor(token) {
    this.url = config.NEWSAPI_URL;
    this.token = token;
    this.pageSize = config.PAGE_SIZE;
    this.apiKey = config.NEWSAPI_KEY;
  }

  getArticles(keyWord) {
    // console.log('getArticles', `${this.url}?q=${keyWord}&pageSize=${this.pageSize}`);
    return fetch(`${this.url}/everything?q=${keyWord}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.token}`,
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
