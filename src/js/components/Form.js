export default class FormValidator {
  constructor(popupElement) {
    this.popupElement = popupElement;
  }

  checkInputValidity(element) {
    const errorElement = this.popupElement.querySelector(`#error-${element.id}`);
    if (element.validity.valueMissing) {
      element.setCustomValidity('Это обязательное поле');
    } else if (element.type === 'text' && (element.validity.tooShort || element.value.length >= 30)) {
      element.setCustomValidity('Длина должна быть от 2 до 30 символов');
    } else if (element.validity.typeMismatch) {
      element.setCustomValidity('Здесь должна быть ссылка');
    } else {
      element.setCustomValidity('');
    }
    errorElement.textContent = element.validationMessage;
  }

  // setSubmitButtonState(buttonElem) {
  //   if (input.length !== 0) {
  //     buttonElem.setAttribute('disabled', true);
  //     buttonElem.classList.add('popup__button_disabled');
  //   } else {
  //     buttonElem.removeAttribute('disabled');
  //     buttonElem.classList.remove('popup__button_disabled');
  //   }
  // }

  setEventListeners() {
    const button = document.querySelector('.popup__button');
    const buttonEdit = document.querySelector('.popup__button_auth');
    this.form = document.querySelector('.popup__form');
    this.formForEdit = document.querySelector('.popup__profile-form');
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target);
      this.setSubmitButtonState(this.form, button);
    });
    this.formForEdit.addEventListener('input', (event) => {
      this.checkInputValidity(event.target);
      this.setSubmitButtonState(this.formForEdit, buttonEdit);
    });
  }
}
