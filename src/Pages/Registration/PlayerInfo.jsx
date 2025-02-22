import React, { useState, useEffect } from 'react';
import './Registration-Form.css';
import { storage } from '../../hooks/firebase';
import player_img from '../../assets/Team images/sampleimg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const PlayerInfo = ({ playerNumber,playerdata,event, handleBack, handleNext,saveData,handleSum,err}) => {
  const [pfp, setpfp] = useState(null);
  const [collegeimage, setCollegeImage] = useState(null);
  const [pfpUrl, setpfpUrl] = useState(null);
  const [college, setCollege] = useState(null);
  const [collegeimageUrl, setCollegeImageUrl] = useState(null);
  const [pfpLoading, setpfpLoading] = useState(false);
  const [collegeImageLoading, setCollegeImageLoading] = useState(false);
  const [Name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [rollno, setRollno] = useState('');
  const [branch, setBranch] = useState('');
  const [errmsg,setErrmsg] = useState('');
  const [loading,setLoading] = useState(false);
  
  useEffect(()=>{
    console.log(event);
    console.log(playerNumber)
  },[])




  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
  };
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };
  const handlerollNoChange = (e) => {
    setRollno(e.target.value);
  };



  useEffect(() => {
    if (err) {
      setErrmsg(err)
    }
  }, [err]);

  useEffect(() => {
    if (pfp) {
      handlepfpUpload();
    }
  }, [pfp]);
  useEffect(() => {
    if (collegeimage) {
      handleCollegeIdUpload();
    }
  }, [collegeimage]);


  const handlepfpChange = (e) => {
    if (e.target.files[0]) {
      setpfp(e.target.files[0]);
    }
  };
  const handleCollegeImageChange = (e) => {
    if (e.target.files[0]) {
      setCollegeImage(e.target.files[0]);
    }
  };
  const handleCollegeIdUpload = () => {
    setCollegeImageLoading(true);
    const uploadTask = storage.ref(`images/govid/${collegeimage.name}`).put(collegeimage);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track upload progress if needed
      },
      (error) => {
        console.error('Error uploading image:', error);

      },
      () => {
        storage
          .ref('images/govid')
          .child(collegeimage.name)
          .getDownloadURL()
          .then((url) => {
            setCollegeImageUrl(url); // Save the image URL
            setCollegeImageLoading(false);
          });
      }
    );
  };
  const handlepfpUpload = () => {
    setpfpLoading(true);
    const uploadTask = storage.ref(`images/pfp/${pfp.name}`).put(pfp);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
      },
      (error) => {
        console.error('Error uploading image:', error);
      },
      () => {
        storage
          .ref('images/pfp')
          .child(pfp.name)
          .getDownloadURL()
          .then((url) => {
            setpfpUrl(url); // Save the image URL
            setpfpLoading(false);
          });
      }
    );
  };


  const handleSubmitdata = async () => {
    const formData = {
      Name: playerdata?.Name? playerdata.Name : Name,
      rollno:playerdata?.rollno ? playerdata.rollno : rollno,
      branch:playerdata?.branch ? playerdata.branch : branch,
      department:playerdata?.department ? playerdata.department : department,
      collegeID:playerdata?.collegeID ? playerdata.collegeID : collegeimageUrl,
      pfp:playerdata?.pfp ? playerdata.pfp : pfpUrl,
      college:playerdata?.college ? playerdata.college : college,
    };
    
    const saved = await saveData(formData);
    return saved
  };

  const handledatandsubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    
    await handleSubmitdata()
    handleSum();


    setLoading(false)
    
        
};


  const handledatandnext = async (event) => { 
    event.preventDefault();
    await handleSubmitdata();
    await handleNext();
    
    
  }

  return (
    <div className="registration-screen-3">
      <h1 className="registration-team-head event-head"> Player-{playerNumber}</h1>
      <form className='registration-form-container' onSubmit={event === playerNumber ? handledatandsubmit : handledatandnext} >
        <div className='registration-pfp-container'>
          {pfpLoading ? (
            <div>
                <button className="" type="button" disabled/>
                <button className="registration-players-upload-button" type="button" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 101" className="inline w-4 h-4 mr-3 text-white animate-bounce" role="status" aria-hidden="true">
                        <circle fill="#34D399" r="45" cy="50" cx="50"></circle>
                    </svg>
                    Uploading...
                </button>
            </div>
          ) : pfpUrl ? (
              <div>
                  <img className="registration-pfp-image" src={pfpUrl} alt="Gov ID" />
              </div>
          ) : playerdata?.pfp ? (
              <div>
                  <img className="registration-id-image" src={playerdata.pfp} alt="Gov ID" />
              </div>
          ) : (
              <>
                  <label className="registration-pfpfile" htmlFor="pfpfile">
                      <img className="registration-pfp-image" src={player_img} alt='icon'/>
                      <p>Please Upload a Clear and Upfront Profile Picture</p>
                  </label>
                  <input className="registration-pfp-upload" type="file" onChange={handlepfpChange} id="pfpfile" name="myfile" />
              </>
          )}

        </div>
        <div className="registration-inner-regform">
          <input className="registration-input" id={`fname-${playerNumber}`} value={playerdata?.Name ? playerdata.Name : Name} onChange={handleNameChange} type="text" placeholder="Full Name" />
          <input className="registration-input" id={`frollno-${playerNumber}`} value={playerdata?.rollno ? playerdata.rollno : rollno} onChange={handlerollNoChange} type="text" placeholder="Roll No." />
          <input className="registration-input" id={`fbranch-${playerNumber}`} value={playerdata?.branch ? playerdata.branch : branch} onChange={handleBranchChange} type="text" placeholder="Branch" />
          <input className="registration-input" id={`fdepartment-${playerNumber}`} value={playerdata?.department ? playerdata.department : department} onChange={handleDepartmentChange} type="text" placeholder="Department" />
          
        </div>
        <div className="registration-course">
          <select name="registration-course" id="course" onChange={handleCollegeChange} >
            <option value="" className="registration-course-option" disabled selected>Select College</option>
            <option className="registration-course-option" value="CEC">Chandigarh Engineering College</option>
            <option className="registration-course-option" value="CPC">Chandigarh Pharmacy College</option>
            <option className="registration-course-option" value="CLC">Chandigarh Law College</option>
            <option className="registration-course-option" value="CSB">Chandigarh School of Business</option>
            <option className="registration-course-option" value="CCE">Chandigarh College of Engineering</option>
          </select>
        </div>
        <div className="registration-screen-file">
        
          {collegeImageLoading ? (
            <div>
              <button className="registration-players-upload-button" type="button" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 101" className="inline w-4 h-4 mr-3 text-white animate-bounce" role="status" aria-hidden="true">
                  <circle fill="#34D399" r="45" cy="50" cx="50"></circle>
                </svg>
                Uploading...
              </button>
            </div>
          ) : collegeimageUrl ? (
            <div>
              <img className="registration-id-image" src={collegeimageUrl} alt="College ID" />
            </div>
          ) : playerdata?.collegeID? (
            <div>
              <img className = "registration-id-image" src={playerdata.collegeID} alt="College ID" />
            </div>
          ) : (
            <>
              <label className="registration-pfpfile" htmlFor="registration-collegeid">
                <FontAwesomeIcon className='registration-id-image' icon={faUpload}/>Upload College ID</label>
                
                <p>Please Upload a Clear and Upfront Identity Document</p>

              <input className="registration-fileupload" type="file" onChange={handleCollegeImageChange} id="registration-collegeid" name="myfile" />
            </>
          )}

        </div>
        <p>{errmsg}</p>
        <div className="registration-flexbtn">
          <input className="registration-submit-btn save-btn" onClick={handleBack} type="button" value="Back" />
          {/* <input className="registration-submit-btn save-btn" disabled={pfpLoading || collegeImageLoading} onClick={handleSubmit} type="button" value="Next" /> */}
          <input 
              className="registration-submit-btn save-btn" 
              type="submit" 
              value={loading === true ? "Loading" : "Next"}
              disabled={loading} 
          />



        </div>
      </form>
    </div>
  );
};

export default PlayerInfo;
