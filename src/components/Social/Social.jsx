import { Link } from "react-router-dom";
import React from "react";
import "./Social.css";
import {
  faInstagram,
  faYoutube,
  faFacebook,
  faTwitter,
  faXTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Social = ({ className }) => {
  return (
    <div className={`${className}-Socialicons `}>
      <a
        href="https://www.instagram.com/theseagullstore/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className={`${className}-logos`} icon={faInstagram} />{" "}
      </a>
      { <a href="https://www.facebook.com/people/The-Seagull-Store/61570249948748/">
        <FontAwesomeIcon
          className={`${className}-logos`}
          icon={faFacebook}
        />{" "}
      </a> }
      { <a href='https://x.com/theseagullstore'><FontAwesomeIcon className= "logos footerlogo" icon={faXTwitter} /> </a> }
      { <a
        href="https://in.pinterest.com/theseagullstore"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className={`${className}-logos`} icon={faPinterest} />{" "}
      </a> }
      <a href="mailto:theseagullstore@gmail.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon className={`${className}-logos`} icon={faEnvelope} />{" "}
      </a>
    </div>
  );
};
