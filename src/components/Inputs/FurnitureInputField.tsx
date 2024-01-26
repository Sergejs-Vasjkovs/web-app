import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import InfoText from "../../UI/InfoText";
import { ErrorType } from "../../page/productAdd/ProductAdd";

export type FurnitureInputType = {
    height: string;
    width: string;
    length: string;
};

const FurnitureInputInitialValue = {
    height: "",
    width: "",
    length: ""
};

type FurnitureInputTypeProps = {
    onClick: (input: FurnitureInputType) => void;
    error: ErrorType;
};

const FurnitureInputField = ({ onClick, error }: FurnitureInputTypeProps) => {
    const [input, setInput] = useState<FurnitureInputType>(
        FurnitureInputInitialValue
    );

    const handleFurnitureInput = (key: string, value: string) => {
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
                id="height"
                name="Height (CM)"
                onChange={handleFurnitureInput}
                value={input.height}
                error={error.height}
            />
            <InputField
                id="width"
                name="Width (CM)"
                onChange={handleFurnitureInput}
                value={input.width}
                error={error.width}
            />
            <InputField
                id="length"
                name="Length (CM)"
                onChange={handleFurnitureInput}
                value={input.length}
                error={error.length}
            />
            <InfoText title="Please, provide dimensions (HxWxL) for Furniture" />
        </>
    );
};

export default FurnitureInputField;
