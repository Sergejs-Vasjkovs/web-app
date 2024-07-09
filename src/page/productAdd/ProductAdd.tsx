import TypeSwitcher from "../../components/TypeSwitcher";
import BookInputField, {
    BookInputType
} from "../../components/Inputs/BookInputField";
import DVDInputField, {
    DVDInputType
} from "../../components/Inputs/DVDInputField";
import FurnitureInputField, {
    FurnitureInputType
} from "../../components/Inputs/FurnitureInputField";
import ProductInputField, {
    ProductInputInitialValue,
    ProductInputType
} from "../../components/Inputs/ProductInputField";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavBarProduct from "../../components/NavBar/NavBarProduct";
import { validate } from "../../utils/ValidateInput";
import productService from "../../services/product.service";
import { useSKU } from "../../hooks/useSKU";

type SwitcherInputType = FurnitureInputType | DVDInputType | BookInputType;

export type PostDataType = {
    sku: string;
    name: string;
    price: string;
    type: string;
};

export type ErrorType = {
    [key: string]: string;
};

const ProductAdd = () => {
    const history = useHistory();
    const { sku } = useSKU();

    const [type, setType] = useState("DVD");
    const [product, setProduct] = useState<ProductInputType>(
        ProductInputInitialValue
    );
    const [typeInput, setTypeInput] = useState({});
    const [errors, setErrors] = useState<ErrorType>({});

    const handleTypeSwich = ({ target }: ChangeEvent<HTMLSelectElement>) => {
        setType(target.value);
    };

    const handleProductInput = (value: ProductInputType) => {
        setProduct((prev) => ({
            ...prev,
            ...value
        }));
    };

    const handleSwitcherInput = (value: SwitcherInputType) => {
        setTypeInput(value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const inputErrors = validate({ ...product, ...typeInput }, sku);
        const isValid = Object.keys(inputErrors).length === 0;
        if (!isValid) return;
        const data = {
            ...product,
            type,
            options: typeInput
        };
        postDataToServer(data);
    };
    const postDataToServer = async (data: PostDataType) => {
        try {
            const response = await productService.post(data);
            console.warn("Response", response);
            history.push("/");
        } catch (error) {
            console.error("Error during POST request:", error);
            // @ts-expect-error - receive error from php. need to check TS type
            setErrors(error.response.data.errors);
        }
    };

    useEffect(() => {
        const inputErrors = validate({ ...product, ...typeInput }, sku);
        setErrors(inputErrors);
    }, [product, typeInput]);

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <NavBarProduct onClick={handleFormSubmit} />
            </nav>
            <div className="container mt-4 col-sm-4 min-vh-100">
                <form id="product_form">
                    <ProductInputField
                        onClick={handleProductInput}
                        error={errors}
                    />
                    <TypeSwitcher onChange={handleTypeSwich} />
                    {type === "Furniture" && (
                        <FurnitureInputField
                            onClick={handleSwitcherInput}
                            error={errors}
                        />
                    )}
                    {type === "DVD" && (
                        <DVDInputField
                            onClick={handleSwitcherInput}
                            error={errors}
                        />
                    )}
                    {type === "Book" && (
                        <BookInputField
                            onClick={handleSwitcherInput}
                            error={errors}
                        />
                    )}
                </form>
            </div>
        </>
    );
};

export default ProductAdd;
