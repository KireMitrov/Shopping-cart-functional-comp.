import React, { useContext } from "react";
import ProductCard from "../../components/Product card/ProductCard";
import { ProductsContext } from "../../context/productsContext";


function Clothes() {

    const { data, CartIsOpen } = useContext(ProductsContext);

    console.log(data);
    return (
        <div style={{ backgroundColor: !CartIsOpen ? "white" : "rgba(57, 55, 72, 0.22)" }}>
            <div className="title-position">
                <h1 className="title">{data.categories[1].name}</h1>

            </div>
            <div className="products">
                {data.categories[1].products.map((product) => (
                    <div className="product-card">
                        <ProductCard name={product.name} img={product.gallery[0]}></ProductCard>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default Clothes