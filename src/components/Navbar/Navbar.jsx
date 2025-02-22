import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import miragelogo from "../../assets/Core/My Agrawal holidays logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { Menu } from "../Menu/Menu";

const Navbar = () => {
  const { auth } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  const logout = useLogout();
  const handleLogout = async (e) => {
    await logout();
  };

  return (
    <div className={`navbar`}>
      <div className="navbar-core">
        <div className="navbar-links">
          <div className="navbar-links_logo">
            <a href="home">
              <img className="navbar-logo-image" alt="logo" src={miragelogo} />
            </a>
            <a href="home">
              <p className="navbar-halo-text">My Agrawal Holidays</p>
            </a>
          </div>
          <div className="navbar-links_container">
            <Menu className="navbar-menu"/>
            <div className={`navbar-sign`}>
              <Link to="/contact">
                <button className="navbar-signup-text" type="button">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-actions">
          {/* <div className={`navbar-sign`}>
          <Link to="/signup"><button className='navbar-signup-text' type='button'>Contact Us</button></Link>
        </div> */}
          <div className={`navbar-sign ${auth.accessToken ? "" : "hidden"}`}>
            <Link to={"/"}>
              <button
                className="navbar-signup-text"
                type="button"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </Link>
          </div>
          <div className="navbar-menus">
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
                  <Menu />
                  {!auth.accessToken && (
                    <div className="navbar-menu_container-link-sign">
                      {/* <Link to="/signin"><p className='navbar-signin-text' >Sign in</p></Link> */}
                      <Link to="/signup">
                        <button className="navbar-signup-text" type="button">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                  )}

                  {/* If the user is signed in, show the Sign Out button and user profile logo in the mobile menu */}
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
