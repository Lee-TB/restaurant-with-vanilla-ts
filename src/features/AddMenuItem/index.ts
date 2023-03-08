import './interactive';
import './AddMenuItemFormSubmit';
// import { MenuAPI } from '../../api/MenuAPI';
// import { uploadImage } from '../../cloudinary/uploadImage';
// import { MenuType } from '../../models/enums/MenuType';
// import { MenuFactory } from '../../models/MenuFactory/MenuFactory';
// import { MenuItem, MenuItemProps } from '../../models/MenuItem/MenuItem';

// /**Query DOM */
// const addProductButton = document.querySelector(
//     '#submit-add-product-button'
// ) as HTMLFormElement;

// const imageInput = <HTMLInputElement>document.querySelector('#image');
// const addProductButtonLoading = <HTMLDivElement>(
//     addProductButton.querySelector('.lds-ring')
// );
// /**Query DOM */

// /**Upload Image */
// let imageURL: string;
// imageInput.addEventListener('change', async (e) => {
//     if (imageInput.files) {
//         addProductButton.setAttribute('disabled', '');
//         addProductButtonLoading.style.display = 'inline-block';
//         const file = imageInput.files[0];
//         const res: any = await uploadImage(file);
//         imageURL = res.secure_url;
//         addProductButton.removeAttribute('disabled');
//         addProductButtonLoading.style.display = 'none';
//     }
// });
// /**Upload Image */

// /**FORM Submit */
// addProductButton?.addEventListener('click', handleAddProduct);
// function handleAddProduct() {
//     const nameValue = (<HTMLInputElement>document.querySelector('#name')).value;
//     const priceValue = (<HTMLInputElement>document.querySelector('#price'))
//         .value;

//     const descriptionValue = (<HTMLTextAreaElement>(
//         document.querySelector('#description')
//     )).value;

//     const menuTypeValue = <MenuType>(
//         (<HTMLSelectElement>document.querySelector('#menuTypeSelect')).value
//     );

//     let categoryValueList: string[] = [];
//     if (menuTypeValue === MenuType.FoodMenu) {
//         const categoryInputList = <NodeListOf<HTMLInputElement>>(
//             document.querySelectorAll('.foodCategoryCheckbox')
//         );
//         categoryInputList.forEach((input) => {
//             if (input.checked) {
//                 categoryValueList.push(input.value);
//             }
//         });
//     } else if (menuTypeValue === MenuType.DrinkMenu) {
//         const categoryInputList = <NodeListOf<HTMLInputElement>>(
//             document.querySelectorAll('.drinkCategoryCheckbox')
//         );
//         categoryInputList.forEach((input) => {
//             if (input.checked) {
//                 categoryValueList.push(input.value);
//             }
//         });
//     }

//     const values: MenuItemProps = {
//         id: '12345',
//         name: nameValue,
//         price: Number(priceValue),
//         description: descriptionValue,
//         image: imageURL,
//         categories: categoryValueList,
//     };

//     let menuItem: MenuItem;
//     const menuFactory = new MenuFactory(menuTypeValue);
//     menuItem = menuFactory.createMenu(values);

//     console.log('click submit');
//     // console.log(menuItem);
//     // const menuAPI = new MenuAPI();
//     // const res = menuAPI.post(menuItem);
//     // console.log();
// }
// /**FORM Submit */

// const addMenuItemForm = <HTMLFormElement>(
//     document.querySelector('#addMenuItemForm')
// );
// addMenuItemForm.addEventListener('submit', () => {
//     console.log('submit form');
// });
