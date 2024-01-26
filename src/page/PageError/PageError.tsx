import React from "react";
import { useHistory } from "react-router-dom";

const PageError = () => {
    const history = useHistory();

    const reloadPage = () => {
        location.reload();
    };

    const goToMainPage = () => {
        history.push("/");
    };

    return (
        <>
            <div className="alert alert-danger" role="alert">
                <p className="text-center">Oops, something went wrong!</p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mx-4">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={reloadPage}
                    >
                        Reload page
                    </button>
                </div>
                <div className="mx-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={goToMainPage}
                    >
                        Go to main page
                    </button>
                </div>
            </div>
        </>
    );
};

export default PageError;
