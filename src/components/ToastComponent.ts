import { Toast } from 'bootstrap';
import { BaseComponent } from './BaseComponent';

export interface ToastProps {
    type?: 'success' | 'warning' | 'error' | 'default';
    title?: string;
    content?: string;
    time?: string;
}

export class ToastComponent extends BaseComponent implements ToastProps {
    private static toastElement: HTMLElement;
    public type?: 'success' | 'warning' | 'error' | 'default' = 'default';
    public title?: string;
    public content?: string;
    public time?: string;

    constructor(element: HTMLElement, props: ToastProps) {
        super(element);
        this.type = props.type;
        this.title = props.title;
        this.content = props.content || '';
        this.time = props.time || '';
    }

    render(): void {
        const html = /*html*/ `
            <div class="toast-container position-fixed top-0 end-50 p-3" style="transform: translate(50%, 0);">
                <div
                    id="toastElement"
                    class="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-bs-config='{"animation": true, "delay": 3000}'
                >
                    <div class="toast-header">
                        ${this.getIcon()}
                        <strong class="me-auto ${this.styleTextColor()}">
                            ${this.title}
                        </strong>
                        <small>${this.time}</small>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="toast-body">${this.content}</div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        ToastComponent.toastElement = <HTMLElement>(
            document.getElementById('toastElement')
        );
    }

    /**
     * This method depend on bootstrap.Toast.getOrCreateInstance()
     */
    public static show(): void {
        if (ToastComponent.toastElement) {
            Toast.getOrCreateInstance(ToastComponent.toastElement).show();
        }
    }

    /**
     * This method depend on bootstrap.Toast.getOrCreateInstance()
     */
    public static hide(): void {
        if (ToastComponent.toastElement) {
            Toast.getOrCreateInstance(ToastComponent.toastElement).hide();
        }
    }

    private styleTextColor(): string {
        switch (this.type) {
            case 'success':
                return `text-success`;
            case 'error':
                return `text-danger`;
            case 'warning':
                return `text-warning`;
            default:
                return ``;
        }
    }

    private getIcon(): string {
        switch (this.type) {
            case 'success':
                return `<i class="bi bi-check-circle me-2 text-success"></i>`;
            case 'error':
                return `<i class="bi bi-x-circle me-2 text-danger"></i>`;
            case 'warning':
                return `<i class="bi bi-exclamation-triangle me-2 text-warning"></i>`;
            default:
                return ``;
        }
    }
}
