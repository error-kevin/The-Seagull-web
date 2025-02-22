import React from "react";
import { about_data } from "./about_data.js";
import "./About2.css";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const Privacy = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="about-home-main">
      <div className="about-home-core">
        {about_data.map((data, index) => (
          <div className="about-home-box">
            {/* <img className='about-box-img' src={data.icon} alt=''/> */}
            <Lottie
              className="about-box-lottie"
              options={{
                ...defaultOptions,
                animationData: data.icon,
              }}
              title="lottie"
              height={400}
              width={index !== 0 ? 400 : 600}
            />

            <span className="about-home-text-box">
              <h1>{data.heading}</h1>
              <br />
              <p>
                {data.desc.split("\n").map((line, index, array) => (
                  <React.Fragment key={index}>
                    {line
                      .split(/(\*\*.*?\*\*)/g)
                      .map((part, idx) =>
                        part.startsWith("*") && part.endsWith("*") ? (
                          <strong key={idx}>{part.slice(2, -2)}</strong>
                        ) : (
                          part
                        )
                      )}
                    {index < array.length - 1 && <br />}{" "}
                    {/* Add <br /> only between lines */}
                  </React.Fragment>
                ))}
              </p>

              <br />

              {data.btntxt && data.btn && (
                <Link to={data.btn}>
                  <button className="about-home-button">
                    <span>{data.btntxt}</span>
                  </button>
                </Link>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
