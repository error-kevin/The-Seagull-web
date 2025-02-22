import React, { useRef, useState, useEffect } from "react";
import "./Profile.css";
import useAuth from "../../hooks/useAuth";
import { storage } from "../../hooks/firebase";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { Link } from 'react-router-dom';
import { ROLES } from "../../App";
import sample from "../../assets/Team images/sampleimg.png";

const MOBILE_REGEX = /^[0-9]{10}$/;

const Profile = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { setAuth } = useAuth();
  const [isFieldsLocked, setIsFieldsLocked] = useState(true);
  const [stdCode, setStdCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsmobilenumber, setWhatsMobileNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [schoolname, setSchoolname] = useState("");
  const [pfp, setpfp] = useState(null);
  const [pfpUrl, setpfpUrl] = useState(null);
  const [pfpLoading, setpfpLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSameAsMobile, setIsSameAsMobile] = useState(false);
  const [hasAdminRole, setHasAdminroles] = useState(false);
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    // userRef.current.focus();
    console.log(auth);
  }, []);

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
    if (isSameAsMobile) {
      document.getElementById("whatsmobilenumber").value = event.target.value;
    }
  };

  const handleCheckboxChange = (event) => {
    setIsSameAsMobile(event.target.checked);
    if (event.target.checked) {
      setWhatsMobileNumber(mobileNumber);
    } else {
      setWhatsMobileNumber("");
    }
  };
  const handleImageClick = () => {
    // Trigger the input when the image is clicked
    document.querySelector(".profile-picture").click();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const m1 = MOBILE_REGEX.test(mobileNumber);
    const m3 = MOBILE_REGEX.test(whatsmobilenumber);

    if (!m1 || !m3) {
      setErrMsg("Invalid Contact Number");
      return;
    }

    try {
      const response = await axiosPrivate.put(
        `/users/${auth.email}`,
        JSON.stringify({
          firstname,
          lastname,
          stdCode,
          mobileNumber,
          whatsmobilenumber,
          pfpUrl,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response);
      setAuth({
        firstname: firstname,
        lastname: lastname,
        mobileNumber: mobileNumber,
        whatsmobileNumber: whatsmobilenumber,
        stdcode: stdCode,
        pfpUrl: pfpUrl,
      });
      setIsFieldsLocked(true);
      setFirstname("");
      setLastname("");
      setMobileNumber("");
      setWhatsMobileNumber("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        setIsFieldsLocked(false);
      } else if (err.response?.status === 409) {
        setErrMsg("Username/Email Already Taken");
        setIsFieldsLocked(false);
      } else {
        setErrMsg("Registration Failed");
        setIsFieldsLocked(false);
      }
    }
  };

  const handleEditFields = () => {
    setFirstname(auth.firstname);
    setLastname(auth.lastname);
    setMobileNumber(auth.mobileNumber);
    setWhatsMobileNumber(auth.whatsmobilenumber);

    setIsFieldsLocked(false); // Unlock the fields
  };
  const handlepfpChange = (e) => {
    if (e.target.files[0]) {
      setpfp(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (pfp) {
      handlepfpUpload();
    }
  }, [pfp]);

  useEffect(() => {
    console.log(pfpUrl);
  }, [pfpUrl]);

  const handlepfpUpload = () => {
    setpfpLoading(true);
    const uploadTask = storage.ref(`images/pfp/${pfp.name}`).put(pfp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading image:", error);
      },
      () => {
        storage
          .ref("images/pfp")
          .child(pfp.name)
          .getDownloadURL()
          .then((url) => {
            setpfpUrl(url); // Save the image URL
            setpfpLoading(false);
          });
      }
    );
  };

  useEffect(() => {
    if (auth.roles !== undefined || auth.Roles !== undefined) {
      const authRoles = JSON.stringify(auth.roles || auth.Roles);

      if (authRoles.includes(ROLES.Admin)) {
        setHasAdminroles(true);
        console.log("has admin role");
      } else {
        setHasAdminroles(false);
        console.log("does not have admin role");
      }
    } else {
      setHasAdminroles(false);
    }
  }, [auth.roles, auth.Roles]);

  return (
    <div className="profile-main">
      {hasAdminRole && (
        <div className="profile-card-main profile-navigation-card">
          <div className="profile-navigation-cards-group-upper">
            <div className="profile-cards profile-navigation-cards-hero">
              <h1 className="profile-navigation-hero-text">PROFILE</h1>
            </div>

            <div className="profile-vertical-cards profile-vertical-cards-upper profile-navigation-card-group-mid">
              <div className="profile-cards profile-navigation-cards-menu">
                <h1 className="profile-navigation-hero-menu-text">Home</h1>
              </div>

              <div className="profile-cards profile-navigation-cards-menu">
                <h1 className="profile-navigation-hero-menu-text">Events</h1>
              </div>

              <div className="profile-cards profile-navigation-cards-menu">
                <h1 className="profile-navigation-hero-menu-text">
                  Participants
                </h1>
              </div>

              <div className="profile-cards profile-navigation-cards-menu">
                <h1 className="profile-navigation-hero-menu-text">Payments</h1>
              </div>

              <div className="profile-cards profile-navigation-cards-menu">
                <h1 className="profile-navigation-hero-menu-text">DASHBOARD</h1>
              </div>

              <div className="profile-cards profile-navigation-cards-menu">
                <h1 className="profile-navigation-hero-menu-text">DASHBOARD</h1>
              </div>
            </div>
          </div>

          <div className="profile-navigation-cards-group-lower">
            <div className="profile-cards profile-navigation-cards-profile">
              <img
                className="profile-form__icon-profile"
                src={auth.pfpUrl || sample}
                alt=""
              />
              <h1 className="profile-navigation-hero-profile-text">
                {auth.username}
              </h1>
            </div>
          </div>
        </div>
      )}
      <div className="profile-card-group-align">
        <div className="profile-card-main profile-card-group">
          <div className="profile-horizontal-cards profile-card-group-top">
            <div className="profile-pfp-container">
              {pfpLoading ? (
                <div>
                  <button className="" type="button" disabled />
                  <button
                    className="registration-players-upload-button"
                    type="button"
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 100 101"
                      className="inline w-4 h-4 mr-3 text-white animate-bounce"
                      role="status"
                      aria-hidden="true"
                    >
                      <circle fill="#34D399" r="45" cy="50" cx="50"></circle>
                    </svg>
                    Uploading...
                  </button>
                </div>
              ) : pfpUrl ? (
                <>
                  <label className="registration-pfpfile" htmlFor="pfpfile">
                    <img
                      className="registration-pfp-image"
                      src={pfpUrl}
                      alt="icon"
                    />
                  </label>
                  <input
                    className="profile-pfp-upload"
                    disabled={isFieldsLocked}
                    type="file"
                    onChange={handlepfpChange}
                    id="pfpfile"
                    name="myfile"
                  />
                </>
              ) : auth?.pfpUrl ? (
                <>
                  <label className="registration-pfpfile" htmlFor="pfpfile">
                    <img
                      className="registration-pfp-image"
                      src={auth.pfpUrl}
                      alt="icon"
                    />
                  </label>
                  <input
                    className="profile-pfp-upload"
                    disabled={isFieldsLocked}
                    type="file"
                    onChange={handlepfpChange}
                    id="pfpfile"
                    name="myfile"
                  />
                </>
              ) : (
                <>
                  <label className="registration-pfpfile" htmlFor="pfpfile">
                    <img
                      className="registration-pfp-image"
                      src={sample}
                      alt="icon"
                    />
                  </label>
                  <input
                    className="profile-pfp-upload"
                    disabled={isFieldsLocked}
                    type="file"
                    onChange={handlepfpChange}
                    id="pfpfile"
                    name="myfile"
                  />
                  {/* <input disabled = {isFieldsLocked} type="file" onChange={handlepfpChange} id="pfpfile" name="myfile" /> */}
                </>
              )}
            </div>
          </div>

          <div className="profile-horizontal-cards profile-card-group-bottom">
            <div className="profile-cards profile-cards-bottom">
              <form className="profile-form" onSubmit={handleEdit}>
                {/* <div className='dashboard-roles-container'>
                    {Object.keys(auth.roles).map((role,index)=>(
                      <div className='dashboard-role-card'>{role}</div>
                    ))}
                          
                  </div> */}
                {/* USERNAME AND EMAIL */}
                <div className="profile-horizontal-fields">
                  <input
                    className="profile-form__input"
                    id="profile-username"
                    ref={userRef}
                    type="text"
                    placeholder="Username"
                    value={auth.username}
                    readOnly={isFieldsLocked}
                    required
                  />
                  <input
                    className="profile-form__input"
                    id="first_name"
                    type="text"
                    placeholder="Email"
                    value={auth.email}
                    readOnly={isFieldsLocked}
                    required
                  />
                </div>
                {/* FIRSTNAME AND LASTNAME */}
                <div className="profile-horizontal-fields">
                  <input
                    className="profile-form__input"
                    id="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={isFieldsLocked ? auth.firstname : firstname}
                    type="text"
                    placeholder="Firstname"
                    readOnly={isFieldsLocked}
                    required
                  />
                  <input
                    className="profile-form__input"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    value={isFieldsLocked ? auth.lastname : lastname}
                    type="text"
                    placeholder="Lastname"
                    readOnly={isFieldsLocked}
                    required
                  />
                </div>
                {/* MOBILE NO. AND WHATSAPP NO. */}
                <div className="profile-horizontal-fields">
                  {/* STD Code Dropdown */}
                  <select
                    className="profile-std-code-dropdown"
                    id="stdcode"
                    value={auth.stdcode}
                    onChange={(e) => setStdCode(e.target.value)}
                  >
                    <option value="+1">+1 (USA)</option>
                    <option value="+7">+7 (Russia)</option>
                    <option value="+44">+44 (USA)</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+92">+92 (Pakistan)</option>
                    <option value="+94">+94 (Sri Lanka)</option>
                    <option value="+975">+975 (Bhutan)</option>
                    <option value="+880">+880 (Bangladesh)</option>
                  </select>
                  <input
                    className="profile-form__input"
                    id="mobilenumber"
                    onChange={handleMobileNumberChange}
                    value={isFieldsLocked ? auth.mobileNumber : mobileNumber}
                    type="text"
                    placeholder="Mobile No."
                    readOnly={isFieldsLocked}
                    required
                  />
                  <input
                    className="profile-form__input"
                    id="whatsmobilenumber"
                    onChange={(e) => setWhatsMobileNumber(e.target.value)}
                    value={
                      isFieldsLocked
                        ? auth.whatsmobilenumber
                        : whatsmobilenumber
                    }
                    type="text"
                    placeholder="Whatsapp No."
                    readOnly={isFieldsLocked}
                    required
                  />
                  <input
                    className={
                      !isFieldsLocked
                        ? "profile-form__checkbox"
                        : "hidden-checkbox"
                    }
                    type="checkbox"
                    placeholder="Whatssap No."
                    checked={isSameAsMobile}
                    readOnly={isFieldsLocked}
                    onChange={handleCheckboxChange}
                  />
                  <p
                    className={
                      !isFieldsLocked
                        ? "profile-form__checkbox-text"
                        : "hidden-checkbox-text"
                    }
                  >
                    Is Whatssap No.
                    <br /> Same as Mobile No.?
                  </p>
                </div>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <div className="profile-bottom-buttons">
                  <button
                    className="profile-form__button profile-button profile-save"
                    type="button"
                    disabled={!isFieldsLocked}
                    onClick={handleEditFields}
                  >
                    <p>Edit Fields</p>
                  </button>
                  <button
                    className="profile-form__button profile-button profile-save"
                    disabled={isFieldsLocked}
                  >
                    <p>SAVE</p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
