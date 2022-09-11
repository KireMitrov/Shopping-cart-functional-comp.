import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";
import CartOverlay from "../Cart Overlay/CartOverlay";
import { useClickOutside } from "../../hooks/useClickOutside";
import { gql, useQuery } from "@apollo/client";



function Navbar() {

    const { productsData, currencyData,currency, setCurrency, CartIsOpen, setCartIsOpen, categoryName, setCategoryName } = useContext(ProductsContext);
    const cartRef = useRef();
    useClickOutside(cartRef, () => setCartIsOpen(false));
    // const currenciesSymbol = useQuery(CURRENCY_QUERY);
    // console.log(currenciesSymbol.data.currencies[0].symbol)
    
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
                {productsData.categories.map((category) => (
                    <Link to={category.name} key={category.name} onClick={() => setCategoryName(category.name)}>
                        <div className={`navigation-element ${category.name === categoryName ? "tab-active" : ""}`} >
                            <p className={`label ${category.name === categoryName ? "label-active" : ""}`}>{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="actions">
                <div className="currency">
                    <div className="currency-sign">
                            {currencyData.currencies.map((symbol) => (
                                <p onClick={(e)=> setCurrency(symbol.symbol)}>{symbol.symbol}  {symbol.label}</p>
                            ))}
                    </div>
                    {currency}
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

export default Navbar