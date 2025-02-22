import React from 'react';
import './Gallery.css';
import Carousel from "react-multi-carousel";
import { productData, responsive } from "./gallery-data";



const About = () => {
  
  const images = productData.map((item) => (
    <div className="gallery-card">
      <img className="gallery-product-image" src={item.imageurl} alt="" />
    </div>
  ));
  
  return (
    <div className='gallery-main'>
      <div className='gallery-header-container'>
      </div>

      <div className='gallery-core'>
        <div className='gallery-box'>
          <div className="gallery-gallery-slideshow">
            <div className="gallery-Carousel">
              <Carousel showDots={false} responsive={responsive} autoPlay={true} autoPlaySpeed={5000} infinite={true}>
                {images}
              </Carousel>
            </div>
          </div>
        </div>
        
        
        

      </div>

    </div>
  )
}

export default About





