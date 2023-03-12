import { uniqueID } from '../../utils/uniqueID';
import { BaseComponent } from '../BaseComponent';

interface InputProps {
    id?: string;
    type: 'text' | 'number' | 'password';
    label?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
    min?: number;
    max?: number;
}

export class InputComponent extends BaseComponent {
    private inputElement?: HTMLElement;
    private id: string;
    private type: 'text' | 'number' | 'password';
    private label?: string;
    private placeholder?: string;
    private className?: string;
    private onChange?: (value: string) => void;
    private min?: number;
    private max?: number;

    constructor(element: HTMLElement, props: InputProps) {
        super(element);

        this.id = uniqueID();
        this.type = props.type;
        this.placeholder = props.placeholder;
        this.label = props.label;
        this.className = props.className;
        this.onChange = props.onChange;
        this.min = props.min;
        this.max = props.max;
    }
    render(): void {
        if (this.label) {
            this.element.innerHTML = /* html */ `
                <label for="${this.id}" class="form-label">
                    ${this.label}
                </label>
                <input type="${this.type}" id="${this.id}" class="form-control" min="${this.min}" max="${this.max}">
            `;
        } else {
            this.element.innerHTML = /* html */ `
                <input type="${this.type}" id="${this.id}" class="form-control" min="${this.min}" max="${this.max}">
            `;
        }

        this.assignPropsToAttribute();

        this.inputElement = <HTMLInputElement>(
            document.getElementById(`${this.id}`)
        );

        this.listenChange();
    }

    private listenChange() {
        this.inputElement?.addEventListener('input', (e: any) => {
            if (this.onChange) {
                this.onChange(e.target.value);
            }
        });
    }

    private assignPropsToAttribute() {
        if (this.placeholder) {
            this.inputElement?.setAttribute('placeholder', 'haha');
        }
    }
}
