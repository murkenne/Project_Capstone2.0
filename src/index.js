import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App.js';
import ProductProvider from './contexts/ProductContext';
import CartProvider from './contexts/CartContext';
import SidebarProvider from './contexts/SidebarContexts';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <UserProvider> {/* Wrap your App component with UserProvider */}
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </UserProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
