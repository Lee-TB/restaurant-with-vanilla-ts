import { MenuAPI } from '../../../api/MenuAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { InputComponent } from '../../../components/InputComponent/InputComponent';
import { MenuItem } from '../../../models/interfaces/MenuItem';

export class CreateBill extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        this.element.innerHTML = /* html */ `
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <div id="MenuToAddPlaceholder" class="d-flex flex-wrap gap-1">                        
                    </div>
                    <div class="col-4">

                    </div>
                </div>
            </div>
        `;

        this.renderMenuToAdd();
    }

    private async renderMenuToAdd() {
        const menuAPI = new MenuAPI('foodmenu');
        const res = await menuAPI.getAll();
        const data: MenuItem[] = await res.json();

        const MenuToAddPlaceholder = <HTMLDivElement>(
            document.getElementById('MenuToAddPlaceholder')
        );
        MenuToAddPlaceholder.innerHTML = data
            .map((item) => {
                return /* html */ `
            <div class="card" style="width: 18rem;">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.price}</p>
                </div>
                <div class="card-body d-flex gap-1">
                    <div class="itemQuantityPlaceholder"></div>
                    <div class="itemAddButtonPlaceholder"></div>
                </div>
            </div>
            `;
            })
            .join('');

        /* Render Quantity Input */
        const itemQuantityPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.itemQuantityPlaceholder')
        );
        itemQuantityPlaceholder.forEach((itemPlaceholder) => {
            new InputComponent(itemPlaceholder, {
                type: 'number',
                min: 0,
            }).render();
        });

        const itemAddButtonPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.itemAddButtonPlaceholder')
        );
        itemAddButtonPlaceholder.forEach((itemPlaceholder) => {
            new ButtonComponent(itemPlaceholder, {
                children: /* html */ `
                        <i class="bi bi-plus-circle"></i>
                    `,
                className: 'btn btn-primary',
            }).render();
        });
    }
}
