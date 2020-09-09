const createArticle = (data, index) => {
  const { urlToImage, title, url, publishedAt, description, source } = data;
  const rootNode = document.querySelector('.article__list');

  const template = `<div class="article">
  
    <div class="article__image-container">
      <img src="${urlToImage}" alt="${title}" class="article__pic">
      <div class="article__addition">
      <button class="article__addition article__button article__bookmark"></button>
      <span class="article__remove article__addition-remove article__remove_hidden">Войдите, чтобы сохранять статьи</span>
      </div>
    
    <a href="${url}" target="_blank" class="article article__link">
      <span class="article__date">${publishedAt}</span>
      <h3 class="article__title">${title}</h3>
      <p class="article__text">${description}</p>
      <span class="article__source">${source.name}</span>
    </a>
  </div>`;

  rootNode.insertAdjacentHTML('beforeend', template);

  const additionButtons = document.querySelectorAll('.article__addition');
  const additionButton = additionButtons[additionButtons.length - 1];
  const warningWords = document.querySelectorAll('.article__remove');
  const warningWord = warningWords[warningWords.length - 1];


  additionButton.addEventListener('click', (e) => {
    warningWord.classList.toggle('article__remove_hidden')
});

}

export default createArticle;
