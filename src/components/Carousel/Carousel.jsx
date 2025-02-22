import React from "react";
import "./Carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Ensure you import carousel styles

const Gallery = ({ images, responsive }) => {
  const galleryItems = images.map((image, index) => (
    <div key={index} className="carousel-card">
      <img
        className="carousel-product-image"
        src={image.default || image.imageurl}
        alt={`Gallery Pic ${index + 1}`}
      />
    </div>
  ));

  return (
    <div className="carousel-core">
      <div className="carousel-box">
        <div className="carousel-gallery-slideshow">
          <Carousel
            showDots={false}
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={5000}
            infinite={true}
          >
            {galleryItems}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
