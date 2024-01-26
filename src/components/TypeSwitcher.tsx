import React from "react";

type TypeSwitcherProps = {
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const TypeSwitcher = ({ onChange }: TypeSwitcherProps) => {
    return (
        <>
            <select
                className="form-select mt-5 mb-3"
                id="productType"
                name="productType"
                onChange={onChange}
            >
                <option value="DVD" id="DVD">
                    DVD
                </option>
                <option value="Furniture" id="Furniture">
                    Furtinure
                </option>
                <option value="Book" id="Book">
                    Book
                </option>
            </select>
            <div className="invalid-feedback">
                Example invalid custom select feedback
            </div>
        </>
    );
};

export default TypeSwitcher;
