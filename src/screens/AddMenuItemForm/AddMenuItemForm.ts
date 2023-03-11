import uniqid from 'uniqid';
import { Modal } from 'bootstrap';
import { html } from './htmlElement';
import { bootstrapFormValidation } from '../../utils/bootstrap/bootstrapFormValidation';
import { uploadImage } from '../../utils/cloudinary/uploadImage';
import { BaseComponent } from '../../components/BaseComponent';
import { MenuType } from '../../models/enums/MenuType';
import { MenuItem, MenuItemProps } from '../../models/MenuItem/MenuItem';
import { MenuFactory } from '../../models/MenuFactory/MenuFactory';
import { MenuAPI } from '../../api/MenuAPI';
import { alertMessage } from '../../components/utils/alertMessage';
import { MenuTable } from '../../pages/MenuPage/screens/MenuTable';
import { MenuTabs } from '../../pages/MenuPage/screens/MenuTabs';

export class AddMenuItemForm extends BaseComponent {
    private formElement?: HTMLFormElement;
    private imageInputElement?: HTMLInputElement;
    private submitButtonElement?: HTMLButtonElement;
    private imageURLValue?: string;
    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        this.element.innerHTML = html;

        /* Query elements */
        this.formElement = <HTMLFormElement>(
            document.getElementById('addMenuItemForm')
        );
        this.imageInputElement = this.formElement.image;
        this.submitButtonElement = <HTMLButtonElement>(
            document.getElementById('submitMenuItemButton')
        );

        /**Events */
        /* Upload image */
        this.imageInputElement?.addEventListener(
            'change',
            this.handleUploadImage.bind(this)
        );

        /* Submit form */
        this.formElement.addEventListener(
            'submit',
            this.handleSubmit.bind(this)
        );

        /* Change category list when change menu type */
        this.changeCategoryList();

        bootstrapFormValidation();
    }

    /**Submit Form */
    private async handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const form: HTMLFormElement = <HTMLFormElement>e.target;
        if (form.checkValidity()) {
            try {
                this.submitButtonLoading(true);

                /* Form values from UI */
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
                    image: this.imageURLValue || '',
                    categories: categoryValues,
                };

                /* Use Factory Method pattern to create a menu item */
                let menuItem: MenuItem;
                const menuFactory = new MenuFactory(menuTypeValue); // menuFatory create menu depend on menu type
                menuItem = menuFactory.createMenu(props);

                /* Call API to post menu menu item */
                const menuAPI = new MenuAPI('menu');
                const res: any = await menuAPI.post(menuItem);

                if (res?.ok) {
                    /* Notify message success */
                    alertMessage({
                        type: 'success',
                        title: `Add menu item successful!`,
                        content: `Add ${menuItem.getName()} successful!`,
                    });

                    this.resetForm(form);

                    this.submitButtonLoading(false);

                    /* Close modal */
                    const addMenuItemModal = <HTMLDivElement>(
                        document.getElementById('addMenuItemModal')
                    );
                    Modal.getInstance(addMenuItemModal)?.hide();

                    /* Re-render MenuTable and MenuTabs */
                    this.renderMenuTable(menuTypeValue);
                    this.renderMenuTabs(menuTypeValue);
                }
            } catch (error) {
                /* Notify message error */
                alertMessage({
                    type: 'error',
                    title: `Add menu item failure!`,
                    content: '',
                });
                console.log(error);

                this.resetForm(form);

                this.submitButtonLoading(false);
            }
        }
    }

    /**renderMenuTable */
    private renderMenuTable(type: MenuType) {
        const menuTableElement = <HTMLDivElement>(
            document.getElementById('menuTableElement')
        );
        const menuTable = new MenuTable(menuTableElement);
        menuTable.setMenuType(type);
        menuTable.render();
    }

    private renderMenuTabs(type: MenuType) {
        const menuTabsPlaceholder = <HTMLDivElement>(
            document.getElementById('menuTabsPlaceholder')
        );
        const menuTabs = new MenuTabs(menuTabsPlaceholder);
        menuTabs.render();
        menuTabs.switchByMenuType(type);
    }

    /**Reset form after submit successful */
    private resetForm(form: HTMLFormElement) {
        form.reset();
        form.classList.remove('was-validated'); // clear validation
    }

    /**Upload image to Cloudinary and return a string URL */
    public async handleUploadImage(e: any) {
        const imageInputElement = e.target;
        if (imageInputElement.files) {
            this.submitButtonLoading(true);

            /* Get file from input element and upload to cloudinary, then get URL string */
            const file = imageInputElement.files[0];
            const res: any = await uploadImage(file);
            this.imageURLValue = res.secure_url;

            this.submitButtonLoading(false);
        }
    }

    /**Submit button will be loading when upload image, or submit form */
    private submitButtonLoading(start: boolean) {
        if (start) {
            this.submitButtonElement?.classList.add('loading');
            this.submitButtonElement?.setAttribute('disabled', '');
        } else {
            this.submitButtonElement?.classList.remove('loading');
            this.submitButtonElement?.removeAttribute('disabled');
        }
    }

    /**Change category list when change menu type */
    private changeCategoryList() {
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
