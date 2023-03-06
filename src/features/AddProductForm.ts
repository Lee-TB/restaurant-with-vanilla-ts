import { uploadImage } from '../cloudinary/uploadImage';

/**Add product form - Menu Select */
const menuTypeSelect = document.querySelector(
    '#menuTypeSelect'
) as HTMLSelectElement;

const foodTypeGroup = document.querySelector(
    '#foodTypeGroup'
) as HTMLDivElement;
const drinkTypeGroup = document.querySelector(
    '#drinkTypeGroup'
) as HTMLDivElement;

menuTypeSelect.addEventListener('change', () => {
    foodTypeGroup.style.display = 'none';
    drinkTypeGroup.style.display = 'none';
    if (menuTypeSelect.value === 'FoodMenu') {
        foodTypeGroup.style.display = 'block';
    }
    if (menuTypeSelect.value === 'DrinkMenu') {
        drinkTypeGroup.style.display = 'block';
    }
});
/**Add product form - Menu Select */

/**Upload Image */
const imageInput = <HTMLInputElement>document.querySelector('#image');
let imageURL: string;
imageInput.addEventListener('change', async (e) => {
    if (imageInput.files) {
        const file = imageInput.files[0];
        const res: any = await uploadImage(file);
        imageURL = res.secure_url;
    }
});
/**Upload Image */

/**Add product form - FORM Submit */
const addProductButton = document.querySelector(
    '#submit-add-product-button'
) as HTMLFormElement;

addProductButton?.addEventListener('click', () => {
    const nameValue = (<HTMLInputElement>document.querySelector('#name')).value;
    const priceValue = (<HTMLInputElement>document.querySelector('#price'))
        .value;

    const descriptionValue = (<HTMLTextAreaElement>(
        document.querySelector('#description')
    )).value;

    const menuTypeValue = (<HTMLSelectElement>(
        document.querySelector('#menuTypeSelect')
    )).value;

    let categoryValueList: string[] = [];
    if (menuTypeValue === 'FoodMenu') {
        const categoryInputList = <NodeListOf<HTMLInputElement>>(
            document.querySelectorAll('.foodCategoryCheckbox')
        );
        categoryInputList.forEach((input) => {
            if (input.checked) {
                categoryValueList.push(input.value);
            }
        });
    } else if (menuTypeValue === 'DrinkMenu') {
        const categoryInputList = <NodeListOf<HTMLInputElement>>(
            document.querySelectorAll('.drinkCategoryCheckbox')
        );
        categoryInputList.forEach((input) => {
            if (input.checked) {
                categoryValueList.push(input.value);
            }
        });
    }
    const data = {
        name: nameValue,
        price: priceValue,
        description: descriptionValue,
        image: imageURL,
        categories: categoryValueList,
    };
    console.log(data);
});
/**Add product form - FORM Submit */
