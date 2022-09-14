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

  const { data: productsData, loading, error } = useQuery(PRODUCTS_QUERY);
  const { data: currencyData, loading: currencyLoading, error: currencyError } = useQuery(CURRENCY_QUERY);
  const [CartIsOpen, setCartIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState('$');
  let currencyObj = cartItems.map((item) => item.prices.find((i) => i.currency.symbol === currency));



  // Adding product to cart

  function addToCart(name ) {
    let itemToAdd = productsData.categories[0].products.find((item) => item.name.toLowerCase() === name.toLowerCase());
    let addedItem = cartItems.find((item) => item.name === itemToAdd.name);
    if (addedItem) {
      setCartItems([...cartItems])
    } else {
      setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }])
    }
    console.log(cartItems)
  }

  console.log(productsData)

  // Handling increment-decrement of quantity

  function handleIncrement(quantity, name) {
    let changedQuantityItem = cartItems.find((item) => item.name === name && item.quantity === quantity);
    let newCartItems = cartItems.filter((item) => item.name !== changedQuantityItem.name);

    if (changedQuantityItem) {
      setCartItems([...newCartItems, {
        ...changedQuantityItem,
        quantity: quantity += 1
      }])
    }
  }

  function handleDecrement(quantity, name) {
    let changedQuantityItem = cartItems.find((item) => item.name === name && item.quantity === quantity);
    let newCartItems = cartItems.filter((item) => item.name !== changedQuantityItem.name);

    if (changedQuantityItem && changedQuantityItem.quantity > 1) {
      setCartItems([...newCartItems, {
        ...changedQuantityItem,
        quantity: quantity -= 1
      }])
    } else {
      return;
    }
  }

  // Calculating total amount to pay

  let totalPrice = calculateTotal();

  function calculateTotal() {
    let price = 0;
        cartItems.forEach((item, index) => {
            price += item.quantity * currencyObj[index].amount
        })
    return price.toFixed(2);
  }

  // Handling error in fetching

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  if (currencyLoading) return "Loading...";
  if (currencyError) return <pre>{currencyError.message}</pre>



  const value = { productsData, currencyData, currency, currencyObj, setCurrency, CartIsOpen, setCartIsOpen, categoryName, setCategoryName, addToCart, cartItems, totalPrice, handleDecrement, handleIncrement }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export { ProductsContext, ProductsProvider }