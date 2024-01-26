import React from "react";

type AttributesInfoProps = {
    type: string;
};

const AttributesInfo = ({ type }: AttributesInfoProps) => {
    const convertedType = JSON.parse(type);
    const keys = Object.keys(convertedType);
    const switchetType = keys[0];

    return (
        <>
            {switchetType === "dvd" && (
                <p className="card-text text-center">
                    Size: {convertedType[switchetType].size}MB
                </p>
            )}
            {switchetType === "furniture" && (
                <p className="card-text text-center">
                    Dimention: {convertedType[switchetType].width}x
                    {convertedType[switchetType].height}x
                    {convertedType[switchetType].length}x
                </p>
            )}
            {switchetType === "book" && (
                <p className="card-text text-center">
                    Weight: {convertedType[switchetType].weight}KG
                </p>
            )}
        </>
    );
};

export default AttributesInfo;
