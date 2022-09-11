import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";

function CartOverlay() {

    const { setCartIsOpen, cartItems, currency } = useContext(ProductsContext);

    return (
        <div className="cart-overlay" >
            <div className="cart-overlay-products-container">
                <div><b>My Bag,</b> {cartItems.length} items</div>
                {cartItems.map((item) => (
                <div className="cart-overlay-item-container">
                    <div className="cart-overlay-items-left">
                        <div>
                            <div className="cart-overlay-text">{item.brand}</div>
                            <div className="cart-overlay-text">{item.name}</div>
                            <div className="cart-overlay-product-price" >$50.00</div>
                        </div>
                        <div>
                            {item.attributes.map((attribute, index) => {
                                if (attribute.type === 'text')
                                    return <div key={index}>
                                        <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                        <div className="attributes-container">
                                            {attribute.items.map((value) => (
                                                <div className="cart-overlay-attributes-rectangle" key={value.value}>{value.value}</div>
                                            ))}
                                        </div>
                                    </div>
                                return <div key={index}>
                                    <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                    <div className="attributes-container">
                                        {attribute.items.map((value) => (
                                            <div className="cart-overlay-attributes-rectangle-color" style={{ backgroundColor: `${value.value}` }} key={value.value}></div>
                                        ))}
                                    </div>
                                </div>
                            }
                            )}
                        </div>
                    </div>
                        <div className="cart-overlay-items-right">
                            <div className="cart-quantity-selector">
                                <div className="cart-overlay-attributes-rectangle">+</div>
                                <div className="cart-overlay-item-quantity">1</div>
                                <div className="cart-overlay-attributes-rectangle">-</div>
                            </div>
                            <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                        </div>
                </div>
            ))}
                <div className="cart-overlay-total">
                    <div className="cart-overlay-total-text">Total</div>
                    <div className="cart-overlay-price">{currency} 299,00</div>
                </div>
            <div className="cart-overlay-btns">
                <Link to="cart"><button className="cart-overlay-view-bag" onClick={() => (setCartIsOpen(false))} >VIEW BAG</button></Link>
                <button className="cart-overlay-check-out">CHECK OUT</button>
            </div>
            </div>
        </div>
    )
}

export default CartOverlay