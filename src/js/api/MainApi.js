import Api from './Api';
import config from '../constants/config';

export default class MainApi extends Api {
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
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  signin(options) {
    const { email, password } = options;
    return fetch(`${config.MAINAPI_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this.parseResponce(res))
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
      .then((res) => this.parseResponce(res))
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
      .then((res) => this.parseResponce(res))
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
      .then((res) => this.parseResponce(res))
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
