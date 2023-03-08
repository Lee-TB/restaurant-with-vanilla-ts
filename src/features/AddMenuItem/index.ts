import uniqid from 'uniqid';
import { Modal, Toast } from 'bootstrap';
import { uploadImage } from '../../cloudinary/uploadImage';
import { MenuItem, MenuItemProps } from '../../models/MenuItem/MenuItem';
import { MenuType } from '../../models/enums/MenuType';
import { MenuFactory } from '../../models/MenuFactory/MenuFactory';
import { MenuAPI } from '../../api/MenuAPI';
import { renderMenu } from '../showMenu';

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

const imageInputElement = <HTMLInputElement>addMenuItemFormElement.image;

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

/**Upload Image */
let imageURLValue: string;
const handleUploadImage = async () => {
    if (imageInputElement.files) {
        // start loading
        submitButtonElement.setAttribute('disabled', '');
        submitButtonElement.classList.add('loading');

        // get file from input element and upload to cloudinary, then get URL string
        const file = imageInputElement.files[0];
        const res: any = await uploadImage(file);
        imageURLValue = res.secure_url;

        // end loading
        submitButtonElement.removeAttribute('disabled');
        submitButtonElement.classList.remove('loading');
    }
};
imageInputElement.addEventListener('change', handleUploadImage);

/**Submit Form */
const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form: HTMLFormElement = <HTMLFormElement>e.target;
    const toastSuccess = new Toast(liveToastSuccessElement);
    const toastFail = new Toast(liveToastFailElement);
    if (form.checkValidity()) {
        try {
            // start loading
            submitButtonElement.classList.add('loading');
            submitButtonElement.setAttribute('disabled', '');

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
                    (categoryCheckboxChecked) => categoryCheckboxChecked.value
                );

            // Initialize menu item properties
            const props: MenuItemProps = {
                id: idValue,
                name: nameValue,
                price: Number(priceValue),
                description: descriptionValue,
                image: imageURLValue,
                categories: categoryValues,
            };

            // use Factory Method pattern to create a menu item
            let menuItem: MenuItem;
            const menuFactory = new MenuFactory(menuTypeValue); // menuFatory create menu depend on menu type
            menuItem = menuFactory.createMenu(props);

            // call api to post menu menu item
            const menuAPI = new MenuAPI();
            const res = await menuAPI.post(menuItem);

            // notify message success
            console.log(res);
            toastSuccess.show();
            renderMenu(menuTypeValue); // re-render menu

            // reset Form
            submitButtonElement.classList.remove('loading');
            submitButtonElement.removeAttribute('disabled');
            form.reset(); // clear fields
            form.classList.remove('was-validated'); // remove validation
            addMenuItemModal.hide();
        } catch (error) {
            // notify message error
            console.log(error);
            toastFail.show();

            // reset Form
            submitButtonElement.classList.remove('loading');
            submitButtonElement.removeAttribute('disabled');
            form.reset(); // clear fields
            form.classList.remove('was-validated'); // remove validation
            addMenuItemModal.hide();
        }
    }
};
addMenuItemFormElement.addEventListener('submit', handleSubmit);
