import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Search.css'

function Search() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

 
  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then(res => res.json())
        .then(json => setProducts(json));
    }
  }, [selectedCategory]);

  return (
    <div className="Search">
      <input
        className="search-input"
        type="text"
        placeholder="Search for products..."
        onChange={(e) => setFilteredProducts(products.filter(product =>
          product.title.toLowerCase().includes(e.target.value.toLowerCase())
        ))}
      />

      <div className="category-bar">
        <h3>Categories:</h3>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item" onClick={() => setSelectedCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>

      <ul className="search-list">
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} width={100} />
            <p>${product.price}</p>
            <button className="addToCartButton" onClick={() => addToCart(product, product.id)}>Add to Cart</button>
          </li>
        )) : products.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} width={100} />
            <p>${product.price}</p>
            <button className="addToCartButton" onClick={() => addToCart(product, product.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
