export const html = /*html*/ `
<form
    class="row g-3 needs-validation"
    id="addMenuItemForm"
    novalidate
>
    <div class="col-md-12">
        <label for="name" class="form-label">
            Name
        </label>
        <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            required
        />
        <div class="valid-feedback">
            Looks good!
        </div>
        <div class="invalid-feedback">
            Please fill this field!
        </div>
    </div>
    <div class="col-md-6">
        <label for="price" class="form-label">
            Price
        </label>
        <input
            type="number"
            class="form-control"
            id="price"
            name="price"
            required
        />
        <div class="valid-feedback">
            Looks good!
        </div>
        <div class="invalid-feedback">
            Please fill this field!
        </div>
    </div>
    <div class="col-md-6">
        <label for="image" class="form-label">
            <span>Image</span>
        </label>
        <input
            class="form-control"
            type="file"
            id="image"
            name="image"
            required
        />
        <div class="valid-feedback">
            Looks good!
        </div>
        <div class="invalid-feedback">
            Please fill this field!
        </div>
    </div>
    <div class="col-12">
        <label for="description" class="form-label">
            Description
        </label>
        <textarea
            class="form-control"
            id="description"
            rows="3"
            name="description"
        ></textarea>
    </div>
    <div class="col-12">
        <label
            for="menuTypeSelect"
            class="form-label"
        >
            Menu Type
        </label>
        <select
            id="menuTypeSelect"
            class="form-select"
            name="menuType"
        >
            <option value="FoodMenu">
                Food Menu
            </option>
            <option value="DrinkMenu">
                Drink Menu
            </option>
        </select>
    </div>
    <div class="col-12">
        <div id="foodTypeGroup">
            <p>Food Type</p>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input
                        class="menuItemCategories form-check-input foodCategoryCheckbox"
                        type="checkbox"
                        value="Breakfast"
                        id="breakfastCheckbox"
                    />
                    <label
                        class="form-check-label"
                        for="breakfastCheckbox"
                    >
                        Breakfast
                    </label>
                </div>
                <div class="form-check">
                    <input
                        class="menuItemCategories form-check-input foodCategoryCheckbox"
                        type="checkbox"
                        value="Lunch"
                        id="lunchCheckbox"
                    />
                    <label
                        class="form-check-label"
                        for="lunchCheckbox"
                    >
                        Lunch
                    </label>
                </div>
                <div class="form-check">
                    <input
                        class="menuItemCategories form-check-input foodCategoryCheckbox"
                        type="checkbox"
                        value="Dinner"
                        id="dinnerCheckbox"
                    />
                    <label
                        class="form-check-label"
                        for="dinnerCheckbox"
                    >
                        Dinner
                    </label>
                </div>
            </div>
        </div>

        <div id="drinkTypeGroup">
            <p>Drink Type</p>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input
                        class="menuItemCategories form-check-input drinkCategoryCheckbox"
                        type="checkbox"
                        value="SoftDrink"
                        id="softDrinkCheckbox"
                    />
                    <label
                        class="form-check-label"
                        for="softDrinkCheckbox"
                    >
                        Soft Drink
                    </label>
                </div>
                <div class="form-check">
                    <input
                        class="menuItemCategories form-check-input drinkCategoryCheckbox"
                        type="checkbox"
                        value="Alcohol"
                        id="alcoholCheckbox"
                    />
                    <label
                        class="form-check-label"
                        for="alcoholCheckbox"
                    >
                        Alcohol
                    </label>
                </div>
            </div>
        </div>
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
            id="submitMenuItemButton"
            name="submitButton"
            class="btn btn-primary"
        >
            <span>Add</span>
            <i class="bi bi-plus"></i>
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
