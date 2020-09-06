const createHeader = ({ isLogged }) => {
  const rootNode = document.querySelector('.header__container');
  let template;

  if (isLogged) {
    template = `
            <p class="header__logo header__logo_top">NewsExplorer</p>
            <ul class="menu">
              <li class="menu menu__button"><a href="index.html" class="link menu__link">Главная</a></li>
              <li class="menu menu__button menu__button_saved-articles"><a href="loggedin.html"
                  class="link menu__link_articles">Сохранённые
                  статьи</a></li>
                  <li class="menu menu__button menu__button_auth popup__button_hidden"><a href="#" class="link menu__link">Авторизоваться</a></li>
              <li class="menu menu__button menu__button_exit"><a href="#" class="link menu__link_exit">Имя</a>
                <img src="./images/Union.png" alt="дверь на выход" class="menu__button_exit-pic">
              </li>
            </ul>
          `;
  } else {
    template = `
    <p class="header__logo header__logo_top">NewsExplorer</p>
    <ul class="menu">
      <li class="menu menu__button"><a href="index.html" class="link menu__link">Главная</a></li>
      <li class="menu menu__button menu__button_auth"><a href="#" class="link menu__link">Авторизоваться</a></li>
      <li class="menu menu__button menu__button_exit popup__button_hidden"><a href="#" class="link menu__link_exit">Имя</a>
        <img src="./images/Union.png" alt="дверь на выход" class="menu__button_exit-pic">
      </li>
    </ul>
  `;
  }
  rootNode.insertAdjacentHTML('beforeend', template);
};

export default createHeader;
