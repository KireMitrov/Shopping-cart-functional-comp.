import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";
import CartOverlay from "../Cart Overlay/CartOverlay";
import { useClickOutside } from "../../hooks/useClickOutside";



function Navbar() {

    const { productsData, currencyData, currency, setCurrency, CartIsOpen, setCartIsOpen, categoryName, setCategoryName, cartItems } = useContext(ProductsContext);
    const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
    const cartRef = useRef();
    const currencyRef = useRef();
    useClickOutside(cartRef, () => setCartIsOpen(false));
    useClickOutside(currencyRef, () => setCurrencyIsOpen(false));

    return (
        <div className="header">
            {CartIsOpen && (
                <div style={{
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
                {productsData.categories.map((category) => (
                    <Link to={category.name} key={category.name} onClick={() => setCategoryName(category.name)}>
                        <div className={`navigation-element ${category.name === categoryName ? "tab-active" : ""}`} >
                            <p className={`label ${category.name === categoryName ? "label-active" : ""}`}>{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="actions">
                <div className="currency" onClick={()=> setCurrencyIsOpen(true)}>
                    <div className="currency-sign">
                        {currency}
                    </div>
                    <img src={currencyIsOpen ? 'VectorUp.svg':"Vector.svg"} alt="arrowUpDown" />
                </div>
                <div className="cart-items-notification" style={{ display: cartItems.length === 0 ? "none" : "block" }}>{cartItems.length}</div>
                <img className="cart-icon" src="Empty Cart.svg" alt="empty-cart" onClick={() => setCartIsOpen(!CartIsOpen)} />
            </div>
            <div style={{ display: !CartIsOpen ? "none" : "block" }} ref={cartRef}>
                <CartOverlay></CartOverlay>
            </div>
            <div className="currencySelector" style={{ display: !currencyIsOpen ? "none" : "block" }} ref={currencyRef}>
                {currencyData.currencies.map((symbol) => (
                    <div onClick={(e) => setCurrency(symbol.symbol)} className="currencyDiv">
                        <div>{symbol.symbol}</div>
                        <div>{symbol.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navbar