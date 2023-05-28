import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ProductsContext } from "../../context/productsContext";
import circledIcon from "../assets/images/Circle Icon.svg"


function ProductCard({ name, img, price, inStock, product }) {

    const [isHovered, setIsHovered] = useState(false);
    const { currency, addToCart, quantity } = useContext(ProductsContext);
    let attributesArray = product.attributes.map((item) => ({ name: item.name, defaultValue: item.items[0].value }));



    return (
        <div className={`product-card ${product.inStock ? '' : 'img-out-of-stock'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={product.name} >
                {product.inStock ? null : <div className="out-of-stock-text">OUT OF STOCK</div>}
                <img src={product.gallery[0]} className="product-card-img" ></img>
                <div className="content">
                    {product.name}
                </div>
                <div className="product-price">
                    {currency} {price.toFixed(2)}
                </div>
            </Link>
            {isHovered && product.inStock ? <img src={circledIcon} className="cart-icon-small" onClick={() => addToCart({ ...product, addedAttributes: attributesArray, quantity: 1 })}></img> : null}
        </div>
    )
}

export default ProductCard