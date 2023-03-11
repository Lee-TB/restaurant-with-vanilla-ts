import { BaseComponent } from '../../../components/BaseComponent';
import { MenuType } from '../../../models/enums/MenuType';

export class MenuTabs extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html */ `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a
                        class="nav-link menuTabs active"
                        href="#"
                        id="foodMenuTab"
                        >Food Menu</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link menuTabs"
                        href="#"
                        id="drinkMenuTab"
                        >Drink Menu</a
                    >
                </li>
            </ul>
        `;

        this.element.innerHTML = html;

        this.switchWhenClick();
    }

    /**Switch when click tabs */
    /* switch tabs css */
    private switchWhenClick() {
        const menuTabElements = <NodeListOf<HTMLLinkElement>>(
            document.querySelectorAll('.menuTabs')
        );
        menuTabElements.forEach((tab) => {
            tab.addEventListener('click', () => {
                menuTabElements.forEach((tab) => {
                    tab.classList.remove('active');
                });
                tab.classList.add('active');
            });
        });
    }

    /**switch when menu type change */
    /* switch tabs css */
    public switchByMenuType(type: MenuType) {
        const menuTabElements = <NodeListOf<HTMLLinkElement>>(
            document.querySelectorAll('.menuTabs')
        );
        menuTabElements.forEach((tab) => {
            tab.classList.remove('active');
            if (tab.id === 'foodMenuTab' && type === MenuType.FoodMenu) {
                tab.classList.add('active');
            } else if (
                tab.id === 'drinkMenuTab' &&
                type === MenuType.DrinkMenu
            ) {
                tab.classList.add('active');
            }
        });
    }
}
