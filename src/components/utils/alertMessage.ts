import { Toast } from 'bootstrap';
import { ToastProps, ToastComponent } from '../ToastComponent';

export function alertMessage(props: ToastProps) {
    const toastPlaceholder = <HTMLElement>(
        document.getElementById('toastPlaceholder')
    );
    new ToastComponent(toastPlaceholder, props).render();

    const toastElement = <HTMLDivElement>(
        document.getElementById('toastElement')
    );

    const toast = Toast.getOrCreateInstance(toastElement);
    toast?.show();
}
