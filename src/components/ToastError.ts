import { BaseComponent } from './BaseComponent';

export class ToastError extends BaseComponent {
    render(): string {
        return /*html */ `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div
                    id="liveToastFail"
                    class="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-bs-config='{"animation": true, "delay": 4000}'
                >
                    <div class="toast-header">
                        <i class="bi bi-x-circle text-danger me-2"></i>
                        <strong class="me-auto text-danger">Fail</strong>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="toast-body">Add menu item fail!</div>
                </div>
            </div>
        `;
    }
}
