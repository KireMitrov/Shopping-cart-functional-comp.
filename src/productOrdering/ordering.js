export default {
    addProductToCart(id, quantity, selectedPizzaSize, cartItems, Products) {

        const productToAdd = Products.find((item) => item.id === id);
        console.log(productToAdd, Products);
        const addedProduct = cartItems.find((item) => item.id === id && pizza.selectedPizzaSize === selectedPizzaSize);
        let productCartItems;

        if (addedProduct) {
            addedProduct.quantity = addedProduct.quantity + quantity;
            productCartItems = [
                ...cartItems,
            ];
        } else {
            productCartItems = [
                ...cartItems,
                {
                    ...productToAdd,
                    quantity: quantity
                }
            ];
        }
        return productCartItems;
    },
    removePizzaFromCart(id, selectedPizzaSize, cartItems) {
        const leftOverItems = cartItems.filter((pizza) => !(pizza.id === id && pizza.selectedPizzaSize === selectedPizzaSize));
        return leftOverItems;
    },
};