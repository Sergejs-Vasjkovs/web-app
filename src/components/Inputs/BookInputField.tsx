import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import InfoText from "../../UI/InfoText";
import { ErrorType } from "../../page/productAdd/ProductAdd";

export type BookInputType = {
    weight: string;
};

const DVDInputInitialValue = {
    weight: ""
};

type BookInputFieldProps = {
    onClick: (input: BookInputType) => void;
    error: ErrorType;
};

const BookInputField = ({ onClick, error }: BookInputFieldProps) => {
    const [input, setInput] = useState<BookInputType>(DVDInputInitialValue);

    const handleDVDInput = (key: string, value: string) => {
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
                id="weight"
                name="Weight KG"
                onChange={handleDVDInput}
                value={input.weight}
                error={error.weight}
            />
            <InfoText title="Please, provide Weight (in KG) for Book." />
        </>
    );
};

export default BookInputField;
