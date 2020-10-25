const createMobileMenu = (userData, loggedinHeader = false) => {
    const rootNode = document.querySelector('.mobile-menu');
    let template;
  
    if (userData) {
      template = `
        <input id="menu__toggle" type="checkbox">
        <p class="header__logo header__logo_top">NewsExplorer</p>
        <label class="menu__btn ${loggedinHeader ? 'menu__btn_black' : ''}" for="menu__toggle">
          <span></span>
        </label>
        <ul class="menu__box">
          <li class="mobile-menu__button"><a class="menu__item" href="index.html" class="mobile-menu__link">Главная</a>
            </li>
            <li class="mobile-menu__button"><a class="menu__item" href="loggedin.html"
            class="mobile-menu__link">Сохранённые
            статьи</a></li>
            <li class="menu menu__button menu__button_exit menu__button_exit-mobile"><a href="#" class="link menu__link_exit">${userData.userName}</a>
            <img src="./images/Union.png" alt="дверь на выход" class="menu__button_exit-pic">
          </li>
        </ul>
            `;
    } else {
      template = `
      <input id="menu__toggle" type="checkbox">
      <p class="header__logo header__logo_top">NewsExplorer</p>
      <label class="menu__btn" for="menu__toggle">
        <span></span>
      </label>
      <ul class="menu__box">
        <li class="mobile-menu__button"><a class="menu__item" href="index.html" class="mobile-menu__link">Главная</a>
        </li>
        <li class="mobile-menu__button "><a href="#"
        class="menu__item mobile-menu__link mobile-menu__link_auth">Авторизоваться</a></li>
      </ul>
    `;
    }
  rootNode.insertAdjacentHTML('beforeend', template);
  
  };
  
 
  

export default createMobileMenu;



  
  