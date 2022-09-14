import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ProductsContext } from "../../context/productsContext";


function ProductCard({ name, img, price, inStock }) {

    const [isHovered, setIsHovered] = useState(false);
    const { currency, addToCart, quantity } = useContext(ProductsContext);
    


    return (
        <div className={`product-card ${inStock ? '' : 'img-out-of-stock'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={inStock ? name : ''} >
                {inStock ? null : <div className="out-of-stock-text">OUT OF STOCK</div>}
                <img src={img} className="product-card-img" ></img>
                <div className="content">
                    {name}
                </div>
                <div className="product-price">
                    {currency} {price.toFixed(2)}
                </div>
            </Link>
            {isHovered && inStock ? <img src={'Circle Icon.svg'} className="cart-icon-small" onClick={() => addToCart(name, quantity)}></img> : null}
        </div>
    )
}

export default ProductCard