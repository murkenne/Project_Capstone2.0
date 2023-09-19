import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { SidebarContext } from '../contexts/SidebarContexts';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { handleClose } = useContext(SidebarContext);
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState([]);
  
  const handleCheckout = () => {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const address = document.querySelector('input[name="address"]').value;

    let errors = [];
    if (!name) errors.push("Name is required.");
    if (!email) errors.push("Email is required.");
    if (!address) errors.push("Address is required.");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Close the sidebar
    handleClose();

    // Here you would handle the checkout process
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
            <input type='text' name='name' />
          </div>
          <div className='form-group'>
            <label>Email:</label>
            <input type='email' name='email' />
          </div>
          <div className='form-group'>
            <label>Address:</label>
            <input type='text' name='address' />
          </div>
          {/* Add additional form groups as needed for other information */}
        </form>
        {formErrors && formErrors.map((error, index) => <div key={index} style={{ color: 'red' }}>{error}</div>)}
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

