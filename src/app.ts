import { Sidebar } from './screens/Sidebar';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { BaseComponent } from './components/BaseComponent';

export class App extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html*/ `
            <div id="toastPlaceholder"></div>
            <div id="modalPlaceholder"></div>
            <div class="wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-xl-2">
                            <div id="sideBarPlaceholder"></div>
                        </div>

                        <div class="col-lg-9 col-xl-10 pt-2">
                            <main id="pagesPlaceholder">
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        this.renderSidebar();

        this.renderMenuPage();
    }

    /**Render Sidebar */
    private renderSidebar() {
        const sideBarPlaceholder = <HTMLElement>(
            document.getElementById('sideBarPlaceholder')
        );
        new Sidebar(sideBarPlaceholder).render();
    }

    /**Render Menu Page */
    private renderMenuPage() {
        const pagesPlaceholder = <HTMLElement>(
            document.getElementById('pagesPlaceholder')
        );
        new MenuPage(pagesPlaceholder).render();
    }
}
