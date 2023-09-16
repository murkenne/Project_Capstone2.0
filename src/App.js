import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './components/Checkout';
import Signup from './pages/SignUp';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Search from './components/Search';
import { CartContext } from './contexts/CartContext'; // Correctly imported the context

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { clearCart, setCart } = useContext(CartContext); // Correctly destructured setCart and clearCart from the context

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    const userCart = JSON.parse(localStorage.getItem(`userCart_${userData.id}`)) || [];
    setCart(userCart); // This call to setCart should now work without errors
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    clearCart(); // Assuming this function clears the cart in your context
    setCart(JSON.parse(localStorage.getItem('guestCart')) || []); // Reset the cart to guest cart or an empty array
  };

  return (
    <div className='app'>
      <Router>
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <Search />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />  
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  )
};

export default App;


