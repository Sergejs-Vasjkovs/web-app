import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import { ErrorType } from "../../page/productAdd/ProductAdd";

export type ProductInputType = {
    sku: string;
    name: string;
    price: string;
};

export const ProductInputInitialValue = {
    sku: "",
    name: "",
    price: ""
};

type ProductInputFieldProps = {
    onClick: (input: ProductInputType) => void;
    error: ErrorType;
};

const ProductInputField = ({ onClick, error }: ProductInputFieldProps) => {
    const [input, setInput] = useState<ProductInputType>(
        ProductInputInitialValue
    );

    const handleProductInput = (key: string, value: string) => {
        setInput((prev) => ({
            ...prev,
            [key]: value
        }));
        onClick(input);
    };

    useEffect(() => {
        onClick(input);
    }, [input]);

    return (
        <>
            <InputField
                id="sku"
                name="SKU"
                onChange={handleProductInput}
                value={input.sku}
                error={error.sku}
            />
            <InputField
                id="name"
                name="Name"
                onChange={handleProductInput}
                value={input.name}
                error={error.name}
            />
            <InputField
                id="price"
                name="Price"
                onChange={handleProductInput}
                value={input.price}
                error={error.price}
            />
        </>
    );
};

export default ProductInputField;
