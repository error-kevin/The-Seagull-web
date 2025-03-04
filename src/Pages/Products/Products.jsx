// Members.js

import React, { useEffect } from 'react';
import './Products.css';
import { clothingProducts } from './productData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";


const Products = ({ cardqty = clothingProducts.length, }) => {
    useEffect(() => {
        document.title = 'Our Products | The Seagull Store';
    }, []);
    console.log(cardqty)
    return (
        <div className='products-main'>
            <div className="home-core">
                <h1>Our Collection</h1>
                <div className="home-products-row-container">
                    {clothingProducts.slice(0, cardqty)
                        .map((product, index) => (

                            <div className="home-product-card" key={index}>
                                <img src={product.img} className="product-card-img" alt="" />
                                <div className="product-card-details">
                                    <p>{product.name}</p>
                                    <p className="product-card-price-text">
                                        <p style={{ textDecoration: "line-through", color: "gray" }}>
                                            ₹{product.mrp}
                                        </p>
                                        <p>₹{product.currentPrice}</p>
                                        <p>
                                            Sale:{" "}
                                            {Math.round(
                                                ((product.mrp - product.currentPrice) / product.mrp) * 100
                                            )}
                                            % OFF
                                        </p>
                                    </p>

                                    <p>{product.inStock ? "Available" : "Out of Stock"}</p>
                                    <div className="product-size-container">
                                        Sizes:
                                        {product.size.map((size, index) => (
                                            <p>{size}</p>
                                        ))}
                                    </div>
                                    <div className="product-size-container">
                                        Colors:
                                        {product.color.map((color, index) => (
                                            <div
                                                key={index}
                                                className="product-color-icon"
                                                style={{ backgroundColor: color }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="product-size-container">
                                        Rating:
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FontAwesomeIcon key={index} icon={faStar} />
                                        ))}
                                        {product.rating % 1 !== 0 && (
                                            <FontAwesomeIcon icon={faStarHalfAlt} />
                                        )}
                                    </div>
                                </div>
                                <div className="product-card-sale">
                                    <p>
                                        Sale:{" "}
                                        {Math.round(
                                            ((product.mrp - product.currentPrice) / product.mrp) * 100
                                        )}
                                        % OFF
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Products;





