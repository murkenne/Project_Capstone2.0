import React, { useContext } from 'react';
//import Link
import { Link } from 'react-router-dom';
// import cart context
import { CartContext } from '../contexts/CartContext';
import './CartItem.css';

const CartItem = ({item}) => {
   const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
   //destructure item

   const { id, title, image, price, amount } = item;

   return (
   <div className='sidebar-overseer'>
      <div className='sidebar-image'>
         {/* image*/}
            <Link to={`/product/${id}`}>
         <img className='cart-image' src={image} alt='' />
         </Link>
         <div className='sidebar-square'>
            {/*title & remove button/icom */ }
            <div className='boxes'>
               {/*title*/}
               <Link to={`/product/${id}`} className='item-title'>
                  {title}
            </Link>
            {/*remove button*/}
            <div className='remove-x'>
               <button onClick={()=> removeFromCart(id)}>x</button>
            </div>
            </div>
            <div className='tally-cart'>
               {/* qty */}
               <div className='reduce'>
                  {/* minus button*/}
                  <div className='reduce-button'>
                     <button onClick={()=> decreaseAmount(id)}>-</button>
                  </div>
                  {/*amount*/}
                  <div className='amount'>{amount}</div>
                  {/* plus button */}
                  <div className='add-button'>
                     <button onClick={() => increaseAmount(id)}>+</button>
                  </div>
                  </div>
               {/* item price */}
               <div className='the-price'>$ {price}</div>
               {/* final price */}
               {/* make the price at 2 decimals*/}
               <div className='side-price'>{`$ ${parseFloat(price * amount).toFixed(2)}`}</div>
            </div>
         </div>
      </div>
      </div>
   )
};

export default CartItem;