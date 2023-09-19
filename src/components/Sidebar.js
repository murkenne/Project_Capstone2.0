import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';  // Don't forget to import UserContext here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext); // Retrieve the isLoggedIn state from UserContext

  const handleCheckout = () => {
    if (isLoggedIn) {
      window.location.href = '/checkout';  // Navigate to checkout if logged in
    } else {
      alert('Must login as user to complete purchase');  // Show alert if not logged in
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className='flex'>
        <div className='shopping-bag'>Shopping Bag({itemAmount})</div>
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
          <div className='total-bottom'><span className='spun'>Total:</span>$ {total}</div>
          <div className='clear-cart'>
            <button onClick={clearCart}>
              <FontAwesomeIcon icon={faTrash} className='trashcan' />
            </button>
          </div>
        </div>
        <Link to='/' className='cart-view'>View cart</Link>
        <button onClick={handleCheckout} className='checkout'>Checkout</button> {/* Update the link to a button and add onClick handler */}
      </div>
    </div>
  );
};

export default Sidebar;
