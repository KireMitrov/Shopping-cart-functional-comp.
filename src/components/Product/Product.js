import React, { useContext } from "react";
import { Navigate, useParams } from "react-router";
import { ProductsContext } from "../../context/productsContext";


function Product(){
    const {product} = useParams();
    const {data} = useContext(ProductsContext);
// console.log(data)
    const currentProduct = data.categories[0].products.find(
        (e) => e.name.toLowerCase() === product.toLowerCase()
      );
    const description = `${currentProduct.description}`
      console.log(currentProduct)
    return (
        <div className="product-container">
            <div className="product">
                <img src={currentProduct.gallery[0]}></img>
            </div>
            <div className="product-description">
                <div className="product-brand">{currentProduct.brand}</div>
                <p className="product-title">{currentProduct.name}</p>
                <div>
                    {currentProduct.attributes.map((attribute) => {
                        if (attribute.type === 'text')
                        return <div>
                            <p className="product-description-price">{attribute.name}:</p>
                            <div className="attributes-container">
                                {attribute.items.map((value)=>(
                                    <div className="attributes-rectangle">{value.value}</div>
                                    ))}
                            </div>
                         </div> 
                         return <div>
                             <p className="product-description-price">{attribute.name}:</p>
                            <div className="attributes-container">
                                {attribute.items.map((value)=>(
                                    <div className="attributes-rectangle-color" style={{backgroundColor: `${value.value}`}}></div>
                                    ))}
                            </div>

                         </div>
                    }
                    )}
                </div>
                <p className="product-description-price">PRICE:</p>

                <button>ADD TO CART</button>
                <div dangerouslySetInnerHTML={{__html: description}}/>
            </div>
        </div>
        
    )
}

export default Product