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
        <Link to={'/'}>
          <h1 className='store-brand'>The Fantastic Store</h1>
          <div className='return-home'>
            <FontAwesomeIcon icon={faHouseChimney} className='home-icon' />
          </div>
        </Link>
        <Link to={'/signup'} style={{ margin: '0 10px' }}>
          <div>Signup</div>
        </Link>
        <div onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faShoppingCart} className='my-cart' />
          <div className='item-total'>{itemAmount}</div>
        </div>
        
        {currentUser ? (
          <div className='user-info'>
            <span>Welcome, {currentUser.username}</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
