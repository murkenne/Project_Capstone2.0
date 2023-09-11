import React, { useContext, useState, useEffect } from 'react';
//import Link
import { Link } from 'react-router-dom';


//import components
import CartItem from './CartItem';
import { SidebarContext } from '../contexts/SidebarContexts';

const Sidebar = () => {
   const { isOpen, handleClose } = useContext(SidebarContext);
   return <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
    <div className='flex'>
      <div className='shopping-bag'>Shopping Bag(0)</div>
      {/* close sidebar*/}
      <div onClick={handleClose} className='close-sidebar'>
         close
      </div>
    </div>
      </div>;

};

export default Sidebar;