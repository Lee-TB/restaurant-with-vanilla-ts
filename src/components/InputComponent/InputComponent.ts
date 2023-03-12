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
    required?: boolean;
    validFeedback?: string;
    invalidFeedback?: string;
}

export class InputComponent extends BaseComponent {
    private inputElement?: HTMLInputElement;
    private id: string;
    private type: 'text' | 'number' | 'password';
    private label?: string;
    private placeholder?: string;
    private className?: string;
    private onChange?: (value: string) => void;
    private min?: number;
    private max?: number;
    private required?: boolean;
    private validFeedback?: string;
    private invalidFeedback?: string;

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
        this.required = props.required || false;
        this.validFeedback = props.validFeedback;
        this.invalidFeedback = props.invalidFeedback;
    }

    render(): void {
        if (this.label) {
            this.element.innerHTML = /* html */ `
                <label for="${this.id}" class="form-label">
                    ${this.label}
                </label>
                <input type="${this.type}" id="${
                this.id
            }" class="form-control" min="${this.min}" max="${this.max}">
                <div class="valid-feedback">
                    ${this.validFeedback || ''}
                </div>
                <div class="invalid-feedback">
                    ${this.invalidFeedback || ''}
                </div>
            `;
        } else {
            this.element.innerHTML = /* html */ `
                <input type="${this.type}" id="${this.id}" class="form-control" min="${this.min}" max="${this.max}">                
            `;
        }

        this.inputElement = <HTMLInputElement>(
            document.getElementById(`${this.id}`)
        );

        this.assignPropsToAttribute();

        this.listenChange();
    }

    private listenChange() {
        this.inputElement?.addEventListener('input', () => {
            if (
                this.inputElement &&
                Number(this.inputElement?.value) <
                    Number(this.inputElement?.min)
            ) {
                this.inputElement.value = this.inputElement.min;
            }

            if (
                this.inputElement &&
                Number(this.inputElement?.value) >
                    Number(this.inputElement?.max)
            ) {
                this.inputElement.value = this.inputElement.max;
            }

            if (this.onChange && this.inputElement) {
                this.onChange(this.inputElement.value);
            }
        });
    }

    private assignPropsToAttribute() {
        if (this.placeholder) {
            this.inputElement?.setAttribute('placeholder', 'haha'); // need to fix
        }

        if (this.required) {
            this.inputElement?.setAttribute('required', 'true');
        }
    }
}
