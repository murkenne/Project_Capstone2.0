import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext()

const CartProvider = ({children}) => {
  // cart state 
   const [cart, setCart] = useState([]);
   // item amount state
   const [itemAmount, setItemAmount] = useState(0);

   //add to cart

 const addToCart = (product, id) => {
  const newItem = { ...product, amount: 1 };
  const cartItem = cart.find(item => item.id === id);

  if (cartItem) {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, amount: cartItem.amount + 1 }; // Increasing the amount instead of setting it to 1.
      } else {
        return item;
      }
    });
    setCart(newCart);
  } else {
    setCart([...cart, newItem]);
  }
};

   // remove from cart
   const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
   };
   
   // clear cart
   const clearCart = () => {
    setCart([]);
   } 

   // increase amount
   const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
   };

 // decrease amount
 
 const decreaseAmount = (id) => {
  const item = cart.find(item => item.id === id);
  if (item && item.amount > 1) {
    const newCart = cart.map(item => 
      item.id === id ? { ...item, amount: item.amount - 1 } : item
    );
    setCart(newCart);
  } else if (item && item.amount === 1) {
    removeFromCart(id);
  }
};


   return(
     <CartContext.Provider 
     value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      increaseAmount, 
      decreaseAmount,
      itemAmount,
       }}
       >
    {children}
      </CartContext.Provider>
   )
};

export default CartProvider;