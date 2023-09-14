import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // Adjust the path as necessary

function Search() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // New state to store the filtered products
  const { addToCart } = useContext(CartContext);

  // Fetch categories on component mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  useEffect(() => {
    if(searchTerm.length >= 2) {
      const filteredCategories = categories.filter(category => 
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if(filteredCategories.length > 0) {
        fetch(`https://fakestoreapi.com/products/category/${filteredCategories[0]}`)
          .then(res => res.json())
          .then(json => setProducts(json));
      } else {
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  }, [searchTerm, categories]);

  useEffect(() => {
    if(searchTerm.length >= 2) {
      // Filtering products based on the search term
      setFilteredProducts(products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredProducts(products); // If the search term is too short, display all products
    }
  }, [searchTerm, products]);

  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className='search-list'>
        {filteredProducts.map(product => ( // Using filteredProducts to display the products
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} width={100} />
            <p>${product.price}</p>
            <button className='addToCartButton' onClick={() => addToCart(product, product.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
