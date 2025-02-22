import React from 'react';
import './Sign-in.css';
import discordlogo from '../../assets/icons8/icons8-discord.svg'
import youtubelogo from '../../assets/icons8/icons8-youtube.svg'
import githublogo from '../../assets/icons8/icons8-github.svg'
import twitterlogo from '../../assets/icons8/icons8-twitter.svg'
import instagramlogo from '../../assets/icons8/icons8-instagram.svg'
import { useNavigate ,useLocation} from 'react-router-dom';
import { useRef,useState,useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { getRolesFromToken } from '../../hooks/authUtils';

const LOGIN_URL = '/auth';


const Signin = () => {
  
  const {setAuth,persist,setPersist} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();
  const [email,setEmail] = useState('');
  const [pwd,setPwd] = useState('');
  const [errMsg,setErrMsg] = useState('');
  
  

  useEffect(()=> {
    userRef.current.focus();
  },[])
  
  useEffect(()=> {
    setErrMsg('');
  },[email,pwd])


  useEffect(() => {
    if (errMsg) {
      errRef.current.className = "errmsg"; // Set the className name to "errmsg"
      
      const timer = setTimeout(() => {
        errRef.current.className = "offscreen"; 
        setErrMsg('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errMsg]);
  
  
  useEffect(()=> {
    localStorage.setItem("persist",persist)
  },[persist])
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      //logging in user with credentials
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({email,pwd}),
        {
          headers:{'Content-Type':'application/json'},
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = getRolesFromToken(accessToken);
      
      
      //fetching user data
      const responsedata = await axios.get(`/users/${email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const Username = responsedata?.data?.username;
      const Firstname = responsedata?.data?.firstname;
      const Lastname = responsedata?.data?.lastname;
      const MobileNumber = responsedata?.data?.mobilenumber;
      const AltMobileNumber = responsedata?.data?.altmobilenumber;
      const WhatsMobileNumber = responsedata?.data?.whatsmobilenumber;
      const SchoolName = responsedata?.data?.schoolname;
      const UserClass = responsedata?.data?.className;
      const StdCode = responsedata?.data?.stdcode;
      
      setAuth({Username,email,roles,accessToken,Firstname,Lastname,MobileNumber,AltMobileNumber,WhatsMobileNumber,SchoolName,UserClass,StdCode});
      
      setEmail('');
      setPwd('');
      // navigate(from,{replace:true})
      navigate("/home");
      

    }

    catch(err){

      if(!err?.response) {
        setErrMsg('No Server Response')

      }else if (err.response?.status===400){
        if (err.response.data && err.response.data.message){
          setErrMsg(err.response.data.message);
        }else{
          setErrMsg('Email & Password Cannot be Blank')
        }
      }else if (err.response?.status===401){
        if (err.response.data && err.response.data.message){
          setErrMsg(err.response.data.message);
        }else{
          setErrMsg('UnAuthorised')
        }
      }else{
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
      
    }
    
    

  }

  const togglePersist = () => {
    setPersist(prev => !prev);
  }


  
  
  return (
    
    
    <div className='signin-main'>
      <div className="signin-main-core">
        <div className="signin-container signin-b-container" id="b-container">
          <form className="signin-form" id="b-form" method="" action="" onSubmit={handleSubmit}>
            <h2 className="signin-form_title signin-title">Sign in to Website</h2>
            
            
            
            <span className="signin-form__span1">Our Socials</span>

            <div className="signin-form__icons">
              <a href='https://discord.com'><img className="signin-form__icon" src={discordlogo} alt=""/></a>
              <a href='https://discord.com'><img className="signin-form__icon" src={youtubelogo} alt=""/></a>
              <a href='https://discord.com'><img className="signin-form__icon" src={githublogo} alt=""/></a>
              <a href='https://discord.com'><img className="signin-form__icon" src={twitterlogo} alt=""/></a>
              <a href='https://discord.com'><img className="signin-form__icon" src={instagramlogo} alt=""/></a>

            </div>
            
            <span className="signin-form__span">Sign in with email</span>


            <input 
            className="signin-form__input" 
            type="text" 
            id="email"
            ref = {userRef}
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
            
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className='signin-form-checkbox-core'>
              <div className='signin-form-checkbox-container'>  
                <div className="cntr">
                  <input type="checkbox" id="persist" className="hidden-xs-up" onChange={togglePersist} checked={persist} />
                  <label htmlFor="persist" className="persist"></label>
                </div>
                <p className='signin-form-checkbox-text'>Trust This Device</p>
              </div>
              <div className='signin-form-checkbox-container'>  
                <div className="cntr2">
                  <input type="checkbox" id="cbx2" className="hidden-xs-up" />
                  <label htmlFor="cbx2" className="cbx2"></label>
                </div>
                <p className='signin-form-checkbox-text'>Remember Me</p>
              </div>
            </div>
            <button className="cssbuttons-io-button"> SIGN IN
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
              </div>
            </button>
            
            <p onClick={() => { navigate("/forgotpass"); }} className="signin-form__link">Forgot your password?</p>

            

          </form>
        </div>
        <div className="signin-switch" id="switch-cnt">


          <div className="signin-switch__container " id="switch-c2">
            <h2 className="signin-switch__title signin-title">Hello Friend !</h2>
            <p className="signin-switch__description signin-description">Enter your personal details and start journey with us</p>
            <button className="signin-switch__button signin-button signin-switch-btn" onClick={() => { navigate("/signup"); }}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  )
    
}

export default Signin




























