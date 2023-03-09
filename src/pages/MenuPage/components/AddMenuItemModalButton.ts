import { Modal } from 'bootstrap';
import { BaseComponent } from '../../../components/BaseComponent';

export class AddMenuItemModalButton extends BaseComponent {
    constructor(element: HTMLElement) {
        super(element);
    }
    render(): void {
        const html = /*html */ `
            <button
                class="btn btn-primary"
                id="openAddMenuItemModalButton"
            >
                <span>Add</span>
                <i class="bi bi-plus-circle"></i>
            </button>
        `;

        this.element.innerHTML = html;

        /**open add modal */
        const addMenuItemModalElement = <HTMLDivElement>(
            document.querySelector('#addMenuItemModal')
        );
        const addMenuItemModal = new Modal(addMenuItemModalElement);
        const openAddMenuItemModalButtonElement = <HTMLButtonElement>(
            document.getElementById('openAddMenuItemModalButton')
        );
        openAddMenuItemModalButtonElement.addEventListener('click', () => {
            addMenuItemModal.show();
        });
    }
}
