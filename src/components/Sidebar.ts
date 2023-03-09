import { BillPage } from '../pages/BillPage/BillPage';
import { MenuPage } from '../pages/MenuPage/MenuPage';
import { BaseComponent } from './BaseComponent';

export class Sidebar extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html */ `
            <aside id="sidebar">
                <div
                    class="d-flex flex-column flex-shrink-0 p-3 bg-light"
                >
                    <a
                        href="/"
                        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
                    >
                        <svg class="bi me-2" width="40" height="32">
                            <use xlink:href="#bootstrap" />
                        </svg>
                        <span class="fs-4"
                            ><img
                                class="logo"
                                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg"
                                alt="logo"
                        /></span>
                    </a>
                    <hr />
                    <ul
                        class="nav nav-pills flex-column mb-auto gap-1"
                    >
                        <li class="nav-item">
                            <a href="#" class="nav-link navLinkPage active" id='menuNavLink'>
                                <svg
                                    class="bi me-2"
                                    width="16"
                                    height="16"
                                >
                                    <use
                                        xlink:href="#speedometer2"
                                    />
                                </svg>
                                Menu
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link navLinkPage" id='billNavLink'>
                                <svg
                                    class="bi me-2"
                                    width="16"
                                    height="16"
                                >
                                    <use xlink:href="#table" />
                                </svg>
                                Bill List
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        `;

        this.element.innerHTML = html;

        // switch page
        const navLinkPageElements = <NodeListOf<HTMLElement>>(
            document.querySelectorAll('.navLinkPage')
        );
        navLinkPageElements.forEach((link) => {
            link.addEventListener('click', () => {
                // remove previous active
                navLinkPageElements.forEach((item) => {
                    item.classList.remove('active');
                });
                // add current active page
                link.classList.add('active');

                /**Render current page */
                const pagesElement = <HTMLElement>(
                    document.getElementById('pages')
                );
                if (link.id === 'menuNavLink') {
                    new MenuPage(pagesElement).render();
                } else if (link.id === 'billNavLink') {
                    new BillPage(pagesElement).render();
                }
            });
        });
    }
}
