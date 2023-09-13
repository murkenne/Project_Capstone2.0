import React, { useContext, useState, useEffect } from 'react';
//import Link
import { Link } from 'react-router-dom';
//import components
import CartItem from './CartItem';
import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';


const Sidebar = () => {
   const { isOpen, handleClose } = useContext(SidebarContext);
   const { cart, clearCart } = useContext(CartContext);

   return (
   <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
    <div className='flex'>
      <div className='shopping-bag'>Shopping Bag(0)</div>
      {/* close sidebar*/}
      <div onClick={handleClose} className='close-sidebar'>
         close
      </div>
    </div>
    <div>
      {cart.map((item) => {
      return <CartItem item={item} key={item.id} />;
    })}
    </div>
    <div className='total-container'>
      <div className='total-box'>
        {/* total*/}
        <div className='total-bottom'><span className='spun'>Total:</span>$ 1000
        </div>
        {/* clear cart icon */}
        <div className='clear-cart'><button onClick={clearCart}>clear cart</button></div>
      </div>
    </div>
      </div>
   )
};

export default Sidebar;