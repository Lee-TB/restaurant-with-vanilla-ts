import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css';
import './features/AddProductForm';
import { FoodMenuItem } from './models/MenuItem/FoodMenuItem/FoodMenuItem';
import { FoodType } from './models/enums/FoodType';

const app = <HTMLDivElement>document.querySelector('#app');
const foodItem = new FoodMenuItem(
    'abc',
    'pho',
    'lorem lohost abacw rrs jerfter',
    'url to image',
    12000,
    new Date(),
    FoodType.Breakfast
);
console.log(foodItem);

const menuTypeSelect = <HTMLSelectElement>(
    document.querySelector('#menuTypeSelect')
);
