import { MenuType } from '../../enums/MenuType';
import { MenuItem, MenuItemProps } from '../MenuItem';

export class DrinkMenuItem extends MenuItem {
    private menuType: MenuType = MenuType.DrinkMenu;
    constructor(props: MenuItemProps) {
        super(props);
    }
}
