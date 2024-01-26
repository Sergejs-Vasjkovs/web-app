type InputType = {
    [key: string]: string;
};

const numericKeys = ["price", "height", "width", "length", "size", "weight"];

export const validate = (input: InputType, uniqueSKU: string[]) => {
    const inputErrors: Record<string, string> = {};

    if (input.sku.trim() === "") {
        inputErrors.sku = "SKU is required";
    }

    if (uniqueSKU.includes(input.sku.trim())) {
        inputErrors.sku = "This SKU number already exists";
    }

    if (input.name.trim() === "") {
        inputErrors.name = "NAME is required";
    }

    for (const key of numericKeys) {
        if (input[key] !== undefined) {
            const value = input[key];
            if (isNaN(Number(value)) || Number(value) <= 0) {
                inputErrors[
                    key
                ] = `${key.toUpperCase()} must be a positive number.`;
            }
        }
    }
    return inputErrors;
};
