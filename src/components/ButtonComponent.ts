import uniqid from 'uniqid';
import { BaseComponent } from './BaseComponent';

export interface ButtonProps {
    className?: string;
    children?: string;
    onClick?: (event: MouseEvent) => void;
}

export class ButtonComponent extends BaseComponent {
    private key: string;
    private className: string;
    private children: string;
    private onClick?: (event: MouseEvent) => void;

    constructor(element: HTMLElement, props?: ButtonProps) {
        super(element);

        this.key = uniqid();
        this.className = props?.className || 'btn';
        this.children = props?.children || 'button';

        this.onClick = props?.onClick;
    }

    render(): void {
        this.element.innerHTML = /* html */ `
            <button id="${this.key}" type="button" class="${this.className}">
                ${this.children}
            </button>
        `;

        this.listenClick();
    }

    private listenClick() {
        const buttonElement = document.getElementById(this.key);
        buttonElement?.addEventListener('click', (e) => {
            if (this.onClick) {
                this.onClick(e);
            }
        });
    }
}
