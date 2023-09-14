import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import cart context
import { CartContext } from '../contexts/CartContext';

const Product = ({product}) => {
    const { addToCart } = useContext(CartContext);
  //destructure product
    const { id, image, category, title, price } = product;
   return (
     <div className='row-align'>
    <div className='picture'>
        <div className='picture-container'>
            {/* image*/}
            <div className='crop-picture'>
               <img className='burp' src={image} alt='' />
            </div>
        </div>
        {/* button*/}
        <div className='add-cart'>
            <button onClick={() => addToCart(product, id) } className='plus-btn'>+</button>
            <Link to={`/product/${id}`} className="details">?</Link>
            </div>
        </div>
        {/* category & title & price*/}
    <div>
        <div className='category'>{category}</div>
        <Link to={`/product/${id}`}><h2 className='title'>{title}</h2></Link>
    
        <div className='price'>$ {price}</div>
    </div>
   </div>
   )
};

export default Product;