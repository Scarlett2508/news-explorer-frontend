const createArticle = (data) => {
  console.count("createArticle")
  const { urlToImage, title, url, publishedAt, description, source } = data;
  const rootNode = document.querySelector('.article__list');

  const template = `<div class="article">
    <div class="article__image-container">
      <img src="${urlToImage}" alt="${title}" class="article__pic">
      <div class="article__addition">
      <button class="article__addition article__button article__addition-remove article__addition-remove-login"><span
        class="article__remove article__remove_is-closed">Войдите, чтобы сохранять статьи</span></div></button>
      </div>
    
    <a href="${url}" target="_blank" class="article article__link">
      <span class="article__date">${publishedAt}</span>
      <h3 class="article__title">${title}</h3>
      <p class="article__text">${description}</p>
      <span class="article__source">${source.name}</span>
    </a>
  </div>`;

  rootNode.insertAdjacentHTML('beforeend', template);
}

export default createArticle;
