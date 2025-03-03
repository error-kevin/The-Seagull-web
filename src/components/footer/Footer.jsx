import React, { useState } from "react";
import "./footer.css";
import { Menu } from "../Menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import inditech from "../../assets/Core/logo2.png";
import { Social } from "../Social/Social";
import axios from "../../api/axios";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Please fill in both fields!");
      return;
    }
    try {
      const response = await axios.post(
        "/enquiry",
        JSON.stringify({ name, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(`Name: ${name}, Email: ${email}`);
      alert(
        `Thank you ${name} for connecting with us! \n Our Team will soon connect with you on ${email}`
      );
      setName("");
      setEmail("");
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else {
        console.log("Registration Failed");
      }
      alert(`Please Enter Details Again`);
    }
  };
  return (
    <div className="footer-main">
      <div className="footer-header-container">
        <hr className="footer-hr" />
        {/* <h1 className="footer-head-large">Where Curiosity Meets Code.</h1> */}
        <hr className="footer-hr" />
        {/* <p className='footer-para'>Take action today and join us for an event experience like no other.</p> */}
      </div>

      <div className="footer-main-container">
        {/* <div className="footer-map-parent">
          <iframe
            title="gps"
            className="footer-map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14709.599252507514!2d75.849627!3d22.824693!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963039c587a8091%3A0x206d00d7a5e4afb3!2sShri%20Vaishnav%20Vidyapeeth%20Vishwavidyalaya%20(SVVV)!5e0!3m2!1sen!2sin!4v1730027960090!5m2!1sen!2sin&zoom=16"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}
        <div className="footer-core-container">
          <h2>Quick Links</h2>
          <div className="footer-navbar">
            <Menu className="footer-menu-gap" />
          </div>
        </div>
        <div className="footer-last-container">
          <div className="footer-enquiry-container">
            <h2 className="footer-vertical-heading">Connect with Us</h2>
            <div className="footer-enquiry-input-container">
              <label class="label">
                <input
                  type="text"
                  class="input"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Your Name"
                  aria-label="Your Name"
                  autocomplete="off"
                />
              </label>
              <label class="label">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  class="input"
                  placeholder="Enter Email ID"
                  aria-label="Your Email"
                  autocomplete="off"
                />
              </label>
            </div>
            <button className="styled-button" onClick={handleSubmit}>
              Submit
              <div className="inner-button">
                <svg
                  id="Arrow"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  width="30px"
                  className="icon"
                >
                  <defs>
                    <linearGradient
                      y2="100%"
                      x2="100%"
                      y1="0%"
                      x1="0%"
                      id="iconGradient"
                    >
                      <stop
                        style={{ stopColor: "#FFFFFF", stopOpacity: 1 }}
                        offset="0%"
                      />
                      <stop
                        style={{ stopColor: "#AAAAAA", stopOpacity: 1 }}
                        offset="100%"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#iconGradient)"
                    d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
                  />
                </svg>
              </div>
            </button>
          </div>
          <Social className="footer" />
        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-bottom-text">
          <a href="/privacy">
            <h3 className="footer-copyright-para">
              All Rights Reserved By The Seagull Store
            </h3>
          </a>
          |
            <h3 className="footer-copyright-para">
              Developed By
              <>
              <a href="https://github.com/error-kevin" target="_blank" rel="noreferrer">Kevin &</a>
              <a href="https://www.inditech.in" target="_blank" rel="noreferrer">
              <img className="footer-inditech-logo" src={inditech} alt="" />
              </a>
              </>
            </h3>
            
        </div>
      </div>
    </div>
  );
};

export default Footer;
