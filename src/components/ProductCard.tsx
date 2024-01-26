import AttributesInfo from "../UI/AttributesInfo";
import React, { ChangeEvent } from "react";

type ProductCardProps = {
    sku: string;
    name: string;
    price: string;
    type: string;
    onChange: (checked: boolean, value: string) => void;
};

const ProductCard = ({
    sku,
    name,
    price,
    type,
    onChange
}: ProductCardProps) => {
    const handleCkeckbox = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = target;
        onChange(checked, value);
    };

    return (
        <div
            className="card bg-light mb-3"
            style={{
                minWidth: "200px"
            }}
        >
            <div className="card-header d-flex justify-content-between align-items-center">
                {sku}
                <input
                    value={sku}
                    type="checkbox"
                    className="delete-checkbox"
                    onChange={handleCkeckbox}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">{name}</h5>
                <p className="text-center">{price}$</p>
                <AttributesInfo type={type} />
            </div>
        </div>
    );
};

export default ProductCard;
