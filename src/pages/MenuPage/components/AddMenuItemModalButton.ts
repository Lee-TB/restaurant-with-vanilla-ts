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

        this.openAddMenuItemModal();
    }

    /* Open Add Menu Item Modal */
    private openAddMenuItemModal(): void {
        const addMenuItemModal = <HTMLDivElement>(
            document.querySelector('#addMenuItemModal') // this method only work correctly when mounted
        );
        const openAddMenuItemModalButtonElement = <HTMLButtonElement>(
            document.getElementById('openAddMenuItemModalButton')
        );
        openAddMenuItemModalButtonElement.addEventListener('click', () => {
            Modal.getInstance(addMenuItemModal)?.show();
        });
    }
}
