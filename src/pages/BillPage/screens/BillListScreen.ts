import { BillAPI } from '../../../api/BillAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { TableComponent } from '../../../components/TableComponent';
import { alertMessage } from '../../../components/utils/alertMessage';
import { Bill } from '../../../models/interfaces/Bill';

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
                total: bill.total,
                createAt: bill.createAt,
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
            console.log(button);
            new ButtonComponent(button, {
                className: 'btn btn-info btn-sm',
                children: `
                    <i class="bi bi-eye"></i>
                `,
                onClick: () => {
                    console.log('detail button');
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
}
