import { Link } from "react-router-dom";
import React from "react";
import "./Social.css";
import {
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Social = ({ className }) => {
  return (
    <div className={`${className}-Socialicons `}>
      <a
        href="https://www.instagram.com/gdgocsvvv/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className={`${className}-logos`} icon={faInstagram} />{" "}
      </a>
      {/* <a href="https://www.youtube.com/@halolegion">
        <FontAwesomeIcon
          className={`${className}-logos`}
          icon={faYoutube}
        />{" "}
      </a> */}
      {/* <a href='https://twitter.com/Mirage_CGCJ'><FontAwesomeIcon className= "logos footerlogo" icon={faTwitter} /> </a> */}
      <a
        href="https://www.linkedin.com/company/dsc-svvv/posts/?feedView=all"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className={`${className}-logos`} icon={faLinkedinIn} />{" "}
      </a>
      <a href="mailto:gdscsvvv@gmail.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon className={`${className}-logos`} icon={faEnvelope} />{" "}
      </a>
    </div>
  );
};
