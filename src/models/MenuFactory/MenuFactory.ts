import { MenuType } from '../enums/MenuType';
import { DrinkMenuItem } from '../MenuItem/DrinkMenuItem/DrinkMenuItem';
import { FoodMenuItem } from '../MenuItem/FoodMenuItem/FoodMenuItem';
import { MenuItem, MenuItemProps } from '../MenuItem/MenuItem';

export class MenuFactory {
    private type: MenuType;
    constructor(type: MenuType) {
        this.type = type;
    }
    public createMenu(props: MenuItemProps): MenuItem {
        switch (this.type) {
            case MenuType.FoodMenu:
                return new FoodMenuItem(props);
            case MenuType.DrinkMenu:
                return new DrinkMenuItem(props);
            default:
                throw new Error('Menu type not available!');
        }
    }
}
