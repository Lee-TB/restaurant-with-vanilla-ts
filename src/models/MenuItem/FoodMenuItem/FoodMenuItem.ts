import { MenuType } from '../../enums/MenuType';
import { MenuItem, MenuItemProps } from '../MenuItem';

export class FoodMenuItem extends MenuItem {
    private menuType: MenuType = MenuType.FoodMenu;
    constructor(props: MenuItemProps) {
        super(props);
    }
}
