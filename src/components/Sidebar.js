import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
   const { isOpen, handleClose } = useContext(SidebarContext);
   const { cart, clearCart, total, itemAmount } = useContext(CartContext);

   return (
     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        
      <div className='flex'>
        <div className='shopping-bag'>Shopping Bag({itemAmount})</div>
        {/* close sidebar*/}
        <div onClick={handleClose} className='close-sidebar'>
           close
        </div>
      </div>
      <div className='cart-spectrum'>
        {cart.map((item) => {
        return <CartItem item={item} key={item.id} />;
      })}
      </div>
      <div className='total-container'>
        <div className='total-box'>
          {/* total*/}
          <div className='total-bottom'><span className='spun'>Total:</span>$ {total}
          </div>
          {/* clear cart icon */}
          <div className='clear-cart'>
            <button onClick={clearCart}>
              <FontAwesomeIcon icon={faTrash} className='trashcan' />
            </button>
          </div>
        </div>
        <Link to='/' className='cart-view'>View cart</Link>
        <Link to='/' className='checkout'>Checkout</Link>
      </div>
        </div>
   );
};

export default Sidebar;
