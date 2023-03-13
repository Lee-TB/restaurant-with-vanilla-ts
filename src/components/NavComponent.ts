import uniqid from 'uniqid';
import { BaseComponent } from './BaseComponent';

export interface NavItemProps {
    key: string;
    label: string;
}

export interface NavComponentProps {
    type?: 'tab' | 'pill';
    items: NavItemProps[];
    activeKey?: string;
    onChange?: (activeKey: string) => void;
}

export class NavComponent extends BaseComponent {
    private key: string;
    private items: NavItemProps[];
    private type?: 'tab' | 'pill';
    private activeKey?: string;
    private onChange?: (activeKey: string) => void;

    constructor(element: HTMLElement, props?: NavComponentProps) {
        super(element);
        this.key = uniqid();
        this.type = props?.type;
        this.items = props?.items || [];
        this.activeKey = props?.activeKey || props?.items[0].key;
        this.onChange = props?.onChange;
    }

    render(): void {
        this.element.innerHTML = /*html*/ `
            <ul class="nav${
                this.type === 'tab'
                    ? ' nav-tabs'
                    : this.type === 'pill'
                    ? ' nav-pills'
                    : ''
            }" id="${this.key}">
            </ul>
        `;

        this.renderItems();

        this.listenClick();
    }

    private renderItems() {
        const navElement = <HTMLUListElement>document.getElementById(this.key);
        navElement.innerHTML = this.items
            .map((item) => {
                return /* html */ `
                <li class="nav-item ${this.key}-nav-item">
                    <a 
                        id="${item.key}"
                        class="nav-link ${this.key}-nav-link ${
                    this.activeKey === item.key ? 'active' : ''
                }" 
                        href="#"
                    >
                        ${item.label}
                    </a>
                </li>
            `;
            })
            .join('');
    }

    private listenClick() {
        const navLinkElementList = <NodeListOf<HTMLLinkElement>>(
            document.querySelectorAll(`.${this.key}-nav-link`)
        );

        navLinkElementList.forEach((navLink) => {
            navLink.addEventListener('click', () => {
                /* css active link when click. First remove active if it exist, then add active to the link what was clicked */
                navLinkElementList.forEach((navLinkStyle) => {
                    navLinkStyle.classList.remove('active');
                });
                navLink.classList.add('active');

                /* pass active key to onChange callback */
                if (this.onChange) {
                    this.onChange(navLink.id);
                }
            });
        });
    }
}
