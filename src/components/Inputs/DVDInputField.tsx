import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import InfoText from "../../UI/InfoText";
import { ErrorType } from "../../page/productAdd/ProductAdd";

export type DVDInputType = {
    size: string;
};

const DVDInputInitialValue = {
    size: ""
};

type DVDInputFieldProps = {
    onClick: (input: DVDInputType) => void;
    error: ErrorType;
};

const DVDInputField = ({ onClick, error }: DVDInputFieldProps) => {
    const [input, setInput] = useState<DVDInputType>(DVDInputInitialValue);

    const handleDVDInput = (key: string, value: string) => {
        setInput((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        onClick(input);
    }, [input]);

    return (
        <>
            <InputField
                id="size"
                name="Size MB"
                onChange={handleDVDInput}
                value={input.size}
                error={error.size}
            />
            <InfoText title="Please, provide Size (in MB) for DVD-disc." />
        </>
    );
};

export default DVDInputField;
