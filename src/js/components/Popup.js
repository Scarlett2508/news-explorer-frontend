export default class Popup {
  constructor(element) {
    this.element = element;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.element.querySelector('.popup__close').addEventListener('click', this.close);
    this.form = document.querySelector('.popup__picture-form');
    this.api = api;
  }

  open() {
    this.form.reset();
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }
}
