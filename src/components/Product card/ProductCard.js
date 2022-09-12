import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ProductsContext } from "../../context/productsContext";


function ProductCard({ name, img, price, inStock }) {

    const [isHovered, setIsHovered] = useState(false);
    const { currency, addToCart } = useContext(ProductsContext);


    return (
        <div className="product-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={inStock ? name : ''} >
                {inStock ? null : <div className="out-of-stock-text">OUT OF STOCK</div>}
                <img src={img} className={`product-card-img ${inStock ? '' : 'img-out-of-stock'}`} ></img>
                <div className="content">
                    {name}
                </div>
                <div className="product-price">
                    {currency} {price}
                </div>
            </Link>
            {isHovered && inStock ? <img src={'Circle Icon.svg'} className="cart-icon-small" onClick={() => addToCart(name)}></img> : null}
        </div>
    )
}

export default ProductCard