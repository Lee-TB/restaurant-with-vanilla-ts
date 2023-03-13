import { TableComponent } from '../../../components/TableComponent';
import { BaseComponent } from '../../../components/BaseComponent';
import { formatCurrency } from '../../../utils/formatCurrentcy';
import { MenuItem } from '../../../models/interfaces/MenuItem';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import { MenuAPI } from '../../../api/MenuAPI';
import { alertMessage } from '../../../components/utils/alertMessage';
import { MenuPage } from '../MenuPage';
import { ModalComponent } from '../../../components/ModalComponent';
import { MenuFormScreen } from './MenuFormScreen';

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
                    <img src="${item.image}" alt="${item.name}" style="width: 60px;">
                `,
                price: formatCurrency(item.price, 'VND'),
                createAt: formatRelativeTime(new Date(item.createAt)),
                actions: /* html */ `
                    <button class='btn btn-warning btn-sm updateMenuItemButton' data-item='${JSON.stringify(
                        item
                    )}'>
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class='btn btn-danger btn-sm deleteMenuItemButton' data-item='${JSON.stringify(
                        item
                    )}'>
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
                    key: 'categories',
                    dataIndex: 'categories',
                    title: 'Categories',
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

        this.listenUpdateMenuItem();

        this.listenDeleteMenuItem();
    }

    /**Add event listener to delete menu item when click on delelte button */
    private listenUpdateMenuItem() {
        const updateMenuItemButton = <NodeListOf<HTMLButtonElement>>(
            document.querySelectorAll('.updateMenuItemButton')
        );
        updateMenuItemButton.forEach((updateButton) => {
            updateButton.addEventListener('click', async () => {
                const item = updateButton.dataset.item;
                const data: MenuItem = <MenuItem>JSON.parse(<string>item);

                /* Open update form modal and pass default value to it */
                const modalPlaceholder = <HTMLElement>(
                    document.getElementById('modalPlaceholder')
                );
                new ModalComponent(modalPlaceholder, {
                    setTitle: (element) => {
                        element.innerHTML = 'Update Menu';
                    },
                    setBody: (element) => {
                        new MenuFormScreen(element, {
                            type: 'update',
                            defaultFormValues: data,
                        }).render();
                    },
                }).render();
                ModalComponent.show();
            });
        });
    }

    /**Add event listener to delete menu item when click on delelte button */
    private listenDeleteMenuItem() {
        const deleteMenuItemButton = <NodeListOf<HTMLButtonElement>>(
            document.querySelectorAll('.deleteMenuItemButton')
        );
        deleteMenuItemButton.forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                const item = deleteButton.dataset.item;
                const data = <MenuItem>JSON.parse(<string>item);
                const menuAPI = new MenuAPI(data.menuType);
                menuAPI
                    .delete(Number(data.id))
                    .then(() => {
                        alertMessage({
                            type: 'success',
                            title: 'Delete successful!',
                            content: `${data.name} was deleted`,
                        });
                        this.render();

                        MenuPage.renderMenuTable(data.menuType);
                    })
                    .catch((error) => {
                        console.log(error);
                        alertMessage({
                            type: 'success',
                            title: 'Delete failure!',
                        });
                    });
            });
        });
    }
}
