import React, { useState, useEffect } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import miragelogo from "../../assets/Core/gdglogo.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { ROLES } from "../../App";
import { Menu } from "../Menu/Menu";

import sample from "../../assets/Team images/sampleimg.png";
import DarkModeToggle from "../DarkmodeToggle/DarkModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { auth } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [hasAdminRole, setHasAdminroles] = useState(false);
  const [gradient, setGradient] = useState(""); // Default background

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position relative to the div
    const y = e.clientY - rect.top; // Y position relative to the div

    // Update gradient based on cursor position
    setGradient(
      `radial-gradient(circle at ${x}px ${y}px, rgb(250, 188, 3) 5%, transparent 80%)`
    );
  };

  const handleMouseLeave = () => {
    // Reset background when cursor leaves
    setGradient("");
  };
  useEffect(() => {
    if (auth.roles !== undefined) {
      const authRoles = JSON.stringify(auth.roles);

      if (authRoles.includes("User")) {
        setHasAdminroles(true);
        console.log("has admin role");
      } else {
        setHasAdminroles(false);
        console.log("does not have admin role");
      }
    } else {
      setHasAdminroles(false);
    }
  }, [auth.roles, auth.Roles]);

  const logout = useLogout();

  const handleLogout = async (e) => {
    await logout();
  };

  return (
    <div className="navbar">
      <div
        className="navbar-core"
        // style={{
        //   background: gradient,
        // }}
        // onMouseMove={handleMouseMove}
        // onMouseLeave={handleMouseLeave}
      >
        <div className="navbar-links">
          <div className="navbar-links_container">
            <Menu className="navbar-menu-gap" />
          </div>
          <div className="navbar-links_logo">
            {/* <a href="home">
              <div className="navbar-halo-logo-container">
                <img
                  className="navbar-logo-image"
                  alt="logo"
                  src={miragelogo}
                />
              </div>
            </a> */}
            <a href="home">
              <p className="navbar-halo-text">The Seagull Store</p>
            </a>
          </div>
          <div className="navbar-icons-left">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faUser} />

            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
        <div className="navbar-actions">
          {auth.accessToken && (
            <div className={`navbar-sign ${auth.accessToken ? "" : "hidden"}`}>
              <Link to={"/home"}>
                <button
                  className="navbar-signup-text"
                  type="button"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </Link>
              <Link to={hasAdminRole ? "/dashboard" : "/profile"}>
                <div className="navbar-pfp-container">
                  <img
                    className="navbar-user-profile-logo"
                    alt="profilelogo"
                    src={auth.pfpUrl || sample}
                  />
                </div>
              </Link>
            </div>
          )}
          <div className="navbar-menu">
            {toggleMenu ? (
              <RiCloseLine
                color="#fff"
                size={27}
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <RiMenu3Line
                color="#fff"
                size={27}
                onClick={() => setToggleMenu(true)}
              />
            )}

            {toggleMenu && (
              <div className="navbar-menu_container scale-up-center">
                <div className="navbar-menu_container-links">
                  <Menu className="navbar-menubar-gap" />

                  {/* {!auth.accessToken && (
                    <div className='navbar-menu_container-link-sign'>
                      <Link to="/signin"><p className='navbar-signin-text' >Sign in</p></Link>
                      <Link to="/signup"><button className='navbar-signup-text' type='button'>Sign Up</button></Link>
                    </div>
                  )} */}

                  {auth.accessToken && (
                    <div className="navbar-menu_container-link-sign">
                      <Link to={"/home"}>
                        <button
                          className="navbar-signup-text"
                          type="button"
                          onClick={handleLogout}
                        >
                          Sign Out
                        </button>
                      </Link>
                      <Link to={hasAdminRole ? "/dashboard" : "/profile"}>
                        <div className="navbar-pfp-container">
                          <img
                            className="navbar-user-profile-logo"
                            alt="profilelogo"
                            src={auth.pfpUrl || sample}
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
