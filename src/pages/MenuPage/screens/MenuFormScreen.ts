import { MenuAPI } from '../../../api/MenuAPI';
import { BaseComponent } from '../../../components/BaseComponent';
import { CheckboxGroupComponent } from '../../../components/CheckboxGroupComponent/CheckboxGroupComponent';
import { InputComponent } from '../../../components/InputComponent/InputComponent';
import { ModalComponent } from '../../../components/ModalComponent';
import { SelectComponent } from '../../../components/SelectComponent/SelectComponent';
import { UploadComponent } from '../../../components/UploadComponent/UploadComponent';
import { alertMessage } from '../../../components/utils/alertMessage';
import { drinkCategories, foodCategories } from '../../../data/categories';
import { MenuItem } from '../../../models/interfaces/MenuItem';
import { bootstrapFormValidation } from '../../../utils/bootstrap/bootstrapFormValidation';
import { uploadImage } from '../../../utils/cloudinary/uploadImage';
import { MenuPage } from '../MenuPage';

export interface MenuFormScreenProps {
    type: 'add' | 'update';
    defaultFormValues?: MenuItem;
}

export class MenuFormScreen extends BaseComponent {
    private type: 'add' | 'update';
    private defaultFormValues?: MenuItem;

    private menuFormElement?: HTMLFormElement;
    private submitData: MenuItem;

    constructor(element: HTMLElement, props: MenuFormScreenProps) {
        super(element);

        this.type = props.type;
        this.defaultFormValues = props.defaultFormValues;
        this.submitData = {
            id: '',
            name: '',
            price: 0,
            image: '',
            description: '',
            menuType: 'foodmenu',
            categories: [],
            createAt: new Date(),
        };
        if (this.defaultFormValues) {
            this.submitData = this.defaultFormValues;
        }
    }

    render(): void {
        this.element.innerHTML = /*html*/ `
            <form
                class="row g-3 needs-validation"
                id="menuFormElement"
                novalidate
            >
                <div class="col-md-12">
                    <div id="menuFormNamePlaceholder"></div>                   
                </div>
                <div class="col-md-6">
                    <div id="menuFormPricePlaceholder"></div>
                </div>
                <div class="col-md-6">
                    <div id="menuFormImagePlaceholder"></div>
                </div>
                <div class="col-12">
                    <div id="menuFormDescriptionPlaceholder"></div>
                </div>
                <div class="col-12">
                    <label
                        class="form-label"
                    >
                        Menu Type
                    </label>
                    <div id="menuFormSelectPlaceholder"></div>
                </div>
                <div class="col-12">
                    <div id="menuFormCategoriesPlaceholder"></div>                    
                </div>
                <div
                    class="col-12 d-flex justify-content-end gap-3"
                >
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        id="submitMenuButton"
                        class="btn btn-primary"
                    >   
                        ${
                            this.type === 'add'
                                ? `<span>Add Menu&nbsp</span><i class="bi bi-plus-circle"></i>`
                                : `<span>Update Menu&nbsp</span><i class="bi bi-pencil-square"></i>`
                        }                    
                        
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </button>
                </div>
            </form>
        `;

        /* Update form */
        if (this.type === 'update') {
        }

        /* Render form's elements */
        this.renderNameInput();

        this.renderPriceInput();

        this.renderImageUpload();

        this.renderDescriptionInput();

        this.renderMenuSelect();

        this.renderCategories(foodCategories);

        /* initiate menu form */
        this.menuFormElement = <HTMLFormElement>(
            document.getElementById('menuFormElement')
        );

        /* Listen submit form */
        this.menuFormElement.addEventListener(
            'submit',
            this.handleSubmit.bind(this)
        );
    }

    private handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        bootstrapFormValidation();
        if (this.menuFormElement?.checkValidity()) {
            if (this.type === 'add') {
                this.createMenu();
            } else if (this.type === 'update') {
                this.updateMenu();
            }
        }
    }

    private createMenu() {
        this.submitData.createAt = new Date();
        const menuAPI = new MenuAPI(this.submitData.menuType);
        menuAPI
            .post(this.submitData)
            .then(() => {
                this.menuFormElement?.reset();
                ModalComponent.hide();
                alertMessage({
                    type: 'success',
                    title: 'Create menu successful!',
                    content: `Menu ${this.submitData.name} was created`,
                });

                /* Rerender menu table and tabs */
                MenuPage.renderMenuTable(this.submitData.menuType);
                MenuPage.renderMenuTabs(this.submitData.menuType);
            })
            .catch((error) => {
                console.log('Create menu failure:', error);
                alertMessage({
                    type: 'error',
                    title: 'Create menu failure!',
                });
            });
    }

    private updateMenu() {
        this.submitData.createAt = new Date();
        const menuAPI = new MenuAPI(this.submitData.menuType);
        menuAPI
            .update(Number(this.defaultFormValues?.id), this.submitData)
            .then(() => {
                this.menuFormElement?.reset();
                ModalComponent.hide();
                alertMessage({
                    type: 'success',
                    title: 'Update menu successful!',
                    content: `Menu ${this.submitData.name} was updated`,
                });

                /* Rerender menu table and tabs */
                MenuPage.renderMenuTable(this.submitData.menuType);
                MenuPage.renderMenuTabs(this.submitData.menuType);
            })
            .catch((error) => {
                console.log('Update menu failure:', error);
                alertMessage({
                    type: 'error',
                    title: 'Update menu failure!',
                });
            });
    }

    private renderNameInput() {
        const menuFormNamePlaceholder = <HTMLDivElement>(
            document.getElementById('menuFormNamePlaceholder')
        );

        new InputComponent(menuFormNamePlaceholder, {
            type: 'text',
            label: 'Name',
            required: true,
            validFeedback: 'OK',
            invalidFeedback: 'Please, fill name!',
            onChange: (value) => {
                this.submitData.name = value;
            },
            defaultValue: this.defaultFormValues?.name,
        }).render();
    }

    private renderPriceInput() {
        const menuFormPricePlaceholder = <HTMLDivElement>(
            document.getElementById('menuFormPricePlaceholder')
        );

        new InputComponent(menuFormPricePlaceholder, {
            type: 'number',
            label: 'Price',
            required: true,
            validFeedback: 'OK',
            invalidFeedback: 'Please, fill Price!',
            onChange: (value) => {
                this.submitData.price = Number(value);
            },
            defaultValue: String(this.defaultFormValues?.price),
        }).render();
    }

    private renderImageUpload() {
        const menuFormImagePlaceholder = <HTMLDivElement>(
            document.getElementById('menuFormImagePlaceholder')
        );

        new UploadComponent(menuFormImagePlaceholder, {
            label: 'Upload Image',
            onChange: async (fileList) => {
                const res = await uploadImage(fileList[0]);
                this.submitData.image = res.secure_url;
            },
        }).render();
    }

    private renderDescriptionInput() {
        const menuFormDescriptionPlaceholder = <HTMLDivElement>(
            document.getElementById('menuFormDescriptionPlaceholder')
        );

        new InputComponent(menuFormDescriptionPlaceholder, {
            type: 'text',
            label: 'Description',
            onChange: (value) => {
                this.submitData.description = value;
            },
            defaultValue: this.defaultFormValues?.description,
        }).render();
    }

    private renderMenuSelect() {
        const menuFormSelectPlaceholder = <HTMLElement>(
            document.getElementById('menuFormSelectPlaceholder')
        );

        new SelectComponent(menuFormSelectPlaceholder, {
            options: [
                {
                    label: 'Food Menu',
                    value: 'foodmenu',
                },
                {
                    label: 'Drink Menu',
                    value: 'drinkmenu',
                },
            ],
            onChange: (value) => {
                if (value === 'foodmenu') {
                    this.renderCategories(foodCategories);
                } else {
                    this.renderCategories(drinkCategories);
                }
                this.submitData.menuType = <'foodmenu' | 'drinkmenu'>value;
            },
            defaultValue: this.defaultFormValues?.menuType,
        }).render();
    }

    private renderCategories(categories: string[]) {
        const menuFormCategoriesPlaceholder = <HTMLElement>(
            document.getElementById('menuFormCategoriesPlaceholder')
        );

        const options = categories.map((category) => {
            return {
                label: category,
                value: category,
            };
        });

        new CheckboxGroupComponent(menuFormCategoriesPlaceholder, {
            options: options,
            className: 'd-flex gap-3 flex-wrap',
            onChange: (checkedValues: string[]) => {
                this.submitData.categories = checkedValues;
            },
            defaultValues: this.defaultFormValues?.categories || [],
        }).render();
    }
}
