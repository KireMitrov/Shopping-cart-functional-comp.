import React, { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";
import CartOverlay from "../Cart Overlay/CartOverlay";

function Header() {

    const { data, CartIsOpen, setCartIsOpen } = useContext(ProductsContext);
    
    return (
        <div className="header">
            <img className="logo" src="a-logo.svg" alt="logo"></img>
            <div className="navigation">
                {data.categories.map((category) => (
                    <Link to={category.name}>
                        <div className="navigation-element">
                            <p className="label">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="actions">
                <div className="currency">
                    <div className="currency-sign">
                        $
                    </div>
                    <img src="Vector.svg" alt="" />
                </div>
                <img className="cart-icon" src="Empty Cart.svg" alt="empty-cart" onClick={() => setCartIsOpen(!CartIsOpen)} />
            </div>
            <div style={{ display: !CartIsOpen ? "none" : "block" }}>
                <CartOverlay></CartOverlay>
            </div>
        </div>
    )
}

export default Header