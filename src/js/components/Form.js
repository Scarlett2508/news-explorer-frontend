export default class FormValidator {
  constructor(form, button) {
    this.form = form;
    this.button = button;
    this.setEventListeners();
  }

  checkInputValidity(event) {
    this.event = event;

    const errorMessage = {
      validLenght: 'Должно быть от 2 до 30 символов!',
      validInput: 'Это обязательное поле!',
      validEmail: 'Неправильный формат email!',
      validPassowrd: 'Пароль должен быть от 8 символов!'
    };

    let message = "";

    if (this.event.target.validity.valueMissing) {
      message = errorMessage.validInput;
    } else if (this.event.target.validity.typeMismatch) {
      message = errorMessage.validEmail;
    } else if (this.event.target.validity.tooShort) {
      message = errorMessage.validLenght;
    }
    this.event.target.nextElementSibling.textContent = message;
}

  setSubmitButtonState() {
    if (!this.form.checkValidity()) {
      this.button.disabled = true;

    } else {
      this.button.disabled = false;
      }
  }

  setEventListeners() {
    this.form.addEventListener('input', this.checkInputValidity.bind(this));
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));

  }
}
