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
                <div>
                    <div>{item.brand}</div>
                    <div>{item.name}</div>
                    <div>$50.00</div>
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
                    <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                        <div className="cart-line"></div>
                    </div>
                </div>
            ))}
            <div>Quantity: {cartItems.length}</div>
            <div>Total: $300.00</div>
            <button>ORDER</button>
        </div>
    )
}

export default Cart