import { Toast } from 'bootstrap';
import { ToastProps, ToastComponent } from '../ToastComponent';

export function alertMessage(props: ToastProps) {
    const toastPlaceholder = <HTMLElement>(
        document.getElementById('toastPlaceholder')
    );
    new ToastComponent(toastPlaceholder, props).render();

    const liveToastElement = <HTMLDivElement>(
        document.getElementById('liveToast')
    );

    const toast = Toast.getInstance(liveToastElement);
    toast?.show();
}
