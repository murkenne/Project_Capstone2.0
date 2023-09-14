import React from 'react';
//import react router dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './components/Checkout';  // Make sure to import the Checkout component
// import components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
//import './App.css'

const App = () => {
  return (
  <div className='app'>
    <Router>
      <Header />
      <Search />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />  // Here is your new route for the checkout page
      </Routes>
      <Sidebar />
      <Footer />
    </Router>
  </div>
  )
};

export default App;
