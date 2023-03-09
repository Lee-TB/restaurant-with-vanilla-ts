import uniqid from 'uniqid';
import { uploadImage } from '../utils/cloudinary/uploadImage';
import { BaseComponent } from './BaseComponent';
import { MenuType } from '../models/enums/MenuType';
import { MenuItem, MenuItemProps } from '../models/MenuItem/MenuItem';
import { MenuFactory } from '../models/MenuFactory/MenuFactory';
import { MenuAPI } from '../api/MenuAPI';

export class AddMenuItemForm extends BaseComponent {
    private formElement?: HTMLFormElement;
    private menuTable?: HTMLTableElement;
    private imageURLValue?: string;
    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        const html = /*html */ `
            <form
                class="row g-3 needs-validation"
                id="addMenuItemForm"
                novalidate
            >
                <div class="col-md-12">
                    <label for="name" class="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        required
                    />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Please fill this field!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="price" class="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="price"
                        name="price"
                        required
                    />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Please fill this field!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="image" class="form-label">
                        <span>Image</span>
                    </label>
                    <input
                        class="form-control"
                        type="file"
                        id="image"
                        name="image"
                        required
                    />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Please fill this field!
                    </div>
                </div>
                <div class="col-12">
                    <label for="description" class="form-label">
                        Description
                    </label>
                    <textarea
                        class="form-control"
                        id="description"
                        rows="3"
                        name="description"
                    ></textarea>
                </div>
                <div class="col-12">
                    <label
                        for="menuTypeSelect"
                        class="form-label"
                    >
                        Menu Type
                    </label>
                    <select
                        id="menuTypeSelect"
                        class="form-select"
                        name="menuType"
                    >
                        <option value="FoodMenu">
                            Food Menu
                        </option>
                        <option value="DrinkMenu">
                            Drink Menu
                        </option>
                    </select>
                </div>
                <div class="col-12">
                    <div id="foodTypeGroup">
                        <p>Food Type</p>
                        <div class="d-flex gap-3">
                            <div class="form-check">
                                <input
                                    class="menuItemCategories form-check-input foodCategoryCheckbox"
                                    type="checkbox"
                                    value="Breakfast"
                                    id="breakfastCheckbox"
                                />
                                <label
                                    class="form-check-label"
                                    for="breakfastCheckbox"
                                >
                                    Breakfast
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="menuItemCategories form-check-input foodCategoryCheckbox"
                                    type="checkbox"
                                    value="Lunch"
                                    id="lunchCheckbox"
                                />
                                <label
                                    class="form-check-label"
                                    for="lunchCheckbox"
                                >
                                    Lunch
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="menuItemCategories form-check-input foodCategoryCheckbox"
                                    type="checkbox"
                                    value="Dinner"
                                    id="dinnerCheckbox"
                                />
                                <label
                                    class="form-check-label"
                                    for="dinnerCheckbox"
                                >
                                    Dinner
                                </label>
                            </div>
                        </div>
                    </div>

                    <div id="drinkTypeGroup">
                        <p>Drink Type</p>
                        <div class="d-flex gap-3">
                            <div class="form-check">
                                <input
                                    class="menuItemCategories form-check-input drinkCategoryCheckbox"
                                    type="checkbox"
                                    value="SoftDrink"
                                    id="softDrinkCheckbox"
                                />
                                <label
                                    class="form-check-label"
                                    for="softDrinkCheckbox"
                                >
                                    Soft Drink
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="menuItemCategories form-check-input drinkCategoryCheckbox"
                                    type="checkbox"
                                    value="Alcohol"
                                    id="alcoholCheckbox"
                                />
                                <label
                                    class="form-check-label"
                                    for="alcoholCheckbox"
                                >
                                    Alcohol
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-12 d-flex justify-content-end gap-3"
                >
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        id="submitMenuItemButton"
                        name="submitButton"
                        class="btn btn-primary"
                    >
                        <span>Add</span>
                        <i class="bi bi-plus"></i>
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </button>
                </div>
            </form>
        `;

        this.element.innerHTML = html;

        // Query form element
        this.formElement = <HTMLFormElement>(
            document.getElementById('addMenuItemForm')
        );

        this.changeCategoryList();
    }

    /**Submit Form */
    private async handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const form: HTMLFormElement = <HTMLFormElement>e.target;
        // const toastSuccess = new Toast(liveToastSuccessElement);
        // const toastFail = new Toast(liveToastFailElement);
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
                    // toastSuccess.show();
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

    /**Reset form after submit successful */
    private resetForm(form: HTMLFormElement) {
        form.reset(); // clear fields
        form.classList.remove('was-validated'); // remove validation
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

    /**Submit button will be loading when upload image, or submit form */
    private submitButtonLoading(start: boolean) {
        const submitButtonElement = <HTMLButtonElement>(
            document.getElementById('submitMenuItemButton')
        );
        if (start) {
            submitButtonElement.classList.add('loading');
            submitButtonElement.setAttribute('disabled', '');
        } else {
            submitButtonElement.classList.remove('loading');
            submitButtonElement.removeAttribute('disabled');
        }
    }

    /**Change category list when change menu type */
    changeCategoryList() {
        const menuTypeSelect = <HTMLSelectElement>(
            document.querySelector('#menuTypeSelect')
        );
        const foodTypeGroup = <HTMLDivElement>(
            document.querySelector('#foodTypeGroup')
        );
        const drinkTypeGroup = <HTMLDivElement>(
            document.querySelector('#drinkTypeGroup')
        );
        const foodTypeCheckboxList = <NodeListOf<HTMLInputElement>>(
            foodTypeGroup.querySelectorAll('input')
        );
        const drinkTypeCheckboxList = <NodeListOf<HTMLInputElement>>(
            drinkTypeGroup.querySelectorAll('input')
        );
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
    }
}
