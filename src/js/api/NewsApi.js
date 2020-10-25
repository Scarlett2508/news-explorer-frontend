import config from '../constants/config';
import { getLastWeekDate } from '../constants/utils';


export default class NewsApi {
  constructor(token) {
    this.url = config.NEWSAPI_URL;
    this.token = token;
    this.pageSize = config.PAGE_SIZE;
    this.apiKey = config.NEWSAPI_KEY;
  }

  getArticles(keyWord = '') {
    if (keyWord.length < 2) {
      return {articles: []};
    }
    return fetch(`${this.url}/everything?q=${keyWord}&pageSize=${this.pageSize}&apiKey=${this.apiKey}&from=${getLastWeekDate()}`, {
      method: 'GET',
      // headers: {
      //   authorization: `Bearer ${this.token}`,
      // },
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
