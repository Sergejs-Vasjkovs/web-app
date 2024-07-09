import React, { MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";

type NavBarProductProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const NavBarProduct = ({ onClick }: NavBarProductProps) => {
    const history = useHistory();

    const handleCancelClick = () => {
        history.push("/");
    };

    return (
        <div className="container">
            <p className="h2">Product Add</p>

            <div>
                <button
                    type="submit"
                    name="save"
                    className="btn btn-success ms-3"
                    onClick={onClick}
                >
                    Save
                </button>
                <button
                    type="button"
                    name="cancel"
                    className="btn btn-danger ms-3"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default NavBarProduct;
