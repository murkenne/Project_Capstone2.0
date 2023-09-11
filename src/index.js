import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Adjust the path based on your directory structure
import App from './App.js';
import ProductProvider from './contexts/ProductContext';
import CartProvider from './contexts/CartContext';
import SidebarProvider from './contexts/SidebarContexts';
//sidebar provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <SidebarProvider>
    <CartProvider>
  <ProductProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </ProductProvider>
  </CartProvider>
  </SidebarProvider>
);

