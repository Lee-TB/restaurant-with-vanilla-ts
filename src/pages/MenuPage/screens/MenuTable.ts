import { TableComponent } from '../../../components/TableComponent';
import { MenuAPI } from '../../../api/MenuAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { alertMessage } from '../../../components/utils/alertMessage';
import { MenuType } from '../../../models/enums/MenuType';
import { formatCurrency } from '../../../utils/formatCurrentcy';
import { MenuItem } from '../../../models/interfaces/MenuItem';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';

interface MenuTableProps {
    data: MenuItem[];
}

export class MenuTable extends BaseComponent {
    private data?: MenuItem[];

    constructor(element: HTMLElement, props?: MenuTableProps) {
        super(element);
        this.data = props?.data;
    }

    render(): void {
        const renderData = this.data?.map((item) => {
            return {
                ...item,
                image: /* html */ `
                    <img src="${item.image}" alt="${item.name}" style="width: 100px;">
                `,
                price: formatCurrency(item.price, 'VND'),
                createAt: formatRelativeTime(new Date(item.createAt)),
                actions: /* html */ `
                    <button class='btn btn-warning'>
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class='btn btn-danger'>
                        <i class="bi bi-trash"></i>
                    </button>
                `,
            };
        });
        const tableComponent = new TableComponent(this.element, {
            columns: [
                {
                    key: 'id',
                    dataIndex: 'id',
                    title: 'Id',
                },
                {
                    key: 'image',
                    dataIndex: 'image',
                    title: 'Image',
                },
                {
                    key: 'name',
                    dataIndex: 'name',
                    title: 'Name',
                },
                {
                    key: 'price',
                    dataIndex: 'price',
                    title: 'Price',
                },
                {
                    key: 'createAt',
                    dataIndex: 'createAt',
                    title: 'Date modified',
                },
                {
                    key: 'actions',
                    dataIndex: 'actions',
                    title: 'Actions',
                },
            ],
            dataSource: renderData,
        });

        tableComponent.render();
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
