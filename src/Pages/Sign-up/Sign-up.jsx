import './Sign-up.css';
import {useRef,useState,useEffect,React} from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';






const USER_REGEX = /^[A-z\s][A-z0-9\s-_]{3,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9-_](?=.*[@]).{2,32}$/;


const REGISTER_URL = '/register';
// const GOOGLE_REGISTER_URL = '/googleregister';




const Signup = () => {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        
    }, [pwd])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd,email])
  
  
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd ,email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username/Email Already Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    // const handleGoogleFailure = async (res) => {
    //     const err = res.error
    //     setErrMsg(err)
    //     console.log(err)
    // }

    // const handleGoogleSubmit = async (res) => {
    //     try {
    //         // Extract necessary data from 'res' or use data from your component state
    //         const email = res.profileObj.email;
    //         const user = res.profileObj.name;
    
    //         // Make an Axios post request to your server
    //         const response = await axios.post(
    //             GOOGLE_REGISTER_URL,
    //             JSON.stringify({ user, email }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    
    //         // Handle the server response
    //         console.log('Server Response:', response.data);
    //         console.log('Access Token:', response.accessToken);
    //         console.log('Response JSON:', JSON.stringify(response));
    
    //         // Update component state based on the server response
    //         setSuccess(true);
    
    //         // Clear state and controlled inputs
    //         setUser('');
    //         setPwd('');
    //     } catch (err) {
    //         // Handle different error scenarios
    //         if (!err.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response.status === 409) {
    //             setErrMsg('Username/Email Already Taken Please Sign In');
    //         } else {
    //             setErrMsg('Registration Failed');
    //         }
    
    //         // Focus on the error reference if available
    //         if (errRef.current) {
    //             errRef.current.focus();
    //         }
    //     }
    // };
    
    
  
  
    return (
        <>
        {success ? (
            <div className='signup-success-main'>
                <div className="signup-success-main-core">
                
                    <div className="signup-success-switch" id="switch-cnt">
            
                        <div className="signup-success-switch__circle"></div>
                        <div className="signup-success-switch__circle signup-success-switch__circle--t"></div>
            
                        <div className="signup-success-switch__container " id="switch-c2">
                        <h2 className="signup-success-switch__title signup-success-title">Welcome!</h2>
                        <p className="signup-success-switch__description signup-success-description">Feel free to persistently log in to your account.</p>
                        <button className="signup-success-switch__button signup-success-button signup-success-switch-btn" onClick={() => { navigate("/signin"); }}>SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>
        ):(
            <div className='signup-main'>
                <div className="signup-main-core">
                    <div className="signup-container signup-a-container" id="a-container">
                        
                        <form className="signup-form" id="a-form" method="" action="" onSubmit={handleSubmit}>
                        <div className="signup-switch__circle"></div>
                        <div className="signup-switch__circle signup-switch__circle--t"></div>
                        <h2 className="signup-form_title signup-title">Create Account</h2>
                        
                        


                        <span className="signup-form__span">Sign up with email</span>
                        

                        <div className='signup-form-input-container'>
                        <span>
                        <input className="signup-form__input" type="text" placeholder="Name" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)}/> 
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </span>
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        
                        
                        
                        
                        <span>
                            <input className="signup-form__input" type="text" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} required aria-invalid={validEmail ? "false" : "true"} aria-describedby="emailnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}/>
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </span>
                            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        <span>
                        <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        className="signup-form__input"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        />
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
                        
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        </div>
                        
                        
                        <button className="cssbuttons-io-button" disabled ={!validName || !validPwd || !validEmail ? true : false}> SIGN UP
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                            </div>
                        </button>
                        {/* <a href="Forgotpass" className="signup-form__login">Sign up using</a>
                        <div className="signup-form__google">
                            <GoogleLogin
                                clientId={clientid}
                                buttonText="Sign Up With Google"
                                onSuccess={handleGoogleSubmit}
                                onFailure={handleGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
                        </div> */}
                        

                        </form>
                    </div>

                    <div className="signup-switch" id="switch-cnt">
                        <div className="signup-switch__circle"></div>
                        <div className="signup-switch__circle signup-switch__circle--t"></div>
                        <div className="signup-switch__container" id="switch-c1">
                            <h2 className="signup-switch__title signup-title">Welcome Back !</h2>
                            <p className="signup-switch__description signup-description">To keep connected with us please login with your personal info</p>
                            <button className="signup-switch__button signup-button signup-switch-btn" onClick={() => { navigate("/signin"); }}>SIGN IN</button>
                        </div>
                    </div>
                
                </div>
            </div>
        )}
        </>
    )
    }

export default Signup












