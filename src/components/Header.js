import React, { useContext } from 'react';

import { SidebarContext } from '../contexts/SidebarContexts';

const  Header = () => {
     const {isOpen, setIsOpen } = useContext(SidebarContext);

   return (
    

      <header className='the-head' >
   <div>Header</div>;
   <div onClick={()=> setIsOpen(!isOpen)}><button className='open-close'>open/close sidebar</button></div>;
   </header>
   )
};

export default Header;