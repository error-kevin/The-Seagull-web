import React from "react";
import "./footer.css";
import { ContactMenu, EmailMenu, Menu, ServiceMenu } from "../Menu/Menu";
import mahlogo from "../../assets/Core/My Agrawal holidays logo.png";
import inditechlogo from "../../assets/Core/logo.png";
import { socialMedia, socialMediaData } from "../SocialMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-main-inner">
        <div className="footer-vertical-core">
          <div className="footer-vertical-container">
            <div className="footer-links_logo">
              <a href="home">
                <img className="footer-logo-image" alt="logo" src={mahlogo} />
              </a>
              <a href="home">
                <p className="footer-halo-text">My Agrawal Holidays</p>
              </a>
            </div>
            <div className="footer-socialedia-icon-container">
              {Object.entries(socialMedia).map(([platform, link], index) => {
                const socialMediaIcon = socialMediaData[platform];
                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon className="logos" icon={socialMediaIcon} />
                  </a>
                );
              })}
            </div>

            <div className="footer-info-container">
              <h2 className="footer-vertical-heading">Address</h2>
              <p>
                2nd Floor, Uday Chambers
                <br />
                Above SHANGRI-LA Restaurant,
                <br />
                Beside Indian Oil Petrol Pump,
                <br />
                Naggar Road,
                <br />
                Wagholi, Pune, Maharashtra
                <br />
                412207
              </p>
              <iframe
                title="maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.6915610707533!2d73.99420147591044!3d18.587939282518782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c380798ee5af%3A0xdabae6ae0a15960a!2sMY%20AGRAWAL%20HOLIDAYS%7CWagholi%20Pune%7CTravel%20agency%7CCheap%20Air%20ticket%20booking%7CFlight%20ticket%7CInternational%20Tours!5e0!3m2!1sen!2sin!4v1726652673294!5m2!1sen!2sin"
                width="100%"
                height="150"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="footer-vertical-container">
            <div className="footer-info-container">
              <h2 className="footer-vertical-heading">Services</h2>
              <ServiceMenu className="footer-service" />
            </div>
          </div>

          <div className="footer-vertical-container">
            <div className="footer-info-container">
              <h2 className="footer-vertical-heading">Quick Links</h2>
              <Menu className="footer-menu" />
            </div>
            <div className="footer-contact-container">
              <div className="footer-contact-details">
                <h2 className="footer-vertical-heading">Call Us At:</h2>
                <ContactMenu className="footer-email" />
              </div>
              <div className="footer-contact-details">
                <h2 className="footer-vertical-heading">Email Us At:</h2>
                <EmailMenu className="footer-email" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <hr className="footer-hr" />
          <div className="footer-bottom-text">
            <a href="/privacy">
              <h3 className="footer-copyright-para">
                All Rights Reserved By Thinkathon
              </h3>
            </a>
            |
            <Link to="/devs">
              <h3 className="footer-copyright-para">
                Developed By{" "}
                <img
                  className="footer-inditech-logo"
                  src={inditechlogo}
                  alt=""
                />
              </h3>
            </Link>
          </div>
          <div className="footer-signin-logo-container">
            <Link to="/signin">
              <FontAwesomeIcon
                className="logos footersignin"
                icon={faEnvelope}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
