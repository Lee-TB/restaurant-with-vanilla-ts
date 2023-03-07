import { DrinkMenuItem } from './models/MenuItem/DrinkMenuItem/DrinkMenuItem';
import { MenuItem } from './models/MenuItem/MenuItem';
import { DrinkType } from './models/enums/DrinkType';

const data: MenuItem[] = [];
data.push(
    new DrinkMenuItem(
        'iewkvnao',
        'iced tea',
        'this is description',
        'https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1-600x600.png',
        12000,
        new Date(),
        DrinkType.Tea
    ),
    new DrinkMenuItem(
        'iewkvnao',
        'iced tea',
        'this is description',
        'https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1-600x600.png',
        12000,
        new Date(),
        DrinkType.Tea
    )
);

export { data };
