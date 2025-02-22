import { React, useEffect, useState, useRef } from "react";
import "./Home.css";
import Gallery from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/BGs/1191971 (1).jpg";
import bg2 from "../../assets/BGs/BG Plain.png";

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
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
      <div className="home-core">
        <Gallery images={productData} responsive={responsive2} />
        <Gallery images={productData} responsive={responsive} />
      </div>
    </div>
  );
};

export default Home;
