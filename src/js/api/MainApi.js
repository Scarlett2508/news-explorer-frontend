import config from '../constants/config';
import {ITEM_KEY} from '../constants';

export default class MainApi {
  get token() {
    return (JSON.parse(localStorage.getItem(ITEM_KEY)) || {}).token;
  }
  
  signup(options) {
    const { name, email, password } = options;

    return fetch(`${config.MAINAPI_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => this._parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  signin(options) {
    const { email, password } = options;
    return fetch(`${config.MAINAPI_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this._parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  logout() {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json());
  }

  getUser() {
    return fetch(`${config.MAINAPI_URL}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this._parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  saveArticle(article) {
    return fetch(`${config.MAINAPI_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      }),
    })
      .then((res) => this._parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  getArticles() {
    return fetch(`${config.MAINAPI_URL}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this._parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  deleteArticle(articleId) {
    return fetch(`${config.MAINAPI_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this._parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  // eslint-disable-next-line class-methods-use-this
  _parseResponce(res) {
    if (res.ok) {
      return res.json();
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}
