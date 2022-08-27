import React from "react";
import { Link } from 'react-router-dom';


function ProductCard({ name, img }) {
    
    return (
        <Link to={name}>
            <div className="product-card">
                <img src={img} ></img>
                <div className="content">
                    {name}
                </div>
                <div className="product-price">
                    $50.00
                </div>
            </div>
        </Link>
    )
}

export default ProductCard