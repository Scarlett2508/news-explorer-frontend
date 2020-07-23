export default class MainApi {
  constructor(url) {
    this.url = url;
    this.token = token;
  }

  signup(data) {
    return fetch(`${this.url}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name.value,
        email: data.email.value,
        password: data.password.value,
      }),
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  signin(data) {
    return fetch(`${this.url}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email.value,
        password: data.password.value,
      }),
    })
      .then((res) => this.parseResponce(res))
      .catch((err) => {
        throw err;
      });
  }

  getUser() {
    return fetch(`${this.url}users/me`, {
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
    return fetch(`${this.url}articles`, {
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
    return fetch(`${this.url}articles`, {
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
    return fetch(`${this.url}articles/${articleId}`, {
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
