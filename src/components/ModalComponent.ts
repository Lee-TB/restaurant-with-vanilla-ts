import { Modal } from 'bootstrap';
import { BaseComponent } from '../components/BaseComponent';

export interface ModalProps {
    title: string;
    body: string;
    footer?: string;
}

export class ModalComponent extends BaseComponent {
    private modalComponent?: HTMLElement;
    private title: string;
    private body: string;
    private footer?: string;

    constructor(element: HTMLElement, props: ModalProps) {
        super(element);
        this.title = props.title;
        this.body = props.body;
        this.footer = props.footer;
    }

    render(): void {
        const html = /*html */ `
            <div
                class="modal fade"
                id="modalComponent"
                tabindex="-1"
                aria-labelledby="ModalTitle"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5"
                                id="ModalTitle"
                            >
                                ${this.title}
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">                            
                            ${this.body}                            
                        </div>
                        <div class="modal-footer">${this.footer}</div>
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;
    }

    /**
     * this method depend on Modal.getOrCreateInstance();
     * @returns
     */
    public getInstance(): Modal {
        this.modalComponent = <HTMLDivElement>(
            document.getElementById('modalComponent')
        );
        return Modal.getOrCreateInstance(this.modalComponent);
    }
}
