import React, { ReactNode, createContext, useContext, useState } from "react";
import { ProductListType } from "../page/productList/ProductList";

type SKUContextType = {
    sku: string[];
    getAllSKUnumbers: (productsList: ProductListType[]) => void;
};

type SKUProviderProps = {
    children: ReactNode;
};

const SKUContext = createContext<SKUContextType>({
    sku: [],
    getAllSKUnumbers: () => {}
});

export const useSKU = () => {
    return useContext(SKUContext);
};

export const SKUProvider = ({ children }: SKUProviderProps) => {
    const [sku, setSku] = useState<string[]>([]);

    const getAllSKUnumbers = (productsList: ProductListType[]) => {
        const sku = productsList.map((item) => item.sku);
        setSku(sku);
    };

    return (
        <SKUContext.Provider value={{ sku, getAllSKUnumbers }}>
            {children}
        </SKUContext.Provider>
    );
};
