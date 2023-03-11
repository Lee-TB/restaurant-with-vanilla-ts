import { BaseComponent } from '../../components/BaseComponent';
import { MenuTable } from './screens/MenuTable';
import { MenuTabs } from './screens/MenuTabs';
import { AddMenuItemModalButton } from './screens/AddMenuItemModalButton';

export class MenuPage extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html */ `
            <section id="menu">
                <h2>Menu Management</h2>
                <div id="menuTabsPlaceholder"></div>
                <div class="d-flex justify-content-end p-2">
                <div id="openAddMenuItemModalButtonPlaceholder"></div>                    
                </div>
                <div id="menuTablePlaceholder"></div>                
            </section>
        `;

        this.element.innerHTML = html;

        this.renderMenuTabs();

        this.renderAddMenuItemModalButton();

        this.renderMenuTable();
    }

    /**Render Menu Tabs */
    private renderMenuTabs() {
        const menuTabsPlaceholder = <HTMLDivElement>(
            document.getElementById('menuTabsPlaceholder')
        );
        const menuTabs = new MenuTabs(menuTabsPlaceholder);
        menuTabs.render();
    }

    /**Render Add Menu Item Modal Button */
    private renderAddMenuItemModalButton() {
        const openAddMenuItemModalButtonPlaceholder = <HTMLDivElement>(
            document.getElementById('openAddMenuItemModalButtonPlaceholder')
        );
        new AddMenuItemModalButton(
            openAddMenuItemModalButtonPlaceholder
        ).render();
    }

    /**Render Menu Table */
    private renderMenuTable() {
        const menuTablePlaceholder = <HTMLDivElement>(
            document.getElementById('menuTablePlaceholder')
        );
        const menuTable = new MenuTable(menuTablePlaceholder);
        menuTable.render();
    }
}
