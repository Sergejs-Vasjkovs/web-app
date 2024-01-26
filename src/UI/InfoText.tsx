import React from "react";

type InfoTextType = {
    title: string;
};

const InfoText = ({ title }: InfoTextType) => {
    return <h5 className="mt-4 text-center">{title}</h5>;
};

export default InfoText;
