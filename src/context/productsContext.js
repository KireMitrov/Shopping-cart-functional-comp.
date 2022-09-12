import React, { createContext, useState } from "react";
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
const CURRENCY_QUERY = gql`
{
    currencies{
      symbol
      label
    }
  }
`;


const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  
  const { data:productsData, loading, error } = useQuery(PRODUCTS_QUERY);
  const { data: currencyData, loading: currencyLoading, error:currencyError } = useQuery(CURRENCY_QUERY);
  const [CartIsOpen, setCartIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState('$')


  function addToCart(name) {
    let itemToAdd = productsData.categories[0].products.find((item) => item.name.toLowerCase() === name.toLowerCase()
        );
    setCartItems([...cartItems, itemToAdd])
    console.log(cartItems)
}
console.log(productsData)
  
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  if (currencyLoading) return "Loading...";
  if (currencyError) return <pre>{currencyError.message}</pre>
  
  

  const value = { productsData, currencyData, currency, setCurrency, CartIsOpen, setCartIsOpen, categoryName, setCategoryName, addToCart, cartItems }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export { ProductsContext, ProductsProvider }