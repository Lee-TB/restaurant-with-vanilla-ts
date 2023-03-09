import { Sidebar } from './components/Sidebar';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { BillPage } from './pages/BillPage/BillPage';
import { BaseComponent } from './components/BaseComponent';
import { Modal } from './components/Modal';

export class App extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html*/ `
            <div id="toastSuccessComponent"></div>
            <div id="formModal"></div>
            <div class="wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-xl-2">
                            <div id="sideBar"></div>
                        </div>

                        <div class="col-lg-9 col-xl-10 pt-2">
                            <main id="pages">
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        /**Mount child components */
        const formModalElement = <HTMLElement>(
            document.getElementById('formModal')
        );
        new Modal(formModalElement).render();

        const sideBarElement = <HTMLElement>document.getElementById('sideBar');
        new Sidebar(sideBarElement).render();

        const pagesElement = <HTMLElement>document.getElementById('pages');
        new MenuPage(pagesElement).render();
    }
}
