import { MenuAPI } from '../../../api/MenuAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { alertMessage } from '../../../components/utils/alertMessage';
import { MenuType } from '../../../models/enums/MenuType';

export class MenuTable extends BaseComponent {
    private menuType: MenuType = MenuType.FoodMenu;
    private menuTableElement?: HTMLTableElement;

    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html */ `
            <table class="table table-striped" id="menuTable">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Create at</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;

        this.element.innerHTML = html;

        this.renderMenuItems();
    }

    public setMenuType(type: MenuType) {
        this.menuType = type;
    }

    public getMenuType(): MenuType {
        return this.menuType;
    }

    /**Render menu table rows which contain menu items*/
    private async renderMenuItems(): Promise<void> {
        const data: any[] = await this.getDataFromAPI(this.menuType);
        const rows = data
            .map((item: any) => {
                return /*html*/ `
            <tr>
                <td>
                    ${item.id}
                </td>
                <td>
                    <img src="${item.image}" alt="" style="width: 100px">
                </td>
                <td>
                ${item.name}
                </td>
                <td>${item.price}</td>
                <td>${item.categories.join(', ')}</td>
                <td>${new Date(item.createAt).toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning updateMenuItemButton" data-menu-item-id="${
                        item.id
                    }"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger deleteMenuItemButton" data-menu-item-id="${
                        item.id
                    }"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
            `;
            })
            .join('');

        this.menuTableElement = <HTMLTableElement>(
            document.querySelector('#menuTable')
        );
        this.menuTableElement.tBodies[0].innerHTML = rows;

        this.listenDeleteMenuItem();
    }

    /**Add event listener to delete menu item when click on delelte button */
    private listenDeleteMenuItem() {
        const deleteMenuItemButton = <NodeListOf<HTMLButtonElement>>(
            document.querySelectorAll('.deleteMenuItemButton')
        );
        deleteMenuItemButton.forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                const menuItemId = Number(deleteButton.dataset.menuItemId);
                const menuAPI = new MenuAPI('menu');
                const res: any = await menuAPI.get(menuItemId);
                const data = await res.json();
                menuAPI
                    .delete(menuItemId)
                    .then(() => {
                        alertMessage({
                            type: 'success',
                            title: 'Delete successful!',
                            content: `${data.name} was deleted`,
                        });
                        this.render();
                    })
                    .catch((error) => {
                        console.log(error);
                        alertMessage({
                            type: 'success',
                            title: 'Delete failure!',
                            content: `${data.name} was deleted`,
                        });
                    });
            });
        });
    }

    /**Get data from API and make sure it match with menu type */
    private async getDataFromAPI(type: MenuType): Promise<any[]> {
        try {
            const menuAPI = new MenuAPI('menu');
            const res: any = await menuAPI.getAll();
            const data: any[] = await res.json();
            let dataAfterFilter: any[] = [];
            if (type === MenuType.FoodMenu) {
                dataAfterFilter = data.filter(
                    (item) => item.menuType === 'FoodMenu'
                );
            } else if (type === MenuType.DrinkMenu) {
                dataAfterFilter = data.filter(
                    (item) => item.menuType === 'DrinkMenu'
                );
            }
            return new Promise((resolve) => {
                resolve(dataAfterFilter);
            });
        } catch (error) {
            return new Promise((_, reject) => {
                reject(error);
            });
        }
    }
}
