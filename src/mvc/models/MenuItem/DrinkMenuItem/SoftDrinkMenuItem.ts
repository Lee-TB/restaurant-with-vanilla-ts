import { DrinkMenuItem } from './DrinkMenuItem';

export class SoftDrinkMenuItem extends DrinkMenuItem {
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
