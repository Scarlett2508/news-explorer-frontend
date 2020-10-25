function createTopTitles(userData, articles) {
    const rootNode = document.querySelector('.top')
    const [first, second, ...other] = getKeywordsData(articles);
    const template = `
      <h2 class="top__title">Сохранённые статьи</h2>
      <div class="top__description">
        <h3 class="top__subtitle">${userData.userName}, у вас ${articles.length} сохранённых статей</h3>
        <p class="top__text">По ключевым словам: <span class="top__text_bold">${first}, ${second} и ${other.length} другим</span></p>
      </div>
    `
    rootNode.insertAdjacentHTML('beforeend', template);
  }


  function getKeywordsData(articles) {
    const result = {};
    articles.forEach((article) => {
      if (!result[article.keyword]) {
        result[article.keyword] = 1;
      } else {
        result[article.keyword] += 1;
      }
    });
    return Object.entries(result).sort((a, b) => b[1] - a[1]).map((pair) => pair[0]);
  }

export default createTopTitles;
