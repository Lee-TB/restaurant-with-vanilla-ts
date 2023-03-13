import { BillAPI } from '../../../api/BillAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { ModalComponent } from '../../../components/ModalComponent';
import {
    TableComponent,
    columnsProps,
} from '../../../components/TableComponent';
import { alertMessage } from '../../../components/utils/alertMessage';
import { Bill } from '../../../models/interfaces/Bill';
import { formatCurrency } from '../../../utils/formatCurrentcy';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';

export class BillListScreen extends BaseComponent {
    private billListData?: Bill[];

    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        this.element.innerHTML = /* html */ `
        <div id="billTablePlaceholder"></div>
        `;

        this.fetchBillListData().then(() => {
            this.renderBillTable();
        });
    }

    private async fetchBillListData() {
        const billAPI = new BillAPI('bill');
        const res = await billAPI.getAll();
        const data = await res.json();
        this.billListData = data;
    }

    private renderBillTable() {
        const records = this.billListData?.map((bill) => {
            return {
                id: bill.id,
                customer: bill.customer,
                total: formatCurrency(bill.total, 'VND'),
                createAt: formatRelativeTime(new Date(bill.createAt)),
                actions: /* html */ `
                    <div class="d-flex gap-1">
                        <div class="detailBillPlaceholder" data-id='${bill.id}'></div>
                        <div class="updateBillPlaceholder" data-id='${bill.id}'></div>
                        <div class="deleteBillPlaceholder" data-id='${bill.id}'></div>
                    </div>
                `,
            };
        });

        const billTablePlaceholder = <HTMLDivElement>(
            document.getElementById('billTablePlaceholder')
        );

        const tableComponent = new TableComponent(billTablePlaceholder, {
            columns: [
                {
                    key: 'id',
                    dataIndex: 'id',
                    title: 'Id',
                },
                {
                    key: 'customer',
                    dataIndex: 'customer',
                    title: 'Customer',
                },
                {
                    key: 'total',
                    dataIndex: 'total',
                    title: 'Total',
                },
                {
                    key: 'createAt',
                    dataIndex: 'createAt',
                    title: 'CreateAt',
                },
                {
                    key: 'actions',
                    dataIndex: 'actions',
                    title: 'Actions',
                },
            ],
            dataSource: records,
        });

        tableComponent.render();

        this.renderActions();
    }

    private renderActions() {
        const detailBillPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.detailBillPlaceholder')
        );
        detailBillPlaceholder.forEach((button) => {
            new ButtonComponent(button, {
                className: 'btn btn-info btn-sm',
                children: `
                    <i class="bi bi-eye"></i>
                `,
                onClick: async () => {
                    const billId = Number(button.dataset.id);
                    const billAPI = new BillAPI('bill');
                    const res: any = await billAPI.get(billId);
                    const data: Bill = await res.json();

                    const modalPlaceholder = <HTMLElement>(
                        document.getElementById('modalPlaceholder')
                    );
                    new ModalComponent(modalPlaceholder, {
                        setTitle: (element) => {
                            element.innerHTML = 'Bill Detail';
                        },
                        setBody: (element) => {
                            this.renderBillTableDetail(element, data);
                        },
                        size: 'xl',
                    }).render();
                    ModalComponent.show();
                },
            }).render();
        });

        const updateBillPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.updateBillPlaceholder')
        );
        updateBillPlaceholder.forEach((button) => {
            new ButtonComponent(button, {
                className: 'btn btn-warning btn-sm',
                children: `
                    <i class="bi bi-pencil-square"></i>
                `,
                onClick: () => {
                    console.log('update button');
                },
            }).render();
        });

        const deleteBillPlaceholder = <NodeListOf<HTMLDivElement>>(
            document.querySelectorAll('.deleteBillPlaceholder')
        );
        deleteBillPlaceholder.forEach((button) => {
            const billId = button.dataset.id || '';
            new ButtonComponent(button, {
                className: 'btn btn-danger btn-sm',
                children: `
                    <i class="bi bi-trash-fill"></i>
                `,
                onClick: () => {
                    const billAPI = new BillAPI('bill');
                    billAPI
                        .delete(Number(billId))
                        .then(() => {
                            alertMessage({
                                type: 'success',
                                title: 'Delete bill successful!',
                            });

                            /* Rerender bill list */
                            this.render();
                        })
                        .catch(() => {
                            alertMessage({
                                type: 'error',
                                title: 'Delete bill failure!',
                            });
                        });
                },
            }).render();
        });
    }

    private renderBillTableDetail(element: HTMLElement, data: Bill) {
        const columns: columnsProps[] = [
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
                key: 'quantity',
                dataIndex: 'quantity',
                title: 'Quantity',
            },
            {
                key: 'total',
                dataIndex: 'total',
                title: 'Total',
            },
            {
                key: 'actions',
                dataIndex: 'actions',
                title: 'Actions',
            },
        ];
        const records = data.itemList.map((item) => {
            return {
                ...item,
                image: /* html */ `
                    <img src="${item.image}" alt="${item.name}" style="width: 50px;">
                `,
                price: /* html */ `
                    <span>${formatCurrency(item.price, 'VND')}</span>
                `,
                quantity: /* html */ `
                    <span>x ${item.quantity}</span>
                `,
                total: /* html */ `
                    <span>${formatCurrency(item.total, 'VND')}</span>
                `,
            };
        });

        new TableComponent(element, {
            columns: columns,
            dataSource: records,
        }).render();
    }
}
