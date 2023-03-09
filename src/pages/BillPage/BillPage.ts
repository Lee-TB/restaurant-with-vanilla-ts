import { BaseComponent } from '../../components/BaseComponent';

export class BillPage extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        const html = /*html */ `
            <section id="bill">
                <h2>Bill List</h2>
                <ul class="list-group">
                    <li class="list-group-item">
                        <div>
                            <strong>Bill Id: </strong>
                            <span>1234556788</span>
                        </div>
                        <div>
                            <strong>Order time: </strong>
                            <span>20:33 - 06/03/2023</span>
                        </div>
                        <ul class="list-group bill-list">
                            <li
                                class="list-group-item d-flex gap-3 align-items-center"
                            >
                                <div class="bill-list-item-image">
                                    <img
                                        src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1-600x600.png"
                                        alt=""
                                        style="width: 100px"
                                    />
                                </div>
                                <div class="bill-list-item-name">
                                    <p>Iced tea</p>
                                </div>
                                <div class="bill-list-item-price">
                                    <p>12.000</p>
                                </div>
                                <div
                                    class="bill-list-item-quantity"
                                >
                                    <p><strong>x</strong> 1</p>
                                </div>
                            </li>

                            <li
                                class="list-group-item d-flex gap-3 align-items-center"
                            >
                                <div class="bill-list-item-image">
                                    <img
                                        src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1-600x600.png"
                                        alt=""
                                        style="width: 100px"
                                    />
                                </div>
                                <div class="bill-list-item-name">
                                    <p>Iced tea</p>
                                </div>
                                <div class="bill-list-item-price">
                                    <p>12.000</p>
                                </div>
                                <div
                                    class="bill-list-item-quantity"
                                >
                                    <p><strong>x</strong> 1</p>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="list-group-item">
                        <div>
                            <strong>Bill Id: </strong>
                            <span>1234556788</span>
                        </div>
                        <div>
                            <strong>Order time: </strong>
                            <span>20:33 - 06/03/2023</span>
                        </div>
                        <ul class="list-group bill-list">
                            <li
                                class="list-group-item d-flex gap-3 align-items-center"
                            >
                                <div class="bill-list-item-image">
                                    <img
                                        src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1-600x600.png"
                                        alt=""
                                        style="width: 100px"
                                    />
                                </div>
                                <div class="bill-list-item-name">
                                    <p>Iced tea</p>
                                </div>
                                <div class="bill-list-item-price">
                                    <p>12.000</p>
                                </div>
                                <div
                                    class="bill-list-item-quantity"
                                >
                                    <p><strong>x</strong> 1</p>
                                </div>
                            </li>

                            <li
                                class="list-group-item d-flex gap-3 align-items-center"
                            >
                                <div class="bill-list-item-image">
                                    <img
                                        src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1-600x600.png"
                                        alt=""
                                        style="width: 100px"
                                    />
                                </div>
                                <div class="bill-list-item-name">
                                    <p>Iced tea</p>
                                </div>
                                <div class="bill-list-item-price">
                                    <p>12.000</p>
                                </div>
                                <div
                                    class="bill-list-item-quantity"
                                >
                                    <p><strong>x</strong> 1</p>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        `;

        this.element.innerHTML = html;
    }
}
