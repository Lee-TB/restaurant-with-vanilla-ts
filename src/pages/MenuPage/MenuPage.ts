import { BaseComponent } from '../../components/BaseComponent';
import { MenuTable } from './components/MenuTable';
import { MenuType } from '../../models/enums/MenuType';
import { MenuTabs } from './components/MenuTabs';
import { AddMenuItemModalButton } from './components/AddMenuItemModalButton';

export class MenuPage extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html */ `
            <section id="menu">
                <h2>Menu Management</h2>
                <div id="menuTabsElement"></div>
                <div class="d-flex justify-content-end p-2">
                <div id="openAddMenuItemModalButtonElement"></div>                    
                </div>
                <div id="menuTableElement"></div>                
            </section>
        `;

        this.element.innerHTML = html;

        /* Render Menu Tabs */
        const menuTabsElement = <HTMLDivElement>(
            document.getElementById('menuTabsElement')
        );
        new MenuTabs(menuTabsElement).render();

        /* Render Add Menu Item Modal Button */
        const openAddMenuItemModalButtonElement = <HTMLDivElement>(
            document.getElementById('openAddMenuItemModalButtonElement')
        );
        new AddMenuItemModalButton(openAddMenuItemModalButtonElement).render();

        /* Render Menu Table */
        const menuTableElement = <HTMLDivElement>(
            document.getElementById('menuTableElement')
        );
        const menuTable = new MenuTable(menuTableElement);
        menuTable.render();

        /* Switch Menu Type */
        const menuTabElements = <NodeListOf<HTMLLinkElement>>(
            document.querySelectorAll('.menuTabs')
        );
        menuTabElements.forEach((tab) => {
            tab.addEventListener('click', () => {
                if (tab.id === 'foodMenuTab') {
                    menuTable.setMenuType(MenuType.FoodMenu);
                    menuTable.render();
                } else if (tab.id === 'drinkMenuTab') {
                    menuTable.setMenuType(MenuType.DrinkMenu);
                    menuTable.render();
                }
            });
        });
    }
}
