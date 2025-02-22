import React from "react";
import "./Sign-in.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
// import { getRolesFromToken } from '../../hooks/authUtils';

const LOGIN_URL = "/auth";

const Signin = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    if (errMsg) {
      errRef.current.className = "errmsg"; // Set the className name to "errmsg"

      const timer = setTimeout(() => {
        errRef.current.className = "offscreen";
        setErrMsg("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errMsg]);

  useEffect(() => {
    localStorage.setItem("persist", persist);
    console.log(persist);
  }, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //logging in user with credentials
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response.data);
      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      console.log(accessToken);

      //fetching user data
      const responsedata = await axios.get(`/users/${email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(responsedata);
      const Username = responsedata?.data?.username;
      const Firstname = responsedata?.data?.firstname;
      const Lastname = responsedata?.data?.lastname;
      const MobileNumber = responsedata?.data?.mobilenumber;
      const WhatsMobileNumber = responsedata?.data?.whatsmobilenumber;
      const StdCode = responsedata?.data?.stdcode;
      const pfp = responsedata?.data?.pfp;
      const roles = responsedata?.data?.roles;

      setAuth({
        email: email,
        accessToken: accessToken,
        roles: roles,
        username: Username,
        firstname: Firstname,
        lastname: Lastname,
        mobileNumber: MobileNumber,
        whatsmobilenumber: WhatsMobileNumber,
        stdcode: StdCode,
        pfpUrl: pfp,
      });

      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        if (err.response.data && err.response.data.message) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("Email & Password Cannot be Blank");
        }
      } else if (err.response?.status === 401) {
        if (err.response.data && err.response.data.message) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("UnAuthorised");
        }
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  return (
    <div className="signin-main">
      <div className="signin-main-core">
        <div className="signin-container signin-b-container" id="b-container">
          <form
            className="signin-form"
            id="b-form"
            method=""
            action=""
            onSubmit={handleSubmit}
          >
            <h2 className="signin-form_title signin-title">Sign in</h2>

            <input
              className="signin-form__input"
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
            />

            <input
              className="signin-form__input signin-password"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              placeholder="Password"
              required
            />

            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="signin-form-checkbox-core">
              <div className="signin-form-checkbox-container">
                <div className="cntr">
                  <input
                    type="checkbox"
                    id="persist"
                    className="hidden-xs-up"
                    onChange={togglePersist}
                    checked={persist}
                  />
                  <label htmlFor="persist" className="persist"></label>
                </div>
                <p className="signin-form-checkbox-text">Trust This Device</p>
              </div>
              {/* <div className='signin-form-checkbox-container'>  
                <div className="cntr2">
                  <input type="checkbox" id="cbx2" className="hidden-xs-up" />
                  <label htmlFor="cbx2" className="cbx2"></label>
                </div>
                <p className='signin-form-checkbox-text'>Remember Me</p>
              </div> */}
            </div>
            <button className="cssbuttons-io-button">
              {" "}
              SIGN IN
              <div className="icon">
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

            <p
              onClick={() => {
                navigate("/forgotpass");
              }}
              className="signin-form__link"
            >
              Forgot your password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
