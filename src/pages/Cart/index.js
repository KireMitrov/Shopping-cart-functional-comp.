import React, { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";

function Cart() {

    const { cartItems } = useContext(ProductsContext);

    return (
        <div>
            <div className="title-cart-position">
                <h1 className="title-cart">Cart</h1>
            </div>
            <div className="cart-line"></div>
            {cartItems.map((item) => (
                <div className="cart-item-container">
                    <div className="cart-attributes">
                        <div className="cart-brand-title-price">
                            <div className="product-brand">{item.brand}</div>
                            <div className="product-title">{item.name}</div>
                            <div className="product-description-price" >$50.00</div>
                        </div>
                        <div>
                            {item.attributes.map((attribute, index) => {
                                if (attribute.type === 'text')
                                    return <div key={index}>
                                        <p className="attributes-text">{attribute.name}:</p>
                                        <div className="attributes-container">
                                            {attribute.items.map((value) => (
                                                <div className="attributes-rectangle" key={value.value}>{value.value}</div>
                                            ))}
                                        </div>
                                    </div>
                                return <div key={index}>
                                    <p className="attributes-text">{attribute.name}:</p>
                                    <div className="attributes-container">
                                        {attribute.items.map((value) => (
                                            <div className="attributes-rectangle-color" style={{ backgroundColor: `${value.value}` }} key={value.value}></div>
                                        ))}
                                    </div>
                                </div>
                            }
                            )}
                        </div>
                    </div>
                        <div>
                            <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                        </div>
                        <div className="cart-line-container"></div>
                </div>
            ))}
            <div>Quantity: {cartItems.length}</div>
            <div>Total: $300.00</div>
            <button className="cart-order-btn">ORDER</button>
        </div>
    )
}

export default Cart