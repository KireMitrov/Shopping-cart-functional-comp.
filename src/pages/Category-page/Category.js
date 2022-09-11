import React, { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";
import ProductCard from "../../components/Product card/ProductCard";


function Category() {

    const { productsData, CartIsOpen, categoryName } = useContext(ProductsContext);

    const category = productsData.categories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase());


    return (
        <div style={{ backgroundColor: !CartIsOpen ? "white" : "rgba(57, 55, 72, 0.22)" }}>
            <div className="title-position" >
                <h1 className="title">{categoryName}</h1>
            </div>
            <div className="products">
                {category.products.map((product) => (
                    <div className="product-card" key={product.name}>
                        <ProductCard name={product.name} img={product.gallery[0]}></ProductCard>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Category