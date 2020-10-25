const newsUrl = NODE_ENV === 'development' ? 'https://newsapi.org/v2' : 'https://nomoreparties.co/news/v2';
// const myServer = NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://newsforsave.tk';

const config = {
  NEWSAPI_URL: `${newsUrl}`,
  // MAINAPI_URL: `${myServer}`,
  MAINAPI_URL: 'https://newsforsave.tk',
  NEWSAPI_KEY: 'cb24e49a16d84dcab3b2b76fb7714be8',
  PAGE_SIZE: 100,
  NEWSAPI_DAYS: 7,
};

export default config;
