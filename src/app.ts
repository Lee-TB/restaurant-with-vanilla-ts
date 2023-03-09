import { Sidebar } from './screens/Sidebar';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { BaseComponent } from './components/BaseComponent';
import { AddMenuItemModal } from './screens/AddMenuItemModal';

export class App extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html*/ `
            <div id="toastPlaceholder"></div>
            <div id="formModalElement"></div>
            <div class="wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-xl-2">
                            <div id="sideBarElement"></div>
                        </div>

                        <div class="col-lg-9 col-xl-10 pt-2">
                            <main id="pagesElement">
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        /* Render Modal */
        const formModalElement = <HTMLElement>(
            document.getElementById('formModalElement')
        );
        new AddMenuItemModal(formModalElement).render();

        /* Render Sidebar */
        const sideBarElement = <HTMLElement>(
            document.getElementById('sideBarElement')
        );
        new Sidebar(sideBarElement).render();

        /* Render Menu Page */
        const pagesElement = <HTMLElement>(
            document.getElementById('pagesElement')
        );
        new MenuPage(pagesElement).render();
    }
}
