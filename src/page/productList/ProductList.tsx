import NavBarMain from "../../components/NavBar/NavBarMain";
import React, { useEffect, useState } from "react";
import ProductCard, { OptionsType } from "../../components/ProductCard";
import productService from "../../services/product.service";
import { useSKU } from "../../hooks/useSKU";

export type ProductListType = {
    id: string;
    sku: string;
    name: string;
    price: string;
    type: string;
    options: OptionsType;
    created_at: string;
};

const ProductList = () => {
    const [productsList, setProductList] = useState<ProductListType[]>([]);
    const [checkbox, setCheckbox] = useState<string[]>([]);
    const { getAllSKUnumbers } = useSKU();

    useEffect(() => {
        getDataFromServer();
    }, []);

    const handleCheck = (checked: boolean, value: string) => {
        setCheckbox((prev) =>
            checked ? [...prev, value] : prev.filter((check) => check !== value)
        );
    };

    const getDataFromServer = async () => {
        try {
            const response = await productService.get();
            console.warn("Response:", response);
            setProductList(response);
            getAllSKUnumbers(response);
        } catch (error) {
            console.error("Error during GET request:", error);
        }
    };

    const handleMassDelete = async () => {
        try {
            const response = await productService.delete({
                data: checkbox
            });
            console.warn("Response", response);
            await getDataFromServer();
        } catch (error) {
            console.error("Error during DELETE request:", error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <NavBarMain onClick={handleMassDelete} />
            </nav>
            <div className="container min-vh-100">
                <div className=" d-flex flex-wrap justify-content-around mt-5">
                    {productsList.map((product) => (
                        <ProductCard
                            key={product.sku}
                            {...product}
                            onChange={handleCheck}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductList;
