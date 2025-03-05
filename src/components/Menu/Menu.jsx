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
        <p className="menu-about-text menu-txt">About Us</p>
      </Link>
    </div>
  );
};
