import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';
import './Header.css';

const Header = ({ currentUser, onLogout }) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  return (
    <header className='the-head'>
      <div className='banner'>
        <Link to={'/'} className='store-brand-link'>
          <h1 className='store-brand'>The Fantastic Store</h1>
          <div className='return-home'>
            <FontAwesomeIcon icon={faHouseChimney} className='home-icon' />
          </div>
        </Link>
        {!currentUser && (
          <Link to={'/signup'} className='signup-link' style={{ margin: '0 10px' }}>
            <div className='signup-text'>Signup</div>
          </Link>
        )}
        <div onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faShoppingCart} className='my-cart' />
          <div className='item-total'>{itemAmount}</div>
        </div>
        
         {currentUser ? (
          <div className='user-info'>
            <span className='welcome-text'>Welcome, {currentUser.username}</span>
            <button onClick={onLogout} className='logout-button'>Logout</button>
          </div>
        ) : (
          <Link to="/login" className='login-link'>
            <div className='login-text'>Login</div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;