import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { SidebarContext } from '../contexts/SidebarContexts'; // Import SidebarContext
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { handleClose } = useContext(SidebarContext); // Get the handleClose function
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Close the sidebar
    handleClose();

    // Here you would handle the checkout process, perhaps sending the cart data to a server
    // After successfully handling the checkout, clear the cart
    clearCart();
    alert('Thank you for your purchase!');
  };

  return (
    <div className='checkout-page'>
      <h1>Checkout</h1>
      <div className='checkout-details'>
        <form>
          <div className='form-group'>
            <label>Name:</label>
            <input type='text' name='name' required />
          </div>
          <div className='form-group'>
            <label>Email:</label>
            <input type='email' name='email' required />
          </div>
          <div className='form-group'>
            <label>Address:</label>
            <input type='text' name='address' required />
          </div>
          {/* Add additional form groups as needed for other information */}
        </form>
      </div>
      <div className='checkout-summary'>
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id}>
            <span>{item.title} - ${item.price}</span>
          </div>
        ))}
        <h2>Total: ${total}</h2>
      </div>
      <div className='checkout-actions'>
        <button onClick={handleCheckout}>Complete Checkout</button>
        <Link to='/' className='continue-shopping'>Continue Shopping</Link>
        <button onClick={() => navigate(-1)} className='return-button'>Return</button>
      </div>
    </div>
  );
};

export default Checkout;
