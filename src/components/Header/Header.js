import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";
import CartOverlay from "../Cart Overlay/CartOverlay";
import { useClickOutside } from "../../hooks/useClickOutside";


function Header() {

    const { data, CartIsOpen, setCartIsOpen, categoryName, setCategoryName } = useContext(ProductsContext);
    const cartRef = useRef();
    useClickOutside(cartRef, () => setCartIsOpen(false));

    return (
        <div className="header">
            {CartIsOpen && (
                <div className="test" style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: `rgba(0,0,0,0.4)`,
                    zIndex: 10,
                }}>
                </div>
            )}
            <img className="logo" src="a-logo.svg" alt="logo"></img>
            <div className="navigation">
                {data.categories.map((category) => (
                    <Link to={category.name} >
                        <div  onClick={()=>setCategoryName(category.name)} className="navigation-element">
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
            <div style={{ display: !CartIsOpen ? "none" : "block" }} ref={cartRef}>
                <CartOverlay></CartOverlay>
            </div>
        </div>
    )
}

export default Header