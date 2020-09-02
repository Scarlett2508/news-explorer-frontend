import config from '../constants/config';

export default class Api {
  constructor() {
    this.url = config.MAINAPI_URL;
  }

  saveDependencies(dependencies) {
    this._dependencies = dependencies;
  }
}
