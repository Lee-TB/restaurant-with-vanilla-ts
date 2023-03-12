import { uniqueID } from '../../utils/uniqueID';
import { BaseComponent } from '../BaseComponent';

interface UploadProps {
    id?: string;
    label?: string;
    className?: string;
    onChange?: (fileList: FileList) => void;
    required?: boolean;
    validFeedback?: string;
    invalidFeedback?: string;
}

export class UploadComponent extends BaseComponent {
    private inputElement?: HTMLInputElement;
    private id?: string;
    private label?: string;
    private className?: string;
    private onChange?: (fileList: FileList) => void;
    private required?: boolean;
    private validFeedback?: string;
    private invalidFeedback?: string;

    constructor(element: HTMLElement, props?: UploadProps) {
        super(element);

        this.id = props?.id || uniqueID();
        this.label = props?.label;
        this.className = props?.className;
        this.onChange = props?.onChange;
        this.required = props?.required;
        this.validFeedback = props?.validFeedback;
        this.invalidFeedback = props?.invalidFeedback;
    }

    render(): void {
        this.element.innerHTML = /* html */ `
            ${
                this.label
                    ? /* html */ `
                    <label for="${this.id}" class="form-label">
                        <span>${this.label}</span>
                    </label>`
                    : ''
            }
            
            <input
                class="form-control ${this.className}"
                type="file"
                id="${this.id}"
            />
            <div class="valid-feedback">
                ${this.validFeedback}
            </div>
            <div class="invalid-feedback">
                ${this.invalidFeedback}
            </div>
        `;

        this.assignPropsToAttribute;

        this.inputElement = <HTMLInputElement>(
            document.getElementById(`${this.id}`)
        );

        this.listenChange();
    }

    private listenChange() {
        this.inputElement?.addEventListener('change', () => {
            if (this.onChange && this.inputElement?.files) {
                this.onChange(this.inputElement.files);
            }
        });
    }

    private assignPropsToAttribute() {
        if (this.required) {
            this.inputElement?.setAttribute('required', 'true');
        }
    }
}
