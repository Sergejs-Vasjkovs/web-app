import React, { ChangeEvent } from "react";

type InputFieldProps = {
    id: string;
    name: string;
    value: string | number;
    onChange: (key: string, value: string) => void;
    error?: string;
    disabled?: boolean;
};

const InputField = ({
    id,
    name,
    onChange,
    value,
    error,
    disabled
}: InputFieldProps) => {
    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChange(target.name, target.value);
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : " is-valid");
    };

    const getMessageClasses = () => {
        return error ? "invalid-feedback" : "valid-feedback";
    };

    return (
        <div className="mt-2">
            <label htmlFor={id} className="form-label fs-5">
                {name}:
            </label>
            <input
                disabled={disabled}
                id={id}
                className={getInputClasses()}
                name={id}
                placeholder={name}
                value={value}
                onChange={handleChange}
            />
            <div className={getMessageClasses()} id={id}>
                {error ? error : "Looks good!"}
            </div>
        </div>
    );
};

export default InputField;
