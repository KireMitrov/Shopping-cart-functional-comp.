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

const ProductsProvider = ({children}) => {
    // const [products, setProducts] = useState([]);
    const [CartIsOpen, setCartIsOpen] = useState(false);

    const { data, loading, error } = useQuery(PRODUCTS_QUERY);
    
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    // useEffect(function(){
    //     setProducts(data);
    // },[])
    // console.log(products)
    const value = {data, CartIsOpen, setCartIsOpen}
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export {ProductsContext, ProductsProvider}