import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";

function CartOverlay() {

    const { setCartIsOpen, cartItems } = useContext(ProductsContext);

    return (
        <div className="cart-overlay" >
            <div className="cart-overlay-products-container">
                <div>My Bag, {cartItems.length} items</div>
                <div>
                    {cartItems.map((item) => (
                        <div>
                            <div>{item.name}</div>
                            <div>$50.00</div>
                            <div>Size:</div>
                            <div>Color:</div>
                            <img src={item.gallery[0]} alt={item.name}></img>
                        </div>
                    ))}
                </div>
                <div className="cart-overlay-total">
                    <div className="cart-overlay-total-text">Total</div>
                    <div className="cart-overlay-price">$299,00</div>
                </div>
            </div>
            <div className="cart-overlay-btns">
                <Link to="cart"><button className="cart-overlay-view-bag" onClick={() => (setCartIsOpen(false))} >VIEW BAG</button></Link>
                <button className="cart-overlay-check-out">CHECK OUT</button>
            </div>
        </div>
    )
}

export default CartOverlay