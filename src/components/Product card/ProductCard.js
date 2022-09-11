import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ProductsContext } from "../../context/productsContext";


function ProductCard({ name, img }) {

    const [isHovered, setIsHovered] = useState(false);
    const { currency, addToCart } = useContext(ProductsContext);


    return (
        <div className="product-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={name}>
                <img src={img} className="product-card-img"></img>
                <div className="content">
                    {name}
                </div>
                <div className="product-price">
                    {currency} 50.00
                </div>
            </Link>
            {isHovered ? <img src={'Circle Icon.svg'} className="cart-icon-small" onClick={() => addToCart(name)}></img> : null}
        </div>
    )
}

export default ProductCard