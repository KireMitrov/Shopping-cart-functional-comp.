import React, { useContext } from "react"
import { ProductsContext } from "../../context/productsContext";

function Header(){

    const {data} = useContext(ProductsContext);
    
    return (
        <div className="header">
            <img className="logo" src="a-logo.svg" alt="logo"></img>
            <div className="navigation">
                {data.categories.map((category)=>(
                    <div className="navigation-element">
                        <p className="label">{category.name}</p>
                    </div>
                ))}
                {/* <div className="navigation-element-women">
                    <p className="label">ALL</p>
                </div>
                <div className="navigation-element-men">
                    <p className="label">TECH</p>
                </div>
                <div className="navigation-element-kids">
                    <p className="label">CLOTHES</p>
                </div> */}
                
            </div>
            <div className="actions">
                <div className="currency">
                    <div className="currency-sign">
                        $
                    </div>
                            <img src="Vector.svg" alt=""/>
                </div>
                <img className="cart-icon" src="Empty Cart.svg" alt="empty-cart"  />
            </div>
        </div>
    )
}

export default Header