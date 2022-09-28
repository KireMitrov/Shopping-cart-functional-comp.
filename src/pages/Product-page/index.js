import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { ProductsContext } from "../../context/productsContext";


function ProductPage() {

    const { product } = useParams();
    const { productsData, currency, addToCart } = useContext(ProductsContext);
    const currentProduct = productsData.categories[0].products.find((e) => e.name.toLowerCase() === product.toLowerCase());
    let attributesArray = currentProduct.attributes.map((item) => ({ name: item.name, defaultValue: item.items[0].value }));
    const [productWithAtt, setProductWithAtt] = useState({ ...currentProduct, addedAttributes: attributesArray });
    const [imageUrl, setImageUrl] = useState(currentProduct.gallery[0]);
    let currencyObj = currentProduct.prices.find((i) => i.currency.symbol === currency)

    function changeAtt(value, attribute) {
        let attributeToChange = productWithAtt.addedAttributes.findIndex((att) => att.name === attribute);
        productWithAtt.addedAttributes[attributeToChange]["defaultValue"] = value;
        setProductWithAtt({ ...productWithAtt });
    }

    function changeProductUrl(e) {
        setImageUrl(e.target.src)
    }


    return (
        <div className="product-container">
            <div className="product">
                <img src={imageUrl} alt={currentProduct.name}></img>
            </div>
            <div className="product-description">
                <div className="product-brand">{currentProduct.brand}</div>
                <p className="product-title">{currentProduct.name}</p>
                <div>
                    {currentProduct.attributes.map((attribute, index) => {
                        if (attribute.type === 'text')
                            return <div key={index}>
                                <p className="attributes-text">{attribute.name}:</p>
                                <div className="attributes-container">
                                    {attribute.items.map((value) => (
                                        <div className={`attributes-rectangle ${productWithAtt.addedAttributes[index].defaultValue === value.value ? "atributes-selected" : ""}`}
                                            key={value.value}
                                            onClick={() => changeAtt(value.value, attribute.name)}>{value.value}</div>
                                    ))}
                                </div>
                            </div>
                        return <div key={index}>
                            <p className="attributes-text">{attribute.name}:</p>
                            <div className="attributes-container">
                                {attribute.items.map((value) => (
                                    <div className={`attributes-rectangle-color ${productWithAtt.addedAttributes[index].defaultValue === value.value ? "cart-attributes-color-selected" : ""}`}
                                        style={{ backgroundColor: `${value.value}` }}
                                        key={value.value}
                                        onClick={() => changeAtt(value.value, attribute.name)}></div>
                                ))}
                            </div>
                        </div>
                    }
                    )}
                </div>
                <div>
                    <div className="attributes-text">PRICE:</div>
                    <div className="product-description-price">{currency} {currencyObj.amount.toFixed(2)}</div>
                </div>
                <button onClick={() => addToCart(currentProduct.name, productWithAtt)}>ADD TO CART</button>
                <div className="product-description-text" dangerouslySetInnerHTML={{ __html: currentProduct.description }} />
            </div>
            <div className="product-images">
                {currentProduct.gallery.map((url, index) => (
                    <img src={url} onClick={changeProductUrl} key={index} alt={url}></img>
                ))}
            </div>
        </div>
    )
}

export default ProductPage