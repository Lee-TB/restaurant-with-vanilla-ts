import { BaseComponent } from '../../../components/BaseComponent';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { InputComponent } from '../../../components/InputComponent/InputComponent';
import { MenuItem } from '../../../models/interfaces/MenuItem';
import { Bill, BillMenuItem } from '../../../models/interfaces/Bill';
import { formatCurrency } from '../../../utils/formatCurrentcy';
import { BillAPI } from '../../../api/BillAPI';
import { alertMessage } from '../../../components/utils/alertMessage';
import { NavComponent } from '../../../components/NavComponent';
import { MenuAPI } from '../../../api/MenuAPI';
import { BillPage } from '../BillPage';

interface CreateBillProps {
    menuItemList: MenuItem[];
}

export class CreateBillScreen extends BaseComponent {
    private bill: Bill;
    private billTotal: number = 0;

    /* ALL menu item */
    private menuItemList: MenuItem[];

    /* list to add to bill */
    private listItemToAdd: BillMenuItem[] = [];

    constructor(element: HTMLElement, props: CreateBillProps) {
        super(element);

        this.menuItemList = props.menuItemList;
        this.bill = {
            customer: '',
            createAt: new Date(),
            id: '',
            itemList: [],
            total: 0,
        };
    }

    render(): void {
        this.element.innerHTML = /* html */ `
            <div id="billMenuTabsPlaceholder" class="mb-2"></div>  
            <div class="row">
                <div class="col-9">
                    <div id="billMenuListPlaceholder" class="d-flex flex-wrap gap-1"></div>                   
                </div>
                <div class="col-3">
                    <div id="billPreviewPlaceholder"></div>
                </div>
            </div>
        `;

        this.renderTabs();

        this.renderMenuList();

        this.renderBillPreview();
    }

    private renderTabs() {
        const billMenuTabsPlaceholder = <HTMLDivElement>(
            document.getElementById('billMenuTabsPlaceholder')
        );
        new NavComponent(billMenuTabsPlaceholder, {
            items: [
                {
                    key: 'foodmenu',
                    label: 'Food Menu',
                },
                {
                    key: 'drinkmenu',
                    label: 'Drink Menu',
                },
            ],
            type: 'pill',
            onChange: (activeKey) => {
                const menuAPI = new MenuAPI(
                    <'foodmenu' | 'drinkmenu'>activeKey
                );
                menuAPI
                    .getAll()
                    .then((res) => res.json())
                    .then((data) => {
                        this.menuItemList = data;
                        this.renderMenuList();
                    });
            },
        }).render();
    }

    private async renderMenuList() {
        const billMenuListPlaceholder = <HTMLDivElement>(
            document.getElementById('billMenuListPlaceholder')
        );
        billMenuListPlaceholder.innerHTML = /* html */ `
                ${this.menuItemList
                    .map((item) => {
                        return /* html */ `                
                                <div class="card" style="width: 18rem;">
                                    <img src="${
                                        item.image
                                    }" class="card-img-top" alt="${item.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                        <p class="card-text">${formatCurrency(
                                            item.price,
                                            'VND'
                                        )}</p>
                                    </div>
                                    <div class="card-body d-flex gap-1">
                                        <div class="itemQuantityPlaceholder" data-id="${
                                            item.id
                                        }" data-menu-type="${
                            item.menuType
                        }"></div>
                                        <div class="itemAddButtonPlaceholder" data-id="${
                                            item.id
                                        }" data-item='${JSON.stringify(
                            item
                        )}' data-menu-type="${item.menuType}"></div>
                                    </div>
                                </div>                
                        `;
                    })
                    .join('')}
            </div>
        `;

        const mapQuantityValue: any = {};

        /* Render Quantity Input */
        const itemQuantityPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.itemQuantityPlaceholder')
        );
        itemQuantityPlaceholder.forEach((itemPlaceholder) => {
            const itemId = String(itemPlaceholder.dataset.id);
            const menuType = String(itemPlaceholder.dataset.menuType);

            new InputComponent(itemPlaceholder, {
                type: 'number',
                min: 1,
                onChange: (value) => {
                    mapQuantityValue[itemId + menuType] = value;
                },
            }).render();
        });

        const itemAddButtonPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.itemAddButtonPlaceholder')
        );
        itemAddButtonPlaceholder.forEach((itemPlaceholder) => {
            const itemId = String(itemPlaceholder.dataset.id);
            const menuType = String(itemPlaceholder.dataset.menuType);

            new ButtonComponent(itemPlaceholder, {
                children: /* html */ `
                        <i class="bi bi-plus-circle"></i>
                    `,
                className: 'btn btn-primary',
                onClick: (e: any) => {
                    const menuItem: MenuItem = JSON.parse(
                        e.currentTarget.parentElement.dataset.item
                    );
                    const billQuantity = mapQuantityValue[itemId + menuType];

                    /* Create a bill item when click */
                    const billItem: BillMenuItem = {
                        ...menuItem,
                        quantity: billQuantity || 1,
                        total: billQuantity
                            ? billQuantity * menuItem.price
                            : menuItem.price,
                    };

                    /* If it existing in array, just only calculate it's quantity and total */
                    if (
                        this.listItemToAdd.some(
                            (item) =>
                                item.id === billItem.id &&
                                item.menuType === billItem.menuType
                        )
                    ) {
                        const foundedIndex = this.listItemToAdd.findIndex(
                            (item) =>
                                item.id === billItem.id &&
                                item.menuType === billItem.menuType
                        );
                        this.listItemToAdd[foundedIndex].quantity =
                            mapQuantityValue[itemId + menuType] || 1;
                        this.listItemToAdd[foundedIndex].total =
                            this.listItemToAdd[foundedIndex].quantity *
                            this.listItemToAdd[foundedIndex].price;
                    } else {
                        this.listItemToAdd.push(billItem);
                    }

                    /* Calculate bill total */
                    this.billTotal = this.listItemToAdd.reduce(
                        (prev: any, currentItem: BillMenuItem) => {
                            return prev + currentItem.total;
                        },
                        0
                    );

                    this.renderBillPreview();
                },
            }).render();
        });
    }

    private async renderBillPreview() {
        const billPreviewPlaceholder = <HTMLDivElement>(
            document.getElementById('billPreviewPlaceholder')
        );
        billPreviewPlaceholder.innerHTML = /* html */ `
            <div>
                <h3>Preview</h3>
                <div id="customerInputPlaceholder" class='mb-2'></div>
                <ul class="list-group" id="billPreviewList">
                    ${this.listItemToAdd
                        .map((item) => {
                            return /* html */ `
                                <li class="list-group-item billPreviewItem d-flex gap-2 flex-1">
                                    <div class='flex-fill'>
                                        <img src="${item.image}" alt="${
                                item.name
                            }" style="width: 50px">
                                        <p>${item.name}</p>
                                    </div>
                                    <div class='flex-fill'>
                                        <p>${formatCurrency(
                                            item.price,
                                            'VND'
                                        )}</p>
                                        <p>x ${item.quantity}</p>
                                    </div>
                                </li>
                            `;
                        })
                        .join('')}
                </ul>
                <p><strong>Total: </strong><span>${formatCurrency(
                    this.billTotal,
                    'VND'
                )}</span></p>
                <div id="AddBillButtonPlaceholder" class="mt-3"></div>
            </div>
        `;

        this.renderCustomerInput();

        this.renderAddButton();
    }

    private renderAddButton() {
        const AddBillButtonPlaceholder = <HTMLDivElement>(
            document.getElementById('AddBillButtonPlaceholder')
        );
        new ButtonComponent(AddBillButtonPlaceholder, {
            children: `Add Bill`,
            className: 'btn btn-primary',
            onClick: () => {
                this.bill = {
                    ...this.bill,
                    createAt: new Date(),
                    itemList: this.listItemToAdd,
                    total: this.billTotal,
                };

                console.log(this.bill);

                const billAPI = new BillAPI('bill');
                billAPI
                    .post(this.bill)
                    .then(() => {
                        alertMessage({
                            type: 'success',
                            title: 'Add bill successful!',
                        });
                        BillPage.renderBillList();
                        BillPage.renderBillTabs('BillList');
                    })
                    .catch((error) => {
                        console.log('Add bill error: ', error);
                        alertMessage({
                            type: 'error',
                            title: 'Add bill Failure!',
                        });
                    });
            },
        }).render();
    }

    private renderCustomerInput() {
        const customerInputPlaceholder = <HTMLInputElement>(
            document.getElementById('customerInputPlaceholder')
        );

        new InputComponent(customerInputPlaceholder, {
            type: 'text',
            label: `Customer's Name`,
            onChange: (value) => {
                this.bill.customer = value.trim();
            },
        }).render();
    }
}
