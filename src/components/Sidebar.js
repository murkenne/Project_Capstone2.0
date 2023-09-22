import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
    const { isOpen, handleClose } = useContext(SidebarContext);
    const { cart, clearCart, total, itemAmount } = useContext(CartContext);
    const { isLoggedIn } = useContext(UserContext); 
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (isLoggedIn) {
            navigate('/checkout');
        } else {
            alert('You must be logged in to proceed to checkout.');
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
                    <div className='total-bottom'><span className='spun'>Total:</span>$ {parseFloat(total).toFixed(2)}</div>
                    <div className='clear-cart'>
                        <button onClick={clearCart}>
                            <FontAwesomeIcon icon={faTrash} className='trashcan' />
                        </button>
                    </div>
                </div>
                <Link to='/' className='cart-view'>View cart</Link>
                
                <button 
                   onClick={handleCheckout} 
                   className={`checkout ${!isLoggedIn ? 'disabled' : ''}`} 
                   disabled={!isLoggedIn}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
