/**Menu Select */
const menuTypeSelect = document.querySelector(
    '#menuTypeSelect'
) as HTMLSelectElement;

const foodTypeGroup = document.querySelector(
    '#foodTypeGroup'
) as HTMLDivElement;
const drinkTypeGroup = document.querySelector(
    '#drinkTypeGroup'
) as HTMLDivElement;

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
/**Menu Select */
