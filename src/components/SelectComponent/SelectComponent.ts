import { uniqueID } from '../../utils/uniqueID';
import { BaseComponent } from '../BaseComponent';

interface Option {
    value: string;
    label: string;
}

export interface SelectProps {
    options: Option[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    key?: string;
}

export class SelectComponent extends BaseComponent {
    private selectElement?: HTMLSelectElement;
    private key: string;
    private options: Option[];
    private defaultValue?: string;
    private onChange?: (value: string) => void;

    constructor(element: HTMLElement, props: SelectProps) {
        super(element);
        this.key = props.key || uniqueID();

        this.options = props.options;
        this.defaultValue = props.defaultValue;
        this.onChange = props.onChange;
    }

    render(): void {
        this.element.innerHTML = /* html */ `            
            <select
                id="${this.key}"
                class="form-select"                
            >
                ${this.options
                    .map((option) => {
                        return /* html */ `
                            <option value="${option.value}">
                                ${option.label}
                            </option>    
                        `;
                    })
                    .join('')}                            
            </select>
        `;

        this.selectElement = <HTMLSelectElement>(
            document.getElementById(`${this.key}`)
        );

        if (this.defaultValue) {
            this.renderWithDefaultValue();
        }

        this.listenChange();
    }

    private renderWithDefaultValue() {
        if (this.selectElement) {
            for (let i = 0; i < this.selectElement.options.length; i++) {
                if (this.selectElement.options[i].value === this.defaultValue) {
                    this.selectElement.selectedIndex = i;
                }
            }
        }
    }

    private listenChange() {
        if (this.selectElement) {
            this.selectElement.addEventListener('change', () => {
                const optionElement =
                    this.selectElement?.options[
                        this.selectElement.selectedIndex
                    ];
                const value = optionElement?.value;

                if (this.onChange && value) {
                    this.onChange(value);
                }
            });
        }
    }
}
