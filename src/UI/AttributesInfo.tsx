import { OptionsType } from "../components/ProductCard";
import React from "react";

type AttributesInfoProps = {
    options: OptionsType;
    type: string;
};

const AttributesInfo = ({ options, type }: AttributesInfoProps) => {
    return (
        <>
            {type === "DVD" && (
                <p className="card-text text-center">Size: {options.size} MB</p>
            )}
            {type === "Furniture" && (
                <p className="card-text text-center">
                    Dimention: <br />
                    {options.width}x{options.height}x{options.length} CM
                </p>
            )}
            {type === "Book" && (
                <p className="card-text text-center">
                    Weight: {options.weight} KG
                </p>
            )}
        </>
    );
};

export default AttributesInfo;
