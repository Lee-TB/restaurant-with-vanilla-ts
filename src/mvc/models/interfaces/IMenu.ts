export interface IMenu {
    create(): void; // create a menu item
    update(id: string): void; // update a menu item
    delete(id: string): void; // delete a menu item
    showAll(): void; // show all menu items
}
