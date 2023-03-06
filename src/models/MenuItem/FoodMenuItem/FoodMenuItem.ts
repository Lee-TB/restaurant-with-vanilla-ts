import { MenuType } from '../../enums/MenuType';
import { FoodType } from '../../enums/FoodType';
import { MenuItem } from '../MenuItem';

export class FoodMenuItem extends MenuItem {
    private menuType: MenuType = MenuType.FoodMenu;
    private foodType: FoodType;
    constructor(
        id: string,
        name: string,
        description: string,
        image: string,
        price: number,
        createAt: Date,
        foodType: FoodType
    ) {
        super(id, name, description, image, price, createAt);
        this.foodType = foodType;
    }
}
