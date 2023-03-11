import uniqid from 'uniqid';
import { BaseComponent } from './BaseComponent';

export interface NavItemProps {
    key: string;
    label: string;
    children?: string;
}

export interface NavComponentProps {
    key: string;
    type: 'tab';
    items: NavItemProps[];
    onChange: (activeKey: string) => void;
    activeKey: string;
}

export class NavComponent extends BaseComponent {
    private key: string;
    private type?: 'tab';
    private items: NavItemProps[];
    private activeKey?: string;

    constructor(element: HTMLElement, props?: NavComponentProps) {
        super(element);
        this.key = uniqid();
        this.type = props?.type;
        this.items = props?.items || [];
        this.activeKey = props?.activeKey || props?.items[0].key;
    }

    render(): void {
        this.element.innerHTML = /*html*/ `
            <ul class="nav${this.type === 'tab' ? ' nav-tabs' : ''}" id="${
            this.key
        }">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#"></a>
                </li>
            </ul>
        `;
    }

    renderItems() {
        const navElement = <HTMLUListElement>document.getElementById(this.key);
        navElement.innerHTML = this.items
            .map((item) => {
                return /* html */ `
                <li class="nav-item" key="${item.key}">
                    <a class="nav-link" href="#">
                        ${item.label}
                    </a>
                </li>
            `;
            })
            .join('');
    }
}
