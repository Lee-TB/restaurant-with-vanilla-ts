import { TableComponent } from '../../../components/TableComponent';
import { BaseComponent } from '../../../components/BaseComponent';
import { formatCurrency } from '../../../utils/formatCurrentcy';
import { MenuItem } from '../../../models/interfaces/MenuItem';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';

interface MenuTableScreenProps {
    data: MenuItem[];
}

export class MenuTableScreen extends BaseComponent {
    private data?: MenuItem[];

    constructor(element: HTMLElement, props?: MenuTableScreenProps) {
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
                    <button class='btn btn-warning updateMenuItemButton' data-id="${item.id}" data-menu-type="${item.menuType}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class='btn btn-danger deleteMenuItemButton' data-id="${item.id}" data-menu-type="${item.menuType}">
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

        this.listenDeleteMenuItem();
    }

    /**Add event listener to delete menu item when click on delelte button */
    private listenDeleteMenuItem() {
        const deleteMenuItemButton = <NodeListOf<HTMLButtonElement>>(
            document.querySelectorAll('.deleteMenuItemButton')
        );
        deleteMenuItemButton.forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                const itemId = Number(deleteButton.dataset.id);
                const itemMenuType = deleteButton.dataset.menuType;
                console.log(itemId, itemMenuType);
                // const menuAPI = new MenuAPI('f');
                // const res: any = await menuAPI.get(menuItemId);
                // const data = await res.json();
                // menuAPI
                //     .delete(menuItemId)
                //     .then(() => {
                //         alertMessage({
                //             type: 'success',
                //             title: 'Delete successful!',
                //             content: `${data.name} was deleted`,
                //         });
                //         this.render();
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //         alertMessage({
                //             type: 'success',
                //             title: 'Delete failure!',
                //             content: `${data.name} was deleted`,
                //         });
                //     });
            });
        });
    }
}
