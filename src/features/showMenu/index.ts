import { MenuAPI } from '../../api/MenuAPI';
import { MenuType } from '../../models/enums/MenuType';

const menuTabs = <NodeListOf<HTMLLinkElement>>(
    document.querySelectorAll('.menuTabs')
);

/**switch tabs */
menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        menuTabs.forEach((tab) => {
            tab.classList.remove('active');
        });
        tab.classList.add('active');

        if (tab.id === 'foodMenuTab') {
            renderMenu(MenuType.FoodMenu);
        } else if (tab.id === 'drinkMenuTab') {
            renderMenu(MenuType.DrinkMenu);
        }
    });
});

/**Render Menu */
export const renderMenu = async (type: MenuType) => {
    const menuTable = <HTMLTableElement>document.querySelector('#menuTable');
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

        const rows = dataAfterFilter
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
                        <button class="btn btn-warning"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
                `;
            })
            .join('');
        menuTable.tBodies[0].innerHTML = rows;
    } catch (error) {
        console.log(error);
    }
};

/** render menu after loaded */
const handleLoad = () => {
    renderMenu(MenuType.FoodMenu);
};
window.addEventListener('load', handleLoad);
