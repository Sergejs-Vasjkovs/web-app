import React, { MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";

type NavBarMainProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const NavBarMain = ({ onClick }: NavBarMainProps) => {
    const history = useHistory();

    function handleClick() {
        history.push("/add-product");
    }

    return (
        <div className="container">
            <p className="h2">Product List</p>

            <div>
                <button
                    type="button"
                    className="btn btn-success ms-3"
                    onClick={handleClick}
                >
                    ADD
                </button>
                <button
                    id="delete-product-btn"
                    type="button"
                    className="btn btn-danger ms-3"
                    onClick={onClick}
                >
                    MASS DELETE
                </button>
            </div>
        </div>
    );
};

export default NavBarMain;
