import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";
import CartOverlay from "../Cart Overlay/CartOverlay";
import { useClickOutside } from "../../hooks/useClickOutside";
import { productsData, currencyData } from "../../fakeData/fakeData";
import logo from "../assets/images/a-logo.svg"
import emptycart from "../assets/images/Empty Cart.svg"
import vector from "../assets/images/Vector.svg"
import vectorUp from "../assets/images/VectorUp.svg"



function Navbar() {
    
    const { currency, setCurrency, CartIsOpen, setCartIsOpen, categoryName, setCategoryName, cartItems, totalItems } = useContext(ProductsContext);
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
                    minWidth: "100vw",
                    minHeight: "200vh",
                    backgroundColor: `rgba(0,0,0,0.4)`,
                    zIndex: 10,
                }}>
                </div>
            )}

            <img className="logo" src={logo} alt='logo'></img>
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
                <div className="currency" onClick={() => setCurrencyIsOpen(true)}>
                    <div className="currency-sign" >
                        {currency}
                    </div>
                    <img src={currencyIsOpen ? `${vectorUp}` : `${vector}`} alt="arrowUpDown" />
                </div>
                <div className="actions-cart">
                    <div className="cart-items-notification" style={{ display: cartItems.length === 0 ? "none" : "block" }}>{totalItems}</div>
                    <img className="cart-icon" src={emptycart} alt="empty-cart" onClick={() => setCartIsOpen(!CartIsOpen)} />
                </div>
            </div>
            <div style={{ display: !CartIsOpen ? "none" : "block" }} ref={cartRef}>
                <CartOverlay></CartOverlay>
            </div>
            <div className="currencySelector" style={{ display: !currencyIsOpen ? "none" : "block" }} ref={currencyRef}>
                {currencyData.currencies.map((symbol) => (
                    <div onClick={(e) => { setCurrency(symbol.symbol); setCurrencyIsOpen(false) }} className="currencyDiv" key={symbol.symbol}>
                        <div>{symbol.symbol}</div>
                        <div>{symbol.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navbar