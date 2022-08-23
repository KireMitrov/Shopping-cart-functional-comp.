import React from "react";

function ProductCard({name, img}){
    return (
        <div className="product-card">
            <img src={img} ></img>
            <div className="content">
                {name}
            </div>
            <div className="product-price">
                $50.00
            </div>
        </div>
    )
}

export default ProductCard