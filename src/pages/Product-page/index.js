import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { ProductsContext } from "../../context/productsContext";


function ProductPage() {

    const { product } = useParams();
    const { data } = useContext(ProductsContext);
    const currentProduct = data.categories[0].products.find(
        (e) => e.name.toLowerCase() === product.toLowerCase()
    );
    const [imageUrl, setImageUrl] = useState(currentProduct.gallery[0]);

    function changeProductUrl(e) {
        setImageUrl(e.target.src)
    }

    function addToCart(product){
        console.log('the product is', product)
    }

    console.log(currentProduct)


    return (
        <div className="product-container">
            <div className="product">
                <img src={imageUrl}></img>
            </div>
            <div className="product-description">
                <div className="product-brand">{currentProduct.brand}</div>
                <p className="product-title">{currentProduct.name}</p>
                <div>
                    {currentProduct.attributes.map((attribute) => {
                        if (attribute.type === 'text')
                            return <div>
                                <p className="attributes">{attribute.name}:</p>
                                <div className="attributes-container">
                                    {attribute.items.map((value) => (
                                        <div className="attributes-rectangle">{value.value}</div>
                                    ))}
                                </div>
                            </div>
                        return <div>
                            <p className="attributes">{attribute.name}:</p>
                            <div className="attributes-container">
                                {attribute.items.map((value) => (
                                    <div className="attributes-rectangle-color" style={{ backgroundColor: `${value.value}` }}></div>
                                ))}
                            </div>

                        </div>
                    }
                    )}
                </div>
                <p className="product-description-price">PRICE:</p>
                <button onClick={()=>addToCart(product)}>ADD TO CART</button>
                <div  className="product-description-text" dangerouslySetInnerHTML={{ __html: currentProduct.description }} />
            </div>
            <div className="product-images">
                {currentProduct.gallery.map((url) => (
                    <img src={url} onClick={changeProductUrl}></img>
                ))}
            </div>
        </div>

    )
}

export default ProductPage