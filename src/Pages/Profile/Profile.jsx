import React,{useRef,useState,useEffect} from 'react';
import './Profile.css';
import homelogo from '../../assets/icons8/icons8-home.png';
import userlogo from '../../assets/icons8/icons8-male-user.png';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//import { Link } from 'react-router-dom';

const MOBILE_REGEX = /^[0-9]{10}$/;



const Profile = () => {
  const userRef = useRef();
  const errRef = useRef();
  const {auth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  
  
  const {setAuth}= useAuth();
  const [isFieldsLocked, setIsFieldsLocked] = useState(true);
  const [stdCode, setStdCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsmobileNumber, setWhatsMobileNumber] = useState('');
  const [altmobileNumber, setAltMobileNumber] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [schoolname, setSchoolname] = useState('');
  const [userclass, setUserclass] = useState('');
  const [pfpfile,setPfpfile] = useState();
  const [errMsg,setErrMsg] = useState('');
  const [isSameAsMobile, setIsSameAsMobile] = useState(false);
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    userRef.current.focus();
  }, [])

  const toggleFieldLock = () => {
    setIsFieldsLocked(!isFieldsLocked);
  };

  
  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
    if (isSameAsMobile) {
      document.getElementById('whatsmobileNumber').value = event.target.value;
    }
  };

  const handleCheckboxChange = (event) => {
    setIsSameAsMobile(event.target.checked);
    if (event.target.checked) {
      setWhatsMobileNumber(mobileNumber);
    } else {
      setWhatsMobileNumber('');
    }
  };
  const handleImageClick = () => {
    // Trigger the input when the image is clicked
    document.querySelector('.profile-picture').click();
  };

  
  


  
  const handleEdit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const m1 = MOBILE_REGEX.test(mobileNumber);
        const m2 = MOBILE_REGEX.test(altmobileNumber);
        const m3 = MOBILE_REGEX.test(whatsmobileNumber);
        
        if (!m1 || !m2 || !m3 ) {
            setErrMsg("Invalid Contact Number");
            return;
        }
        
        
        try {
            const response = await axiosPrivate.put(`/users/${auth.email}`,
            JSON.stringify({ firstname,lastname,schoolname,stdCode,mobileNumber,whatsmobileNumber,altmobileNumber, userclass }),
                {
                  headers: { 'Content-Type': 'application/json' ,
                  Authorization: `Bearer ${auth.accessToken}`,
                },
                  
                }
            );
            setAuth({firstname,lastname,schoolname,stdCode,mobileNumber,whatsmobileNumber,altmobileNumber, userclass })
            setIsFieldsLocked(true);
            try {
              if (!pfpfile) {
                setIsFieldsLocked(true);
                return;
              }

              const formData = new FormData();
              formData.append('pfp', pfpfile);

              const response = await axiosPrivate.put(`/users/${auth.email}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${auth.accessToken}`,
                },
              });
        
              setIsFieldsLocked(true);
              
            } catch (err) {
              console.error('Error uploading profile picture:', err);
            }
            
            setFirstname('')
            setLastname('')
            setSchoolname('');
            setAltMobileNumber('');
            setMobileNumber('');
            setWhatsMobileNumber('');
            setUserclass('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setIsFieldsLocked(false);
            } else if (err.response?.status === 409) {
                setErrMsg('Username/Email Already Taken');
                setIsFieldsLocked(false);
            } else {
                setErrMsg('Registration Failed')
                setIsFieldsLocked(false);
            }
        }
        
        


        
    }
  
  const handleEditFields = () => {
    setFirstname(auth.Firstname)
    setLastname(auth.Lastname)
    setSchoolname(auth.SchoolName);
    setAltMobileNumber(auth.AltMobileNumber);
    setMobileNumber(auth.MobileNumber);
    setWhatsMobileNumber(auth.WhatsMobileNumber);
    
    setIsFieldsLocked(false); // Unlock the fields
  };
  
  
  



  return (
    <div className="profile-main">
      
      <div className="profile-card-main profile-navigation-card">
        <div className = "profile-navigation-cards-group-upper">
          
          
            <div className="profile-cards profile-navigation-cards-hero">
              <img className="profile-form__icon" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-text">PROFILE</h1>
            </div>
          
          
          <div className="profile-vertical-cards profile-vertical-cards-upper profile-navigation-card-group-mid">
            
            <div className="profile-cards profile-navigation-cards-menu">
              <img className="profile-form__icon-menu" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-menu-text">Home</h1>
            </div>

            <div className="profile-cards profile-navigation-cards-menu">
              <img className="profile-form__icon-menu" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-menu-text">Events</h1>
            </div>

            <div className="profile-cards profile-navigation-cards-menu">
              <img className="profile-form__icon-menu" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-menu-text">Participants</h1>
            </div>

            <div className="profile-cards profile-navigation-cards-menu">
              <img className="profile-form__icon-menu" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-menu-text">Payments</h1>
            </div>

            <div className="profile-cards profile-navigation-cards-menu">
              <img className="profile-form__icon-menu" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-menu-text">DASHBOARD</h1>
            </div>

            <div className="profile-cards profile-navigation-cards-menu">
              <img className="profile-form__icon-menu" src={homelogo} alt=''/>
              <h1 className="profile-navigation-hero-menu-text">DASHBOARD</h1>
            </div>
            
            
          </div>

        </div>
        
        
        <div className = "profile-navigation-cards-group-lower">
          <div className="profile-cards profile-navigation-cards-profile">
            <img className="profile-form__icon-profile" src={pfpfile? URL.createObjectURL(pfpfile) : userlogo} alt=''/>
            <h1 className="profile-navigation-hero-profile-text">{auth.Username}</h1>
          </div>
        </div>
      </div>

      <div className='profile-card-group-align'>
        <div className="profile-card-main profile-card-group">
          <div className="profile-horizontal-cards profile-card-group-top">
            
            <div className="profile-cards profile-cards-top">
              <input type='file' name='profilePicture' className='profile-picture' accept='image/*' onChange={(e) => setPfpfile(e.target.files[0])} disabled={isFieldsLocked} required/>             
              <img className="profile-form__icon-top" alt ='userprofilepic' src={pfpfile? URL.createObjectURL(pfpfile) : userlogo} onClick={handleImageClick}/>
              
              <h1 className="profile-main-username-text">{auth.Username}</h1>
            </div>
            
            
          </div>
          
          <div className="profile-horizontal-cards profile-card-group-bottom">
            <div className="profile-cards profile-cards-bottom">
              
                <form className="profile-form" onSubmit={handleEdit}>

                
                
                  {/* USERNAME AND EMAIL */}
                  <div>
                    <input className="profile-form__input" id='profile-username' ref={userRef} type="text" placeholder="Username" value={auth.Username} readOnly={isFieldsLocked} required/>
                    <input className="profile-form__input" id='first_name' type="text" placeholder="Email" value={auth.email} readOnly={isFieldsLocked} required/>
                  </div>
                  {/* FIRSTNAME AND LASTNAME */}
                  <div>
                    <input className="profile-form__input" id='firstname' onChange={(e) => setFirstname(e.target.value)} value={isFieldsLocked ? auth.Firstname : firstname} type="text" placeholder="Firstname" readOnly={isFieldsLocked} required/>
                    <input className="profile-form__input" id='lastname' onChange={(e) => setLastname(e.target.value)} value={isFieldsLocked ? auth.Lastname : lastname} type="text" placeholder="Lastname" readOnly={isFieldsLocked} required/>
                  </div>
                  {/* MOBILE NO. AND WHATSAPP NO. */}
                  <div className='profile-horizontal-fields'>
                    {/* STD Code Dropdown */}
                    <select className="profile-std-code-dropdown" id='stdcode' value={auth.StdCode} onChange={(e) => setStdCode(e.target.value)}>
                      <option value="+1">+1 (USA)</option>
                      <option value="+7">+7 (Russia)</option>
                      <option value="+44">+44 (USA)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+92">+92 (Pakistan)</option>
                      <option value="+94">+94 (Sri Lanka)</option>
                      <option value="+975">+975 (Bhutan)</option>
                      <option value="+880">+880 (Bangladesh)</option>
                    </select>
                    <input className="profile-form__input" id='mobilenumber' onChange={handleMobileNumberChange} value={isFieldsLocked ? auth.MobileNumber : mobileNumber} type="text" placeholder="Mobile No." readOnly={isFieldsLocked} required />
                    <input className="profile-form__input" id='whatsmobileNumber' onChange={(e) => setWhatsMobileNumber(e.target.value)} value={isFieldsLocked ? auth.WhatsMobileNumber :whatsmobileNumber} type="text" placeholder="Whatsapp No." readOnly={isFieldsLocked} required/>
                    <input className={!isFieldsLocked? "profile-form__checkbox":"hidden-checkbox"} type="checkbox" placeholder="Whatssap No." checked={isSameAsMobile} readOnly={isFieldsLocked} onChange={handleCheckboxChange}/>
                    <p className={!isFieldsLocked?"profile-form__checkbox-text" : "hidden-checkbox-text"}>Is Whatssap No.<br/> Same as Mobile No.?</p>
                  </div>
                  {/* ALTERNATE MOBILE NO. AND SCHOOL NAME */}
                  <div className='profile-horizontal-fields alternate-number'>
                    {/* STD Code Dropdown */}
                    <select className="profile-std-code-dropdown" id='stdcode' value={stdCode || auth.StdCode} onChange={(e) => setStdCode(e.target.value)}>
                      <option value="+91">+91 (India)</option>
                    </select>
                    <input className="profile-form__input" id='altmobilenumber' onChange={(e) => setAltMobileNumber(e.target.value)} value={isFieldsLocked ? auth.AltMobileNumber:altmobileNumber} type="text" placeholder="Alternate No." readOnly={isFieldsLocked}  />
                    <input className="profile-form__input" id='schoolname' onChange={(e) => setSchoolname(e.target.value)} value={isFieldsLocked ? auth.SchoolName :schoolname} type="text" placeholder="School/Institution Name" readOnly={isFieldsLocked} required/>
                  </div>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <div className='profile-bottom-buttons'>
                  <button className="profile-form__button profile-button profile-save" type="button" disabled = {!isFieldsLocked} onClick={handleEditFields} >Edit Fields</button>
                  <button className="profile-form__button profile-button profile-save"  disabled = {isFieldsLocked} >SAVE</button>
                  </div>
                </form>
            </div>
              
          </div>
        </div>
      </div>

    </div>



  )
}


export default Profile












