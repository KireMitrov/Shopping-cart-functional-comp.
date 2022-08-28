import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";

function CartOverlay() {

    const { setCartIsOpen } = useContext(ProductsContext);

    return (
        <div className="cart-overlay" >
            <div className="cart-overlay-products-container">

                <div className="cart-overlay-total">
                    <div>Total:</div>
                    <div>$299,00</div>
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