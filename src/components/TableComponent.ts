import uniqid from 'uniqid';
import { BaseComponent } from './BaseComponent';

export interface columnsProps {
    title: string;
    dataIndex: string;
    key: string;
}

export interface TableComponentProps {
    columns: columnsProps[];
    dataSource?: object[];
}

export class TableComponent extends BaseComponent {
    private key: string;
    private columns: columnsProps[];
    private dataSource?: object[] = [];

    constructor(element: HTMLElement, props: TableComponentProps) {
        super(element);
        this.key = uniqid();
        this.columns = props.columns;
        this.dataSource = props.dataSource;
    }

    render(): void {
        const html = /*html */ `
            <table class="table table-striped" id="${this.key}">
                <thead>
                    <tr>
                        ${this.columns
                            .map((column) => {
                                return /* html */ `
                                    <th scope="col">${column.title}</th>
                                `;
                            })
                            .join('')}
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;

        this.element.innerHTML = html;

        this.renderRecords();
    }

    private renderRecords(): void {
        if (this.dataSource) {
            const tableElement = document.getElementById(
                this.key
            ) as HTMLTableElement;
            tableElement.tBodies[0].innerHTML = this.dataSource
                .map((obj: any | any[]) => {
                    return /*html*/ `
                        <tr>
                            ${this.columns
                                .map((column) => {
                                    if (Array.isArray(obj[column.dataIndex])) {
                                        return obj[column.dataIndex]
                                            .map(() => {
                                                return /* html */ `
                                                <td>${
                                                    obj[column.dataIndex]
                                                }</td>
                                            `;
                                            })
                                            .join('');
                                    }
                                    return /* html */ `
                                        <td>${obj[column.dataIndex]}</td>
                                    `;
                                })
                                .join('')}
                        </tr>
                    `;
                })
                .join('');
        }
    }
}
