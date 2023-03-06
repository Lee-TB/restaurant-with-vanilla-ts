import { MenuType } from '../../enums/MenuType';
import { DrinkType } from '../../enums/DrinkType';
import { MenuItem } from '../MenuItem';

export class DrinkMenuItem extends MenuItem {
    private menuType: MenuType = MenuType.DrinkMenu;
    private dinkType: DrinkType;
    constructor(
        id: string,
        name: string,
        description: string,
        image: string,
        price: number,
        createAt: Date,
        drinkType: DrinkType
    ) {
        super(id, name, description, image, price, createAt);
        this.dinkType = drinkType;
    }
}
