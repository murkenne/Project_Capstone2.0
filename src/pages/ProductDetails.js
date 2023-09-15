import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import './ProductDetails.css'

const ProductDetails = () => {
    // get the product id from the url
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    // get the single product based on the id
    const product = products.find((item) => {
        return item.id === parseInt(id);
    });

    // if product is not found
    if (!product) {
        return (
            <section className="loading">Loading...</section>
        )
    }

    // destructure product
    const { title, price, description, image } = product;
    return <section className="screen">
        <div className="imagine">
            {/* image & text wrapper*/}
            <div className="f-wrapper">
                {/*image*/}
                <div className="g-wrapper">
                    <img className="description-info" src={image} alt='' />
                </div>
                {/*text*/}
                <div className="text-wrapper">
                    <h1 className="f-title">{title}</h1>
                    <div className="p-price">$ {price}</div>
                </div>
                <p className="d-info">{description}</p>
                <button onClick={() => addToCart(product, product.id)} className="a-button">
                    Add to Cart
                </button>
            </div>
        </div>
    </section>;
};

export default ProductDetails;
