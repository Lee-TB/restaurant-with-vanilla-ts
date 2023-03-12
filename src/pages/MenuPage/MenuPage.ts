import { BaseComponent } from '../../components/BaseComponent';
import { MenuTableScreen } from './screens/MenuTableScreen';
import { NavComponent } from '../../components/NavComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { ModalComponent } from '../../components/ModalComponent';
import { MenuAPI, MenuEndpoint } from '../../api/MenuAPI';
import { MenuFormScreen } from './screens/MenuFormScreen';

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
                <div id="addMenuButtonPlaceholder"></div>                    
                </div>
                <div id="menuTablePlaceholder"></div>                
            </section>
        `;

        this.element.innerHTML = html;

        MenuPage.renderMenuTabs('foodmenu');

        this.renderAddMenuButton();

        MenuPage.renderMenuTable('foodmenu');
    }

    /**Render Menu Tabs */
    public static renderMenuTabs(activeKey: 'foodmenu' | 'drinkmenu') {
        const menuTabsPlaceholder = <HTMLDivElement>(
            document.getElementById('menuTabsPlaceholder')
        );
        const menuTabs = new NavComponent(menuTabsPlaceholder, {
            type: 'tab',
            activeKey: activeKey,
            items: [
                {
                    key: 'foodmenu',
                    label: /* html */ `
                        <span>Food Menu </span>
                        <i class="bi bi-egg-fried"></i>
                    `,
                },
                {
                    key: 'drinkmenu',
                    label: /* html */ `
                        <span>Drink Menu </span>
                        <i class="bi bi-cup-straw"></i>
                    `,
                },
            ],
            /* Tabs change */
            onChange: (activeKey) => {
                MenuPage.renderMenuTable(<MenuEndpoint>activeKey.toLowerCase());
            },
        });
        menuTabs.render();
    }

    /**Render Add Menu Item Modal Button */
    private renderAddMenuButton() {
        const addMenuButtonPlaceholder = <HTMLDivElement>(
            document.getElementById('addMenuButtonPlaceholder')
        );

        const buttonComponent = new ButtonComponent(addMenuButtonPlaceholder, {
            className: 'btn btn-primary',
            children: /* html */ `
                    <span>Add</span>
                    <i class="bi bi-plus-circle"></i>
                `,
            onClick: () => {
                const modalPlaceholder = <HTMLElement>(
                    document.getElementById('modalPlaceholder')
                );

                new ModalComponent(modalPlaceholder, {
                    setTitle: (element) => {
                        element.innerHTML = 'Add Menu';
                    },
                    setBody: (element) => {
                        new MenuFormScreen(element, { type: 'add' }).render();
                    },
                }).render();
                ModalComponent.show();
            },
        });
        buttonComponent.render();
    }

    /**Render Menu Table */
    public static async renderMenuTable(endpoint: MenuEndpoint) {
        try {
            const res = await new MenuAPI(endpoint).getAll();
            const data = await res.json();

            const menuTablePlaceholder = <HTMLDivElement>(
                document.getElementById('menuTablePlaceholder')
            );
            const menuTableScreen = new MenuTableScreen(menuTablePlaceholder, {
                data: data,
            });
            menuTableScreen.render();
        } catch (error) {
            console.log('Render Menu Table Error', error);
        }
    }
}
