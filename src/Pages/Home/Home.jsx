import { React, useEffect, useState, useRef } from "react";
import "./Home.css";
import Gallery from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/BGs/1375761.jpg";
import { clothingProducts } from "./home-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../../assets/Gallery/", false, /\.(png|jpe?g|JPG|webp)$/)
  );

  const productData = images.map((image, index) => ({
    id: index + 1,
    imageurl: image,
  }));

  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="home-main">
      <Gallery
        images={productData}
        responsive={responsive2}
        className={"home-main-bg-carousel"}
      />
      <div className="home-core">
        <h1>Summer Collection</h1>
        <div className="home-products-row-container">
          {clothingProducts.map((product, index) => (
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
};

export default Home;
