import config from '../constants/config';

export default class NewsApi {
  constructor(token) {
    this.url = config.NEWSAPI_URL;
    this.token = token;
    this.pageSize = config.PAGE_SIZE;
    this.apiKey = config.NEWSAPI_KEY;
  }

  getArticles(keyWord) {
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

  parseResponce(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}
