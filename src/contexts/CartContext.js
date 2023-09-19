import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return JSON.parse(localStorage.getItem(`userCart_${currentUser?.id}`)) || [];
    } catch (error) {
      console.error('Error parsing cart data from local storage', error);
      return [];
    }
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

  const addToCart = (product, id) => {
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
      increaseAmount(id);  // Now using the function directly instead of finding the cart item again
    } else {
      const newItem = { ...product, amount: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      const newCart = cart.map(item => item.id === id ? { ...item, amount: item.amount + 1 } : item);
      setCart(newCart);
    }
  };

  const decreaseAmount = (id) => {
    const item = cart.find(item => item.id === id);
    if (item && item.amount > 1) {
      const newCart = cart.map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item);
      setCart(newCart);
    } else if (item && item.amount === 1) {
      removeFromCart(id);
    }
  };

  return (
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
  );
};

export default CartProvider;
