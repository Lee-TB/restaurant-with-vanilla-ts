import { uniqueID } from '../../utils/uniqueID';
import { BaseComponent } from '../BaseComponent';

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    className?: string;
    options: Option[];
    defaultValues?: string[];
    onChange?: (checkedValues: string[]) => void;
}

export class CheckboxGroupComponent extends BaseComponent {
    private key: string;
    private options: Option[];
    private className?: string;
    private defaultValues?: string[];
    private onChange?: (checkedValues: string[]) => void;
    private checkboxClassName?: string;

    constructor(element: HTMLElement, props: CheckboxGroupProps) {
        super(element);

        this.key = uniqueID();
        this.className = props.className;
        this.options = props.options;
        this.defaultValues = props.defaultValues;
        this.onChange = props.onChange;

        this.checkboxClassName = `${this.key}-checkbox-group`;
    }

    render(): void {
        this.element.innerHTML = /* html */ `
            <div id="${this.key}" class="${this.className}">
                ${this.options
                    .map((option) => {
                        const inputId = `${this.key}-${option.value}`;
                        return /* html */ `
                            <div class="form-check">
                                <input
                                    id="${inputId}"
                                    class="form-check-input ${this.checkboxClassName}"
                                    type="checkbox"
                                    value="${option.value}"
                                    style="cursor: pointer;"
                                />
                                <label
                                    for="${inputId}"
                                    class="form-check-label"
                                    style="cursor: pointer;"
                                >
                                    ${option.label}
                                </label>
                            </div>
                        `;
                    })
                    .join('')}
            </div>
        `;

        this.listenClick();
    }

    private listenClick() {
        if (this.checkboxClassName) {
            const checkboxGroup = <NodeListOf<HTMLInputElement>>(
                document.querySelectorAll('.' + this.checkboxClassName)
            );

            checkboxGroup.forEach((checkbox) => {
                /* onChange Checked Values */
                checkbox.onclick = () => {
                    const values: string[] = [];
                    checkboxGroup.forEach((chekedCheckbox) => {
                        if (chekedCheckbox.checked) {
                            values.push(chekedCheckbox.value);
                        }
                    });

                    if (this.onChange) {
                        this.onChange(values);
                    }
                };

                /* Set default values */
                this.defaultValues?.forEach((value) => {
                    if (checkbox.value === value) {
                        checkbox.checked = true;
                    }
                });
            });
        }
    }
}
