import React, { useContext } from 'react';

import { SidebarContext } from '../contexts/SidebarContexts';
import { CartContext } from '../contexts/CartContext';

const  Header = () => {
     const {isOpen, setIsOpen } = useContext(SidebarContext);
     const { itemAmount} = useContext(CartContext)
   return (

      <header className='the-head' >
   <Link to={'/'}>
      <div>
         
      </div>
   </Link>
      {/*cart*/}
   <div onClick={()=> setIsOpen(!isOpen)}><button className='open-close'>open/close sidebar</button>
   <div className='item-total'>{itemAmount}</div>
   </div>;
   </header>
   )
};

export default Header;