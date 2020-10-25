const createSavedArticle = ({articleData, mainApi, updateArticles}) => {
  const { image, title, link, date, source, _id } = articleData;
  const rootNode = document.querySelector('.article__list');
  const template = `<div class="article">
  
    <div class="article__image-container">
      <img src="${image}" alt="${title}" class="article__pic">
      <div class="article__addition">
        <button class="article__addition article__button article__bookmark article__bookmark_delete"></button>
        <span class="article__remove article__addition-remove article__remove_hidden">Вы уверены?</span>
      </div>
    
    <a href="${link}" target="_blank" class="article__link">
      <span class="article__date">${date}</span>
      <h3 class="article__title">${title}</h3>
      <span class="article__source">${source}</span>
    </a>
  </div>`;

  rootNode.insertAdjacentHTML('beforeend', template); 
  const articleNodes = document.querySelectorAll('.article');
  const articleNode = articleNodes[articleNodes.length - 1];
  const deleteButtons = document.querySelectorAll('.article__bookmark_delete');
  const deleteButton = deleteButtons[deleteButtons.length - 1];

  deleteButton.addEventListener('click', async (e) => {
    await mainApi.deleteArticle(_id);
    articleNode.remove();
    updateArticles(_id);
  })
  
  }
  
  
export default createSavedArticle;
  