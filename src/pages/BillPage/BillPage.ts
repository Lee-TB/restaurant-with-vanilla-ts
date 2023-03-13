import { MenuAPI } from '../../api/MenuAPI';
import { BaseComponent } from '../../components/BaseComponent';
import { NavComponent } from '../../components/NavComponent';
import { CreateBillScreen } from './screens/CreateBillSreen';
import { MenuItem } from '../../models/interfaces/MenuItem';
import { BillListScreen } from './screens/BillListScreen';

export class BillPage extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        const html = /*html */ `
            <section id="bill">
                <h2>Bill Management</h2>
                <div id="billTabsPlaceholder" class="mb-3"></div>
                <div id="billBodyPlaceholder"></div>
            </section>
        `;

        this.element.innerHTML = html;

        this.renderBillTabs();

        this.renderCreateBill();
    }

    private renderBillTabs() {
        const billTabsPlaceholder = <HTMLDivElement>(
            document.getElementById('billTabsPlaceholder')
        );
        const billTabsComponent = new NavComponent(billTabsPlaceholder, {
            type: 'tab',
            activeKey: 'CreateBill',
            items: [
                {
                    key: 'CreateBill',
                    label: /* html */ `
                        <span>Create Bill </span>
                        <i class="bi bi-plus-circle"></i>
                    `,
                },
                {
                    key: 'BillList',
                    label: /* html */ `
                        <span>Bill List </span>
                        <i class="bi bi-list-ul"></i>
                    `,
                },
            ],
            /* Tabs change */
            onChange: (activeKey) => {
                if (activeKey === 'CreateBill') {
                    this.renderCreateBill();
                } else if (activeKey === 'BillList') {
                    this.renderBillList();
                }
            },
        });
        billTabsComponent.render();
    }

    private async renderCreateBill() {
        const menuAPI = new MenuAPI('foodmenu');
        const res = await menuAPI.getAll();
        const data: MenuItem[] = await res.json();
        const billBodyPlaceholder = <HTMLDivElement>(
            document.getElementById('billBodyPlaceholder')
        );

        new CreateBillScreen(billBodyPlaceholder, {
            menuItemList: data,
        }).render();
    }

    private renderBillList() {
        const billBodyPlaceholder = <HTMLDivElement>(
            document.getElementById('billBodyPlaceholder')
        );

        new BillListScreen(billBodyPlaceholder).render();
    }
}
