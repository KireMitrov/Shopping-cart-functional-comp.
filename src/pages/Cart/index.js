import React, { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";

function Cart() {

    const { cartItems, currency, currencyObj, totalPrice, handleIncrement, handleDecrement } = useContext(ProductsContext);
    let taxPrice = totalPrice * 21 / 100;
    let totalToPay = parseFloat(taxPrice) + parseFloat(totalPrice);


    return (
        <div>
            <div className="title-cart-position">
                <h1 className="title-cart">Cart</h1>
            </div>
            <div className="cart-line"></div>
            {cartItems.map((item, index) => (
                <div className="cart-item-container">
                    <div className="cart-attributes">
                        <div className="cart-brand-title-price">
                            <div className="product-brand">{item.brand}</div>
                            <div className="product-title">{item.name}</div>
                            <div className="product-description-price" >{currency} {currencyObj[index].amount}</div>
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
                    <div className="cart-items-right">
                        <div className="cart-quantity-selector">
                            <div className="cart-minus-plus-squares" onClick={() => handleIncrement(item.quantity, item.name)}>+</div>
                            <div className="cart-item-quantity">{item.quantity}</div>
                            <div className="cart-minus-plus-squares" onClick={() => handleDecrement(item.quantity, item.name)}>-</div>
                        </div>
                        <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                    </div>
                    <div className="cart-line-container"></div>
                </div>
            ))}
            <div className="cart-order-container">
                <div>Tax 21%: {currency} {taxPrice.toFixed(2)}</div>
                <div>Quantity: <b>{cartItems.length}</b></div>
                <div>Total: <b>{currency} {totalToPay.toFixed(2)}</b></div>
                <button className="cart-order-btn">ORDER</button>
            </div>
        </div>
    )
}

export default Cart