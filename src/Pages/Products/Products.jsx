// Members.js

import React,{useEffect} from 'react';
import './Products.css';
import { productData } from './productData';
import sample from "../../assets/Team images/sampleimg.png"


const Members = () => {
    useEffect(() => {
        document.title = 'Our Products | TheSeagullStore';
    }, []);

    return (
        <div className='products-main'>
            <div className='products-core'>
                <div className='products-heading'>
                    <h1 className='products-heading-text'>Our Products</h1>
                </div>
                <div className='products-cards-row'>
                    {productData.slice(0).map((product, index) => (
                        <div className='products-card'>
                            <img className='products-img' src={product.imageUrl || sample} alt="" />
                            <div className='products-card-text'>
                                <p className="product-name">{product.name}</p>
                                <p className="product-desc">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Members;





