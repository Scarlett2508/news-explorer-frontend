const createSavedArticle = ({articleData, mainApi}) => {
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
  console.log(articleNode)
  deleteButton.addEventListener('click', async (e) => {
    await mainApi.deleteArticle(_id);
    articleNode.remove();
  })

  

  function deleteArticle(articleId) {
      //mainApi.deleteArticle(bookmarkedArticle._id)
      // нажатие на кнопку
      // удаление статьи 
  
  }
  
    // const additionButtons = document.querySelectorAll('.article__addition');
    // const additionButton = additionButtons[additionButtons.length - 1];
    // const warningWords = document.querySelectorAll('.article__remove');
    // const warningWord = warningWords[warningWords.length - 1];
  
  
//     additionButton.addEventListener('click', async (e) => {
//       // warningWord.classList.toggle('article__remove_hidden')
//       additionButton.classList.toggle('article__bookmark_pressed');
//       console.log(bookmarkedArticle)
  
//       if (bookmarkedArticle) {
//         await mainApi.deleteArticle(bookmarkedArticle._id);
//         updateSavedArticles({articleId: bookmarkedArticle._id});
//       } else {
//         const result = await mainApi.saveArticle({
//           title,
//           source: source.id || '',
//           keyword: keyWord, 
//           text: content,
//           date: publishedAt,
//           link: url,
//           image: urlToImage,
//         });
//         updateSavedArticles({article: result.data})
//       }
//   });
  
  }
  
  
export default createSavedArticle;
  
//   date: "2020-08-24T14:22:33Z"
// id: "20d12f53-4c5a-484c-8d3e-ae02d11c9593"
// image: "https://icdn.lenta.ru/images/2020/08/24/15/20200824155237746/share_923f71ce959a944d141a1c154c901eda.jpg"
// keyword: "природа"
// link: "https://lenta.ru/news/2020/08/24/crimeaopros/"
// source: "lenta"
// text: ", , . .
// ↵ , , , .
// ↵« , . », .
// ↵ , - . « , . , , », .
// ↵, , . « , , . ? , , », .
// ↵24 . , , , .
// ↵*** «»: , , : travel@lenta-co.ru"
// title: "Россияне поделились удивлением от отдыха в Крыму"
// __v: 0
// _id: "