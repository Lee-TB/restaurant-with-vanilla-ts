import { MenuItem } from '../MenuItem';

export abstract class DrinkMenuItem extends MenuItem {
    constructor(
        id: string,
        name: string,
        description: string,
        image: string,
        price: number,
        createAt: Date
    ) {
        super(id, name, description, image, price, createAt);
    }
}
