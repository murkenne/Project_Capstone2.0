import React, { useState } from 'react';
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

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
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
