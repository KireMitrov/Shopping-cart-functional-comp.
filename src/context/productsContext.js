import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";


const PRODUCTS_QUERY = gql`
{
    categories{
      name
      products{
        name
        inStock
        gallery
        description
        brand
        attributes{
          name
          type
          items{
            value
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {

  const { data, loading, error } = useQuery(PRODUCTS_QUERY);
  const [CartIsOpen, setCartIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("all");
  const [cartItems, setCartItems] = useState([]);

  function addToCart(name) {
    let itemToAdd = data.categories[0].products.find((item) => item.name.toLowerCase() === name.toLowerCase()
        );
    cartItems.push(itemToAdd);
    console.log(cartItems)
}
  
  
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  
  console.log(data.categories[0].name);

  const value = { data, CartIsOpen, setCartIsOpen, categoryName, setCategoryName, addToCart, cartItems }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export { ProductsContext, ProductsProvider }