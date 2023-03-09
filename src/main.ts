import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import './utils/bootstrapFormValidation';
import { MenuManager } from './controllers/MenuManager/MenuManager';
import { MenuType } from './models/enums/MenuType';

const addMenuItemFormElement = <HTMLFormElement>(
    document.querySelector('#addMenuItemForm')
);
const imageInputElement = <HTMLInputElement>addMenuItemFormElement.image;

const menuManager = new MenuManager();
/** create menu item */
imageInputElement.addEventListener(
    'change',
    menuManager.handleUploadImage.bind(menuManager)
);
addMenuItemFormElement.addEventListener(
    'submit',
    menuManager.handleSubmit.bind(menuManager)
);

/** render menu after loaded */
const handleLoad = () => {
    menuManager.renderMenu(MenuType.FoodMenu);
};
window.addEventListener('load', handleLoad);

const menuTabs = <NodeListOf<HTMLLinkElement>>(
    document.querySelectorAll('.menuTabs')
);

/**switch tabs */
menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        menuTabs.forEach((tab) => {
            tab.classList.remove('active');
        });
        tab.classList.add('active');

        if (tab.id === 'foodMenuTab') {
            menuManager.renderMenu(MenuType.FoodMenu);
        } else if (tab.id === 'drinkMenuTab') {
            menuManager.renderMenu(MenuType.DrinkMenu);
        }
    });
});
