import { React, useEffect, useState, useRef } from "react";
import "./Home.css";
import { Carousel } from "../../components";
import { useNavigate } from "react-router-dom";
import { Products } from "../"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";


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
      breakpoint: { max: 4000, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },

  };

  return (
    <div className="home-main">
      <Carousel
        images={productData}
        responsive={responsive2}
        className={"home-main-bg-carousel"}
      />
      {/* <video className="home-main-bg-carousel" src="" /> */}
      <div className="home-core">
        <button className="home-exp-btn">Explore More <FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>
        <Products cardqty={4} />
      </div>
    </div>
  );
};

export default Home;
