export default class ErrorHandler {
  constructor(elem) {
    this.elem = elem;
  }

  showError(err) {
    this.elem.textContent = err;
  }
}
