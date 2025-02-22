import React from "react";
import "./Gallery.css";
import Carousel from "react-multi-carousel";

const Gallery = (productData) => {
  console.log(productData);

  const images = productData.data.map((item) => (
    <div
      className={`${
        productData.className
          ? productData.className +
            "-gallery-card-container gallery-card-container"
          : "gallery-card-container"
      }`}
    >
      <a href={item.url} target="_blank" rel="noreferrer">
        <div
          className={`${
            productData.className
              ? productData.className + "-gallery-card gallery-card"
              : "gallery-card"
          }`}
        >
          <img
            className={`${
              productData.className
                ? productData.className +
                  "-gallery-product-image gallery-product-image"
                : "gallery-product-image"
            }`}
            src={item.imageurl}
            alt={item.alt || "Product Image"}
          />
        </div>
      </a>
    </div>
  ));

  return (
    <div
      className={`${
        productData.className
          ? productData.className + "-gallery-core gallery-core"
          : "gallery-core"
      }`}
    >
      <div
        className={`${
          productData.className
            ? productData.className + "-gallery-Carousel gallery-Carousel"
            : "gallery-Carousel"
        }`}
      >
        <Carousel
          showDots={false}
          arrows={false}
          responsive={productData.res}
          autoPlay={true}
          autoPlaySpeed={productData.autoPlayspeed ?productData.autoPlayspeed : 5000}
          infinite={true}
        >
          {images}
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
