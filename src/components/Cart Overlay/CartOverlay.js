import React from "react";

function CartOverlay(){

    return(
        <div className="cart-overlay" >
            <div className="cart-overlay-products-container">
            
            <div className="cart-overlay-total">
                <div>Total:</div>
                <div>$299,00</div>
            </div>
            </div>
            <div className="cart-overlay-btns">
                <button className="cart-overlay-view-bag">VIEW BAG</button>
                <button className="cart-overlay-check-out">CHECK OUT</button>
            </div>
        </div>
    )
}

export default CartOverlay