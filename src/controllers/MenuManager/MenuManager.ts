import uniqid from 'uniqid';
import { Toast, Modal } from 'bootstrap';

import { uploadImage } from '../../cloudinary/uploadImage';
import { IMenuManager } from './IMenuManager';
import { MenuType } from '../../models/enums/MenuType';
import { MenuItem, MenuItemProps } from '../../models/MenuItem/MenuItem';
import { MenuFactory } from '../../models/MenuFactory/MenuFactory';
import { MenuAPI } from '../../api/MenuAPI';

/**Query DOM */
const addMenuItemFormElement = <HTMLFormElement>(
    document.querySelector('#addMenuItemForm')
);
const addMenuItemModalElement = <HTMLDivElement>(
    document.querySelector('#addMenuItemModal')
);
const openAddMenuItemModalButtonElement = <HTMLButtonElement>(
    document.querySelector('#openAddMenuItemModalButton')
);
const submitButtonElement = <HTMLButtonElement>(
    addMenuItemFormElement.submitButton
);
const liveToastSuccessElement = <HTMLDivElement>(
    document.getElementById('liveToastSuccess')
);
const liveToastFailElement = <HTMLDivElement>(
    document.getElementById('liveToastFail')
);
const menuTypeSelect = <HTMLSelectElement>(
    document.querySelector('#menuTypeSelect')
);
const foodTypeGroup = <HTMLDivElement>document.querySelector('#foodTypeGroup');
const drinkTypeGroup = <HTMLDivElement>(
    document.querySelector('#drinkTypeGroup')
);
const foodTypeCheckboxList = <NodeListOf<HTMLInputElement>>(
    foodTypeGroup.querySelectorAll('input')
);
const drinkTypeCheckboxList = <NodeListOf<HTMLInputElement>>(
    drinkTypeGroup.querySelectorAll('input')
);

/**Change category list when change menu type */
menuTypeSelect.addEventListener('change', () => {
    foodTypeGroup.style.display = 'none';
    drinkTypeGroup.style.display = 'none';
    foodTypeCheckboxList.forEach((checkbox) => {
        checkbox.checked = false;
    });
    drinkTypeCheckboxList.forEach((checkbox) => {
        checkbox.checked = false;
    });
    if (menuTypeSelect.value === 'FoodMenu') {
        foodTypeGroup.style.display = 'block';
    }
    if (menuTypeSelect.value === 'DrinkMenu') {
        drinkTypeGroup.style.display = 'block';
    }
});

/**Open modal */
const addMenuItemModal = new Modal(addMenuItemModalElement);
openAddMenuItemModalButtonElement.addEventListener('click', () => {
    addMenuItemModal.show();
});

export class MenuManager implements IMenuManager {
    private imageURLValue: string = '';

    /**add Menu Item */
    public createMenuItem(): void {
        this.renderMenu(MenuType.DrinkMenu);
    }

    /**update Menu Item */
    public updateMenuItem(id: number): void {}

    /**delete Menu Item */
    public deleteMenuItem(id: number): void {}

    /**show Menu */
    public async renderMenu(type: MenuType): Promise<void> {
        const menuTable = <HTMLTableElement>(
            document.querySelector('#menuTable')
        );
        try {
            const menuAPI = new MenuAPI('menu');
            const res: any = await menuAPI.getAll();
            const data: any[] = await res.json();
            let dataAfterFilter: any[] = [];
            if (type === MenuType.FoodMenu) {
                dataAfterFilter = data.filter(
                    (item) => item.menuType === 'FoodMenu'
                );
            } else if (type === MenuType.DrinkMenu) {
                dataAfterFilter = data.filter(
                    (item) => item.menuType === 'DrinkMenu'
                );
            }
            const rows = dataAfterFilter
                .map((item: any) => {
                    return /*html*/ `
                    <tr>
                        <td>
                            ${item.id}
                        </td>
                        <td>
                            <img src="${
                                item.image
                            }" alt="" style="width: 100px">
                        </td>
                        <td>
                        ${item.name}
                        </td>
                        <td>${item.price}</td>
                        <td>${item.categories.join(', ')}</td>
                        <td>${new Date(item.createAt).toLocaleString()}</td>
                        <td>
                            <button class="btn btn-warning updateMenuItemButton" data-menu-item-id="${
                                item.id
                            }"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger deleteMenuItemButton" data-menu-item-id="${
                                item.id
                            }"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    `;
                })
                .join('');
            menuTable.tBodies[0].innerHTML = rows;
        } catch (error) {
            console.log(error);
        }
    }

    /**Upload image */
    public async handleUploadImage(e: any) {
        const imageInputElement = e.target;
        if (imageInputElement.files) {
            this.submitButtonLoading(true); // start loading

            // get file from input element and upload to cloudinary, then get URL string
            const file = imageInputElement.files[0];
            const res: any = await uploadImage(file);
            this.imageURLValue = res.secure_url;

            this.submitButtonLoading(false); //end loading
        }
    }

    /**Submit Form */
    public async handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const form: HTMLFormElement = <HTMLFormElement>e.target;
        const toastSuccess = new Toast(liveToastSuccessElement);
        const toastFail = new Toast(liveToastFailElement);
        if (form.checkValidity()) {
            try {
                this.submitButtonLoading(true);
                // get form values from UI
                const idValue = uniqid();
                const nameValue = (<HTMLInputElement>form.elements[0]).value;
                const priceValue = (<HTMLInputElement>form.elements[1]).value;
                const descriptionValue = (<HTMLTextAreaElement>form.elements[3])
                    .value;
                const menuTypeValue: MenuType = <MenuType>(
                    (<HTMLInputElement>form.elements[4]).value
                );
                const categoryElements = <NodeListOf<HTMLInputElement>>(
                    form.querySelectorAll('.menuItemCategories')
                );
                const categoryValues = Array.from(categoryElements)
                    .filter((categoryCheckbox) => categoryCheckbox.checked)
                    .map(
                        (categoryCheckboxChecked) =>
                            categoryCheckboxChecked.value
                    );

                // Initialize menu item properties
                const props: MenuItemProps = {
                    id: idValue,
                    name: nameValue,
                    price: Number(priceValue),
                    description: descriptionValue,
                    image: this.imageURLValue,
                    categories: categoryValues,
                };

                // use Factory Method pattern to create a menu item
                let menuItem: MenuItem;
                const menuFactory = new MenuFactory(menuTypeValue); // menuFatory create menu depend on menu type
                menuItem = menuFactory.createMenu(props);

                // call api to post menu menu item
                const menuAPI = new MenuAPI('menu');
                const res: any = await menuAPI.post(menuItem);

                if (res?.ok) {
                    // notify message success
                    toastSuccess.show();
                    this.renderMenu(menuTypeValue); // re-render menu

                    // reset Form
                    this.resetForm(form);
                    this.submitButtonLoading(false);
                    addMenuItemModal.hide(); // close modal
                }
            } catch (error) {
                // notify message error
                console.log(error);
                toastFail.show();

                // reset Form
                this.resetForm(form);
                this.submitButtonLoading(false);
                addMenuItemModal.hide(); // close modal
            }
        }
    }

    private resetForm(form: HTMLFormElement) {
        form.reset(); // clear fields
        form.classList.remove('was-validated'); // remove validation
    }

    private submitButtonLoading(start: boolean) {
        if (start) {
            submitButtonElement.classList.add('loading');
            submitButtonElement.setAttribute('disabled', '');
        } else {
            submitButtonElement.classList.remove('loading');
            submitButtonElement.removeAttribute('disabled');
        }
    }
}
