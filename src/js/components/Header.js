const createHeader = (userData, loggedinHeader = false) => {
  const rootNode = document.querySelector('.header__container');
  let template;
  // header__logo_black

  if (userData) {
    template = `
            <p class="header__logo header__logo_top ${loggedinHeader ? 'header__logo_black' : ''}">NewsExplorer</p>
            <ul class="menu">
              <li class="menu menu__button ${loggedinHeader ? '' : 'menu__button_active-main'}"><a href="index.html" class="link menu__link ${loggedinHeader ? 'menu__link_black' : 'menu__button_active'}">Главная</a></li>
              <li class="menu menu__button menu__button_saved-articles ${loggedinHeader ? 'menu__button_active-loggedin' : ''}"><a href="loggedin.html"
                  class="link menu__link_articles ${loggedinHeader ? 'menu__link_black' : ''}">Сохранённые
                  статьи</a></li>
                  ${loggedinHeader ? '' : '<li class="menu menu__button menu__button_auth popup__button_hidden"><a href="#" class="link menu__link">Авторизоваться</a></li>'}
              <li class="menu menu__button menu__button_exit"><a href="#" class="link menu__link_exit ${loggedinHeader ? 'menu__link_black' : ''}">${userData.userName}</a>
                <img src="./images/Union.png" alt="дверь на выход" class="menu__button_exit-pic">
              </li>
            </ul>
          `;
  } else {
    template = `
    <p class="header__logo header__logo_top ${loggedinHeader ? 'header__logo_black' : ''}">NewsExplorer</p>
    <ul class="menu">
      <li class="menu menu__button"><a href="index.html" class="link menu__link">Главная</a></li>
      <li class="menu menu__button menu__button_saved-articles popup__button_hidden"><a href="loggedin.html" 
        class="link menu__link_articles">Сохранённые
        статьи</a></li>
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
