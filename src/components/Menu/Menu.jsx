import { Link } from "react-router-dom";
import React from "react";
import "./Menu.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Menu = ({ className }) => {
  return (
    <div className={`${className}-menu-main`}>
      <Link to="/home">
        <p className="menu-home-text menu-txt">Home</p>
      </Link>
      <Link to="/home">
        <p className="menu-members-text menu-txt">About Us</p>
      </Link>
      <Link to="/home">
        <p className="menu-events-text menu-txt">Our Services</p>
      </Link>

      <Link to="/home">
        <p className="menu-members-text menu-txt">Gallery</p>
      </Link>
    </div>
  );
};

export const ServiceMenu = ({ className }) => {
  return (
    <div className={`${className}-menu-main`}>
      <Link to="/home">
        <p className="menu-home-text menu-txt">Homess</p>
      </Link>
      <Link to="/events">
        <p className="menu-events-text menu-txt">Events</p>
      </Link>
      <a href="https://dpsindore.org/">
        <p className="menu-about-text menu-txt">DPS</p>
      </a>
      <Link to="/members">
        <p className="menu-members-text menu-txt">Our Team</p>
      </Link>
      <Link to="/gallery">
        <p className="menu-members-text menu-txt">Gallery</p>
      </Link>
    </div>
  );
};

export const ContactMenu = ({ className }) => {
  return (
    <div className={`${className}-menu-main`}>
      <a href="tel:+91-8866462800">
        <p className="menu-home-text menu-txt">
          <FontAwesomeIcon className="logos" icon={faPhone} />
          +91-8866462800
        </p>
      </a>
      <a href="tel:+91-9099011502">
        <p className="menu-events-text menu-txt">
          <FontAwesomeIcon className="logos" icon={faPhone} />
          +91-9099011502
        </p>
      </a>
      <a href="tel:+91-8866675363">
        <p className="menu-about-text menu-txt">
          <FontAwesomeIcon className="logos" icon={faPhone} />
          +91-8866675363
        </p>
      </a>
    </div>
  );
};

export const EmailMenu = ({ className }) => {
  return (
    <div className={`${className}-menu-main`}>
      <a href="mailto:tours.agrawalholidays@gmail.com">
        <p>
          <FontAwesomeIcon className="logos" icon={faEnvelope} />
          tours.agrawalholidays@gmail.com
        </p>
      </a>
      <a href="mailto:tours.agrawalholidays@yahoo.com">
        <p>
          <FontAwesomeIcon className="logos" icon={faEnvelope} />
          tours.agrawalholidays@yahoo.com
        </p>
      </a>
    </div>
  );
};
