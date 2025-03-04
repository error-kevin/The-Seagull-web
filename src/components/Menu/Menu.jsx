import { Link } from "react-router-dom";
import React from "react";
import "./Menu.css";

export const Menu = ({ className }) => {
  return (
    <div className={`menu-main ${className}`}>
      <Link to="/home">
        <p className="menu-home-text menu-txt">Home</p>
      </Link>
      <Link to="/products">
        <p className="menu-about-text menu-txt">Products</p>
      </Link>
      <Link to="/about">
        <p className="menu-about-text menu-txt">Men</p>
      </Link>
      <Link to="/events">
        <p className="menu-events-text menu-txt">Women</p>
      </Link>

      {/* <Link to="/members">
        <p className="menu-members-text menu-txt">Our Team</p>
      </Link> */}
      {/* <Link to="/gallery">
        <p className="menu-members-text menu-txt">Gallery</p>
      </Link> */}
      {/* <Link to="/sponsors">
        <p className="menu-events-text menu-txt">Our Partners</p>
      </Link> */}
      {/* <Link to="/HonouraryGuidance"> */}
      {/* <p className="menu-events-text menu-txt">Our Leadership</p> */}
      {/* </Link> */}
    </div>
  );
};
