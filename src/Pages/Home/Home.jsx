import { React, useEffect } from "react";
import "./Home.css";
import inditechlogo from "../../assets/Core/My Agrawal holidays logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Event_Data } from "./home-data";
import ImageSlider from "../Gallery/Gallery";
import { partnerData, partnerRes, BGData, BGRes } from "./home-data";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Home | My Agrawal Holidays";
  }, []);

  return (
    <div className="home-main">
      <div className="home-core">
        <div className="home-core-container">
          <ImageSlider data={BGData} res={BGRes} className="bg-carousel" />
        </div>
        <div className="bg-landing overlay home-hero-container">
          <div className="home-hero">
            <div className="home-hero-container">
              <img className="home-hero-logo" src={inditechlogo} alt="" />
            </div>
            <div className="home-hero-text-container">
              <h1 className="home-hero-text">Welcome To My Agrawal Holidays</h1>
            </div>
          </div>
          <div className="home-bottom-container">
            <button
              className="home-cssbuttons-io-button "
              onClick={() => {
                navigate("/about");
              }}
            >
              Lets Explore!
              <div className="home-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="home-cards-row-container">
        <h1 className="home-cards-row-title" id="title">
          Why Us?
        </h1>
        <div className="home-cards-row">
          {Event_Data.map((card, index) => (
            <div className="home-vertical-card">
              <div className="home-vertical-card-bottom">
                <p className="home-vertical-card-icon" alt="">
                  {card.icon}
                </p>
                <h1 className="home-vertical-name-text">{card.name}</h1>

                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
  );
};

export default Home;
