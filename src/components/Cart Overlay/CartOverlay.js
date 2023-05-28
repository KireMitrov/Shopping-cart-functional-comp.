import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";

function CartOverlay() {

    const { setCartIsOpen, cartItems, currency, currencyObj, totalPrice, handleIncrement, handleDecrement, removeFromCart, handleTextAttributeChange, totalItems } = useContext(ProductsContext);

    return (
        <div className="cart-overlay" >
            <div><b>My Bag,</b> {totalItems} items</div>
            <div className="cart-overlay-products-container">
                {cartItems.map((item, index) => (
                    <div className="cart-overlay-item-container" key={index}>
                        <div className="cart-overlay-items-left">
                            <div className="items-left">
                                <div>
                                    <div className="cart-overlay-text">{item.brand}</div>
                                    <div className="cart-overlay-text">{item.name}</div>
                                    <div className="cart-overlay-product-price" >{currency} {currencyObj[index].amount.toFixed(2)}</div>
                                </div>
                                <div>
                                    {item.attributes.map((attribute, index) => {
                                        if (attribute.type === 'text')
                                            return <div key={index}>
                                                <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                                <div className="attributes-container">
                                                    {attribute.items.map((value) => (
                                                        <div
                                                            className={`cart-overlay-attributes-rectangle ${item.addedAttributes[index].defaultValue === value.value ? "atributes-selected" : ""}`}
                                                            key={value.value}
                                                            onClick={() => handleTextAttributeChange(value.value, item.name, attribute.name)}>{value.value}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        return <div key={index}>
                                            <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                            <div className="attributes-container">
                                                {attribute.items.map((value) => (
                                                    <div className={`cart-overlay-attributes-rectangle-color ${item.addedAttributes[index].defaultValue === value.value ? "cart-overlay-color-selected" : ""}`}
                                                        style={{ backgroundColor: `${value.value}` }}
                                                        key={value.value}
                                                        onClick={() => handleTextAttributeChange(value.value, item.name, attribute.name)}></div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    )}
                                </div>
                                                        </div>
                                                        <div className="cart-overlay-items-right">
                                <div className="incrementDecrement" onClick={() => handleIncrement(item)}>+</div>
                                <div className="cart-overlay-item-quantity">{item.quantity}</div>
                                <div className="incrementDecrement" onClick={() => handleDecrement(item)}>-</div>
                                                        </div>
                            </div>
                        <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                        <div className="cart-overlay-remove-btn" onClick={() => removeFromCart(item)}>x</div>
                    </div>
                ))}
            </div>
            <div className="cart-overlay-total">
                <div className="cart-overlay-total-text">Total</div>
                <div className="cart-overlay-price">{currency} {totalPrice}</div>
            </div>
            <div className="cart-overlay-btns">
                <Link to="cart"><button className="cart-overlay-view-bag" onClick={() => (setCartIsOpen(false))} >VIEW BAG</button></Link>
                <button className="cart-overlay-check-out">CHECK OUT</button>
            </div>
        </div>
    )
}

export default CartOverlay