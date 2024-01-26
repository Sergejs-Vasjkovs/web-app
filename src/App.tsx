import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProductAddLazy } from "./page/productAdd/ProductAdd.lazy";
import { ProductListLazy } from "./page/productList/ProductList.lazy";
import { SKUProvider } from "./hooks/useSKU";
import Footer from "./components/Footer";
import Loading from "./UI/Loading";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    return (
        <>
            <SKUProvider>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route path="/add-product" component={ProductAddLazy} />
                        <Route path="/" exact component={ProductListLazy} />
                        <Redirect to="/" />
                    </Switch>
                </Suspense>
            </SKUProvider>
            <Footer />
        </>
    );
}

export default App;
