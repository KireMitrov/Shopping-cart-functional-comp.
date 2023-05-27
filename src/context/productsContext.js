import React, { createContext, useState } from "react";
import { productsData, currencyData } from "../fakeData/fakeData"



// const PRODUCTS_QUERY = gql`
// {
//     categories{
//       name
//       products{
//         name
//         inStock
//         gallery
//         description
//         brand
//         attributes{
//           name
//           type
//           items{
//             value
//           }
//         }
//         prices{
//           currency{
//             label
//             symbol
//           }
//           amount
//         }
//       }
//     }
//   }
// `;

// const CURRENCY_QUERY = gql`
// {
//     currencies{
//       symbol
//       label
//     }
//   }
// `;


const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {

  // const { data: productsData, loading, error } = useQuery(PRODUCTS_QUERY);
  // const { data: currencyData, loading: currencyLoading, error: currencyError } = useQuery(CURRENCY_QUERY);
  const [CartIsOpen, setCartIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState('$');
  let currencyObj = cartItems.map((item) => item.prices.find((i) => i.currency.symbol === currency));
  const [totalItems, setTotalItems] = useState(0)



  // Adding- removing product from cart

  function addToCart(name, productWithAtt) {
    let itemToAdd = productsData.categories[0].products.find((item) => item.name.toLowerCase() === name.toLowerCase());
    let addedItem = cartItems.find((item) => item.name === itemToAdd.name);
    let attributesArray = itemToAdd.attributes.map((item) => ({ name: item.name, defaultValue: item.items[0].value }))

    if (addedItem && productWithAtt) {
      let existingItem = cartItems.some((item) => JSON.stringify(item.addedAttributes) === JSON.stringify(productWithAtt.addedAttributes) );
  
      if (existingItem) {
        setCartItems([...cartItems])
        return;
      } else {
        setCartItems([...cartItems, { ...productWithAtt, quantity: 1 }]);
        setTotalItems(totalItems + 1);
        return;
      } 
    }

    if (productWithAtt){
      const existingProductWithAtt = cartItems.find((item) => item.name === productWithAtt.name && JSON.stringify(item.addedAttributes) === JSON.stringify(productWithAtt.addedAttributes));
      if (existingProductWithAtt){
        setCartItems([...cartItems]);
        return;
      } else {

        setCartItems([...cartItems, {...productWithAtt, quantity: 1}])
        setTotalItems(totalItems + 1);
        return;
      }
    }

    if (addedItem) {
      setCartItems([...cartItems])
      return;

    } else {
      setCartItems([...cartItems, { ...itemToAdd, quantity: 1, addedAttributes: attributesArray }]);
      setTotalItems(totalItems + 1)
    }
  }

  function removeFromCart({ name, quantity, addedAttributes }) {
    const leftOverItems = cartItems.filter((item) => !(name === item.name && quantity === item.quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(addedAttributes)));
    setCartItems(leftOverItems);
    setTotalItems(totalItems - quantity)
  }

  // Handling increment-decrement of quantity

  function handleIncrement({name, quantity, addedAttributes}) {
    let changedQuantityItem = cartItems.find((item) => item.name === name && item.quantity === quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(addedAttributes));

    if (changedQuantityItem) {
      changedQuantityItem.quantity += 1;
      setCartItems([...cartItems]);
      setTotalItems(totalItems + 1)
    }
  }

  function handleDecrement({name, quantity, addedAttributes}) {
    let changedQuantityItem = cartItems.find((item) => item.name === name && item.quantity === quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(addedAttributes));

    if (changedQuantityItem && changedQuantityItem.quantity > 1) {
      changedQuantityItem.quantity -= 1;
      setCartItems([...cartItems]);
      setTotalItems(totalItems - 1)
    }
  }

  // Handling attribute change

  function handleTextAttributeChange(value, name, attribute) {
    let changedItem = cartItems.find((item) => item.name === name);
    if (changedItem) {
      let attributeToChange = changedItem.addedAttributes.findIndex((att) => att.name === attribute);
      changedItem.addedAttributes[attributeToChange]["defaultValue"] = value;
      setCartItems([...cartItems]);
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

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>
  // if (currencyLoading) return "Loading...";
  // if (currencyError) return <pre>{currencyError.message}</pre>

  // if(productsData){
  //   localStorage.setItem('productsDa', currencyData)
  // }
  


  const value = {currency, currencyObj, setCurrency, CartIsOpen, setCartIsOpen, categoryName, setCategoryName, addToCart, cartItems, totalPrice, handleDecrement, handleIncrement, removeFromCart, handleTextAttributeChange, totalItems }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export { ProductsContext, ProductsProvider }