import './page/index.css';

import { MainApi } from './js/api/MainApi';
import { NewsApi } from './js/api/NewsApi';

import config from './js/constants/config';

const {
  MAINAPI_URL, NEWSAPI_KEY, NEWSAPI_URL, PAGE_SIZE, NEWSAPI_DAYS,
} = config;

const mainApi = new MainApi(MAINAPI_URL);
const newsApi = new NewsApi (NEWSAPI_URL, NEWSAPI_KEY, PAGE_SIZE, NEWSAPI_DAYS);
