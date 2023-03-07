import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import './features/AddProductForm';
import { data } from './data';
const menu = <HTMLDivElement>document.querySelector('#menu');
const menuTable = <HTMLTableElement>menu.querySelector('table');
menuTable.tBodies[0].innerHTML = data
    .map((item, index) => {
        return /*html*/ `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.getId()}</td>
        <td>
            <img src="${item.getImage()}" alt="" style="width: 100px">
        </td>
        <td>${item.getName()}</td>
        <td>${item.getPrice()}</td>
        <td></td>
        <td>${item.getCreateAt().toLocaleDateString()}</td>
        <td>
            <button class="btn btn-warning"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
        </td>
    </tr>
    `;
    })
    .join('');
