import { MenuAPI } from '../../../api/MenuAPI';

/**Query DOM */
const menuTable = <HTMLTableElement>document.querySelector('#menuTable');

/**Update Menu */
export const updateMenu = async () => {
    try {
        const menuAPI = new MenuAPI();
        const res: any = await menuAPI.getAll();
        const data: [] = await res.json();
        console.log(data);
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
            <td>${new Date(item.createAt).toLocaleDateString()}</td>
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

/**GET data */
const handleLoad = () => {
    updateMenu();
};
window.addEventListener('load', handleLoad);
