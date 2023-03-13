import { Modal } from 'bootstrap';
import { BaseComponent } from '../components/BaseComponent';

export interface ModalProps {
    setBody?: (element: HTMLElement) => void;
    setTitle?: (element: HTMLElement) => void;
    setFooter?: (element: HTMLElement) => void;
    size?: 'sm' | 'lg' | 'xl';
}

export class ModalComponent extends BaseComponent {
    private static modalElement: HTMLElement;
    private titleElement?: HTMLElement;
    private bodyElement?: HTMLElement;
    private footerElement?: HTMLElement;
    private setBody?: (element: HTMLElement) => void;
    private setTitle?: (element: HTMLElement) => void;
    private setFooter?: (element: HTMLElement) => void;
    private size?: 'sm' | 'lg' | 'xl';

    constructor(element: HTMLElement, props: ModalProps) {
        super(element);

        this.setTitle = props.setTitle;
        this.setBody = props.setBody;
        this.setFooter = props.setFooter;

        this.size = props.size;
    }

    render(): void {
        const html = /*html */ `
            <div
                class="modal fade ${
                    this.size === 'xl'
                        ? 'modal-xl'
                        : this.size === 'lg'
                        ? 'modal-lg'
                        : this.size === 'sm'
                        ? 'modal-sm'
                        : ''
                }"
                id="modalElement"
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
                                
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body" id='ModalBody'>                                                                                 
                        </div>
                        <div class="modal-footer" id="ModalFooter"></div>                    
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        ModalComponent.modalElement = <HTMLDivElement>(
            document.getElementById('modalElement')
        );

        this.initiatePropsElement();
        this.renderComponents();
    }

    /**Initialize DOM elements */
    private initiatePropsElement() {
        this.titleElement = <HTMLElement>document.getElementById('ModalTitle');
        this.bodyElement = <HTMLElement>document.getElementById('ModalBody');
        this.footerElement = <HTMLElement>(
            document.getElementById('ModalFooter')
        );
    }

    /**Pass DOM elements into callbacks to render */
    private renderComponents() {
        if (this.setTitle && this.titleElement) {
            this.setTitle(this.titleElement);
        }

        if (this.setBody && this.bodyElement) {
            this.setBody(this.bodyElement);
        }

        if (this.setFooter && this.footerElement) {
            this.setFooter(this.footerElement);
        }
    }

    /**Change the content of the modal after it has been constructed */
    public setProps(props: ModalProps) {
        if (this.titleElement && props.setTitle) {
            props.setTitle(this.titleElement);
        }

        if (this.bodyElement && props.setBody) {
            props.setBody(this.bodyElement);
        }

        if (this.footerElement && props.setFooter) {
            props.setFooter(this.footerElement);
        }
    }

    /**
     * This method depend on bootstrap.Modal.getOrCreateInstance()
     */
    public static show(): void {
        if (ModalComponent.modalElement) {
            Modal.getOrCreateInstance(ModalComponent.modalElement).show();
        }
    }

    /**
     * This method depend on bootstrap.Modal.getOrCreateInstance()
     */
    public static hide(): void {
        if (ModalComponent.modalElement) {
            Modal.getOrCreateInstance(ModalComponent.modalElement).hide();
        }
    }

    /**
     * This method depend on bootstrap.Modal.getOrCreateInstance()
     */
    public static toggle(): void {
        if (ModalComponent.modalElement) {
            Modal.getOrCreateInstance(ModalComponent.modalElement).toggle();
        }
    }
}
