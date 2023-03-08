import uniqid from 'uniqid';
import { uploadImage } from '../../cloudinary/uploadImage';
import { MenuItem, MenuItemProps } from '../../models/MenuItem/MenuItem';
import { MenuType } from '../../models/enums/MenuType';
import { MenuFactory } from '../../models/MenuFactory/MenuFactory';
import { MenuAPI } from '../../api/MenuAPI';
import { Modal, Toast } from 'bootstrap';

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

/**Open modal */
const addMenuItemModal = new Modal(addMenuItemModalElement);
openAddMenuItemModalButtonElement.addEventListener('click', () => {
    addMenuItemModal.show();
});

/**Upload Image */
let imageURLValue: string;
const handleUploadImage = async () => {
    if (imageInputElement.files) {
        submitButtonElement.setAttribute('disabled', '');
        submitButtonElement.classList.add('loading');

        const file = imageInputElement.files[0];
        const res: any = await uploadImage(file);
        imageURLValue = res.secure_url;

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

            console.log(res);
            toastSuccess.show();
            // RESET Form behavior
            submitButtonElement.removeAttribute('disabled');
            submitButtonElement.classList.remove('loading');
            form.reset();
            form.classList.remove('was-validated');
            addMenuItemModal.hide();
        } catch (error) {
            console.log(error);
            toastFail.show();
            // RESET Form behavior
            submitButtonElement.classList.remove('loading');
            submitButtonElement.removeAttribute('disabled');
            form.reset();
            form.classList.remove('was-validated');
            addMenuItemModal.hide();
        }
    }
};
addMenuItemFormElement.addEventListener('submit', handleSubmit);
