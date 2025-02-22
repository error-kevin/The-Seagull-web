import React from "react";
import "./timer.css";
import Countdown from "react-countdown";

import { useNavigate } from "react-router-dom";

export const Timer = ({ className, targetDate, endDate, link }) => {
  const navigate = useNavigate();
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const wrapCharacters = (text, allZero = false) => {
      if (text.length < 2) return text;
      const firstChar = `<span class="first-char ${
        allZero ? "all-zero" : ""
      }">${text[0]}</span>`;
      const secondChar = `<span class="${allZero ? "all-zero" : ""}">${
        text[1]
      }</span>`;
      return firstChar + secondChar;
    };

    const isAllZero = (unit) => unit === "00";

    if (completed) {
      return (
        <div className="home-button-container">
          <button
            className="home-cssbuttons-io-button"
            onClick={() => {
              navigate(link);
            }}
          >
            Join Now
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
      );
    } else {
      return (
        <>
          <div className={`${className}`}>
            <p className="time-announce-text">Goes Live in!</p>
            <div className={`${className}-container`}>
              {days !== 0 && (
                <>
                  <div className={`${className}-main-count-heading`}>
                    <div
                      className={`${className}-count-heading`}
                      dangerouslySetInnerHTML={{
                        __html: wrapCharacters(
                          days.toString().padStart(2, "0"),
                          isAllZero(days.toString().padStart(2, "0"))
                        ),
                      }}
                    ></div>
                  </div>
                  :
                </>
              )}
              <div className={`${className}-main-count-heading`}>
                <div
                  className={`${className}-count-heading`}
                  dangerouslySetInnerHTML={{
                    __html: wrapCharacters(
                      hours.toString().padStart(2, "0"),
                      isAllZero(hours.toString().padStart(2, "0"))
                    ),
                  }}
                ></div>
              </div>
              :
              <div className={`${className}-main-count-heading`}>
                <div
                  className={`${className}-count-heading`}
                  dangerouslySetInnerHTML={{
                    __html: wrapCharacters(
                      minutes.toString().padStart(2, "0"),
                      isAllZero(minutes.toString().padStart(2, "0"))
                    ),
                  }}
                ></div>
              </div>
              :
              <div className={`${className}-main-count-heading`}>
                <div
                  className={`${className}-count-heading`}
                  dangerouslySetInnerHTML={{
                    __html: wrapCharacters(
                      seconds.toString().padStart(2, "0"),
                      isAllZero(seconds.toString().padStart(2, "0"))
                    ),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};
