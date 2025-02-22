import { React, useEffect } from "react";
import "./Home.css";
import inditechlogo from "../../assets/Core/My Agrawal holidays logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Event_Data } from "./home-data";
import ImageSlider from "../../components/Gallery/Gallery";
import { partnerData, partnerRes, BGData, BGRes } from "./home-data";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Home | The Seagull Store";
  }, []);

  return (
    <div className="home-main">
      <div className="home-core">
        <div className="home-partners-slideshow-container">
          <h1 className="home-cards-row-title" id="happy">
            Our Gallery
          </h1>
          <ImageSlider
            data={partnerData}
            res={partnerRes}
            className="partner-carousel"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
