import { MenuAPI } from '../../../api/MenuAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { InputComponent } from '../../../components/InputComponent/InputComponent';
import { MenuItem } from '../../../models/interfaces/MenuItem';
import { Bill, BillItem } from '../../../models/interfaces/Bill';
import { formatCurrency } from '../../../utils/formatCurrentcy';
import { BillAPI } from '../../../api/BillAPI';
import { alertMessage } from '../../../components/utils/alertMessage';

interface CreateBillProps {
    menuItemList: MenuItem[];
}

export class CreateBillScreen extends BaseComponent {
    private billTotal: number = 0;
    /* ALL menu item */
    private menuItemList: MenuItem[];
    /* list to add to bill */
    private listItemToAdd: BillItem[] = [];

    constructor(element: HTMLElement, props: CreateBillProps) {
        super(element);

        this.menuItemList = props.menuItemList;
    }
    render(): void {
        this.element.innerHTML = /* html */ `
            <div class="container">
                <div class="row">
                    <div class="col-9">
                        <div id="MenuToAddPlaceholder" class="d-flex flex-wrap gap-1"></div>                   
                    </div>
                    <div class="col-3">
                        <div id="BillToAddPlaceholder"></div>
                    </div>
                </div>
            </div>
        `;

        this.renderMenuToAdd();

        this.renderBillToAdd();
    }

    private async renderMenuToAdd() {
        const MenuToAddPlaceholder = <HTMLDivElement>(
            document.getElementById('MenuToAddPlaceholder')
        );
        MenuToAddPlaceholder.innerHTML = /* html */ `
                ${this.menuItemList
                    .map((item, index) => {
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
                                        }"></div>
                                        <div class="itemAddButtonPlaceholder" data-id="${
                                            item.id
                                        }" data-item='${JSON.stringify(
                            item
                        )}'></div>
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
            const itemId = Number(itemPlaceholder.dataset.id);
            new InputComponent(itemPlaceholder, {
                type: 'number',
                min: 0,
                onChange: (value) => {
                    mapQuantityValue[itemId] = value;
                },
            }).render();
        });

        const itemAddButtonPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.itemAddButtonPlaceholder')
        );
        itemAddButtonPlaceholder.forEach((itemPlaceholder) => {
            const itemId = Number(itemPlaceholder.dataset.id);
            new ButtonComponent(itemPlaceholder, {
                children: /* html */ `
                        <i class="bi bi-plus-circle"></i>
                    `,
                className: 'btn btn-primary',
                onClick: (e: any) => {
                    const menuItem: MenuItem = JSON.parse(
                        e.currentTarget.parentElement.dataset.item
                    );
                    const billQuantity = mapQuantityValue[itemId];

                    /* Create a bill item when click */
                    const billItem: BillItem = {
                        ...menuItem,
                        quantity: billQuantity || 1,
                        total: billQuantity
                            ? billQuantity * menuItem.price
                            : menuItem.price,
                    };

                    /* If bill item doesn't exist then add it, else only change quantity */
                    if (
                        this.listItemToAdd.every(
                            (item) => item.id !== billItem.id
                        )
                    ) {
                        this.listItemToAdd.push(billItem);
                    } else {
                        /* check if quantity input has clicked yet */
                        if (mapQuantityValue[itemId]) {
                            this.listItemToAdd.forEach((item) => {
                                if (item.id === String(itemId)) {
                                    item.quantity = mapQuantityValue[itemId];
                                    item.total = item.quantity * item.price;
                                }
                            });
                        }
                    }

                    this.billTotal = this.listItemToAdd.reduce(
                        (prev: any, currentItem: BillItem) => {
                            return prev + currentItem.total;
                        },
                        0
                    );

                    this.renderBillToAdd();
                },
            }).render();
        });
    }

    private async renderBillToAdd() {
        const BillToAddPlaceholder = <HTMLDivElement>(
            document.getElementById('BillToAddPlaceholder')
        );
        BillToAddPlaceholder.innerHTML = /* html */ `
            <div>
                <h3>Preview</h3>
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
                console.log(this.listItemToAdd);
                const bill: Bill = {
                    customer: 'Duc',
                    createAt: new Date(),
                    id: '',
                    itemList: this.listItemToAdd,
                    total: this.billTotal,
                };

                const billAPI = new BillAPI('bill');
                billAPI
                    .post(bill)
                    .then(() => {
                        alertMessage({
                            type: 'success',
                            title: 'Add bill successful!',
                        });
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
}
