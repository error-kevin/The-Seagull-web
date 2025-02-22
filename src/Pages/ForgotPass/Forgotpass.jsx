import React from 'react';
import './Forgotpass.css';
import { useRef,useState,useEffect } from 'react';
import axios from '../../api/axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


const EMAIL_REGEX = /^[A-z][A-z0-9-_](?=.*[@]).{2,32}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


//const FORGOT_PASS_URL = '/auth/forgotpass';



const Forgotpass = () => {
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [cpwd, setCPwd] = useState('');
    const [validCPwd, setValidCPwd] = useState(false);
    const [cpwdFocus, setCPwdFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpFocus, setOtpFocus] = useState([false, false, false, false]);
    const [combinedOtp, setCombinedOtp] = useState("");
    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        
    }, [pwd])


    useEffect(() => {
        setValidCPwd(PWD_REGEX.test(cpwd));
        
    }, [cpwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd,cpwd])

    const [Screen1, setScreen1] = useState(true);
    const [Screen2, setScreen2] = useState(false);
    const [Screen3, setScreen3] = useState(false);
    const [Screen4, setScreen4] = useState(false);
    
    const next1 = () => {
    setScreen1(false)
    setScreen2(true)
    setScreen3(false)
    setScreen4(false)
    };
    const next2 = () => {
    setScreen1(false)
    setScreen2(false)
    setScreen3(true)
    setScreen4(false)
    };
    const next3 = () => {
        setScreen1(false)
        setScreen2(false)
        setScreen3(false)
        setScreen4(true)
    };
//     const back3 = () => {
//         setScreen1(false)
//         setScreen2(false)
//         setScreen3(true)
//         setScreen4(false)
//     };
//     const back2 = () => {
//     setScreen1(false)
//     setScreen2(true)
//     setScreen3(false)
//     setScreen4(false)
//     };
//     const back1 = () => {
//     setScreen1(true)
//     setScreen2(false)
//     setScreen3(false)
//     setScreen4(false)
// };
    


    const handleOtpChange = (index, e) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
    
        if (e.target.value === "") {
            if (index > 0) {
                // Move focus to the previous input
                const prevIndex = index - 1;
                document.getElementById(`forgotpass-form-otp-input-${prevIndex}`).focus();
            }
        } else if (e.target.value.length === 1 && index < 3) {
            // Move focus to the next input
            const nextIndex = index + 1;
            document.getElementById(`forgotpass-form-otp-input-${nextIndex}`).focus();
        }
    
        setOtp(newOtp);
    
        // Combine the OTP digits and update the combinedOtp state
        const newCombinedOtp = newOtp.join("");
        setCombinedOtp(newCombinedOtp);
    };
    
    
    


    const handleotp = async () => {
        try{
            const response = await axios.get(`/auth/otp/${email}`);
            console.log(response);
            next1()
        }
        catch(err){

        if(!err?.response) {
            setErrMsg('No Server Response')
    
        }else if (err.response?.status===400){
            if (err.response.data && err.response.data.message){
            setErrMsg(err.response.data.message);
            }else{
            setErrMsg('Email Cannot be Blank')
            }
        }else if (err.response?.status===401){
            if (err.response.data && err.response.data.message){
            setErrMsg(err.response.data.message);
            }else{
            setErrMsg('UnAuthorised')
            }
        }else{
            setErrMsg('Failed')
        }
        errRef.current.focus();
        
        }
    }


    const sendotp = async () => {
        try{
            const response = await axios.get(`/auth/otp/verify/${combinedOtp}`);
            console.log(response);
            next2()
        }
        catch(err){

        if(!err?.response) {
            setErrMsg('No Server Response')
    
        }else if (err.response?.status===400){
            if (err.response.data && err.response.data.message){
            setErrMsg(err.response.data.message);
            }else{
            setErrMsg('Email Cannot be Blank')
            }
        }else if (err.response?.status===401){
            if (err.response.data && err.response.data.message){
            setErrMsg(err.response.data.message);
            }else{
            setErrMsg('UnAuthorised')
            }
        }else{
            setErrMsg('Failed')
        }
        errRef.current.focus();
        
        }
    }

    const handlepassword = async (e) => {
        e.preventDefault();
        
        
        try {
            //logging in user with credentials
            
            const response = await axios.post("/auth/changepwd",
                JSON.stringify({email,pwd}),
                {
                headers:{'Content-Type':'application/json'},
                withCredentials: true
                }
            );
            console.log(response);
            next3()
        
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


    return (
    <div className='forgotpass-success-main'>
        {Screen1 && (
            <div className="forgotpass-success-main-core">
                <div className="forgotpass-success-switch" id="switch-cnt">
                    <div className="forgotpass-success-switch__circle"></div>
                    <div className="forgotpass-success-switch__circle forgotpass-success-switch__circle--t"></div>
                    
                    <div className="forgotpass-form" id="a-form" >
                        <h2 className="forgotpass-form_title forgotpass-title">Forgot Password?</h2>
                        <span className="forgotpass-form__span1">Our Socials</span>
                        
                        <span className="forgotpass-form__span">Enter your email</span>
                        <span>
                            <input className="forgotpass-form__input" type="text" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} required aria-invalid={validEmail ? "false" : "true"} aria-describedby="emailnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}/>
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </span>
                        <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <button className="forgotpass-form__button forgotpass-button forgotpass-submit" onClick={handleotp} disabled ={!validEmail ? true : false}>NEXT</button>
                    </div>
                </div>
            </div>
            )}
        {Screen2 && (
        <div className="forgotpass-success-main-core">
            <div className="forgotpass-success-switch" id="switch-cnt">
                <div className="forgotpass-success-switch__circle"></div>
                <div className="forgotpass-success-switch__circle forgotpass-success-switch__circle--t"></div>
                
                
                <div className='forgotpass-success-otp-page'>

                    <h2 className="forgotpass-form_title forgotpass-title">Forgot Password?</h2>
                    <span className="forgotpass-form__span1">Our Socials</span>
                    
                    
                    <span className="forgotpass-form__span">Enter your OTP</span>
                    <span>
                    <div className="forgotpass-form-otp-input-container">
                        {otp.map((digit, index) => (
                            <input
                            key={index}
                            id={`forgotpass-form-otp-input-${index}`}
                            className={`forgotpass-form-otp-input ${otpFocus[index] ? "focused" : ""}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e)}
                            onFocus={() => setOtpFocus(index, true)}
                            onBlur={() => setOtpFocus(index, false)}
                            />
                        ))}
                        
                    </div>

                    </span>
                    <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4-digit OTP required.
                    </p>







                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <button className="forgotpass-form__button forgotpass-button forgotpass-submit" onClick={sendotp}>NEXT</button>
                </div>
            
            </div>
        </div>
        )}
        {Screen3 && (
        <div className="forgotpass-success-main-core">
            <div className="forgotpass-success-switch" id="switch-cnt">
                <div className="forgotpass-success-switch__circle"></div>
                <div className="forgotpass-success-switch__circle forgotpass-success-switch__circle--t"></div>
                <div className="forgotpass-form" id="a-form" >
                    <h2 className="forgotpass-form_title forgotpass-title">Forgot Password?</h2>
                    <span className="forgotpass-form__span1">Our Socials</span>
                    
                    <span className="forgotpass-form__span">Set New Password</span>
                    <span className='forgotpass-form-newpass-input-container'>
                        <span>
                            <input type="password" id="password" placeholder='New Password' className="forgotpass-form-newpass-input" onChange={(e) => setPwd(e.target.value)} value={pwd} required aria-invalid={validPwd ? "false" : "true"}  aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </span>
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase letters,<br/>
                            a number and a special character.<br />
                            Allowed special characters: !@#$%^&*
                            
                        </p>
                        
                        <span>
                            <input type="password" id="confirm-password" placeholder='Confirm Password' className="forgotpass-form-confirm-pass-input" onChange={(e) => setCPwd(e.target.value)} value={cpwd} required aria-invalid={validCPwd ? "false" : "true"}  aria-describedby="cpwdnote" onFocus={() => setCPwdFocus(true)} onBlur={() => setCPwdFocus(false)} />
                            <FontAwesomeIcon icon={faCheck} className={validCPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCPwd || !cpwd ? "hide" : "invalid"} />
                        </span>
                        <p id="cpwdnote" className={cpwdFocus && !validCPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase letters,<br/>
                            a number and a special character.<br />
                            Allowed special characters: !@#$%^&*
                            
                        </p>
                        
                    </span>

                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <button className="forgotpass-form__button forgotpass-button forgotpass-submit" disabled={!validPwd || !validCPwd || pwd !== cpwd} onClick={handlepassword} >NEXT</button>
                </div>
            </div>
        </div>
        )}
        {Screen4 && (
        <div className="forgotpass-success-main-core">
            <div className="forgotpass-success-switch" id="switch-cnt">
                <div className="forgotpass-success-switch__circle"></div>
                <div className="forgotpass-success-switch__circle forgotpass-success-switch__circle--t"></div>


                <div className="forgotpass-form" id="a-form" >
                    <h2 className="forgotpass-form_title forgotpass-title">Password Has Been Reset</h2>
                    <span className="forgotpass-form__span1">Our Socials</span>
                    
                    
                    <Link to='/signin'><button className="forgotpass-form__button forgotpass-button forgotpass-submit">LOGIN</button></Link>
                </div>
            </div>
        </div>
        )}
        </div>
  )
    
}

export default Forgotpass




























