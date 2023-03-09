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

        /**switch tabs css */
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
}
