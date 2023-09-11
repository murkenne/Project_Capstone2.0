import React, { useContext } from "react";
import './Home.css';
import { ProductContext } from "../contexts/ProductContext";
import Product from '../components/Product';

const Home = () => {
    const { products } = useContext(ProductContext);

    return (
        <div>
            <section className="home-section">
                <div className="home-container">
                    <div className="home-sqaure">
                        {products.map(product => (
                            <Product product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
