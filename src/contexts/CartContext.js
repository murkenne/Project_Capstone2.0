import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return JSON.parse(localStorage.getItem(`userCart_${currentUser?.id}`)) || [];
  });
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      localStorage.setItem(`userCart_${currentUser.id}`, JSON.stringify(cart));
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart]);
   
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
      setCart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      increaseAmount, 
      decreaseAmount,
      itemAmount,
      total,
       }}
       >
    {children}
      </CartContext.Provider>
   )
};

export default CartProvider;