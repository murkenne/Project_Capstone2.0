import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
     const {isOpen, setIsOpen } = useContext(SidebarContext);
     const { itemAmount} = useContext(CartContext);
   
   return (
      <header className='the-head'>
         <h1 className='store-brand'>The Fantastic Store</h1>
         <div className='banner'>
         <Link to={'/'}>
            <div>
             where my profile icon will go 
            </div>
         </Link>
         {/* Adding a link to the Signup page */}
         <Link to={'/signup'} style={{ margin: '0 10px' }}>
            <div>
             Signup
            </div>
         </Link>
         {/*cart*/}
         <div onClick={()=> setIsOpen(!isOpen)}>
             <FontAwesomeIcon icon={faShoppingCart} className='my-cart' />
            <div className='item-total'>{itemAmount}
            </div>
            </div>
         </div>
      </header>
   )
};

export default Header;
