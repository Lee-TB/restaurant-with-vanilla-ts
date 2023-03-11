import { Modal } from 'bootstrap';
import { AddMenuItemForm } from './AddMenuItemForm/AddMenuItemForm';
import { BaseComponent } from '../components/BaseComponent';

export class AddMenuItemModal extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }

    render(): void {
        const html = /*html */ `
            <div
                class="modal fade"
                id="addMenuItemModal"
                tabindex="-1"
                aria-labelledby="addMenuItemModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5"
                                id="addMenuItemModalLabel"
                            >
                                Add Menu Item
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div id="addMenuItemFormElement"></div>                            
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        /* Instantiate Modal */
        const addMenuItemModal = <HTMLDivElement>(
            document.getElementById('addMenuItemModal')
        );
        Modal.getOrCreateInstance(addMenuItemModal);

        /* Render Add Menu Item Form */
        const addMenuItemFormElement = <HTMLDivElement>(
            document.getElementById('addMenuItemFormElement')
        );
        new AddMenuItemForm(addMenuItemFormElement).render();
    }
}