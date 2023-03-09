export abstract class BaseComponent {
    protected element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
    }
    abstract render(): void;
}
