import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration-Form.css';
import recoil from '../../assets/Core/recoil.png'
import qurious from '../../assets/Core/qurious.png'
import encode from '../../assets/Core/encode.png'
import monochrome from '../../assets/Core/monochrome.png'
import pixel from '../../assets/Core/pixel-perfect.png'
import ciniphilia from '../../assets/Core/cinephilia.png'
import miragelogo from '../../assets/Core/thinkathon-logo.png';
import PlayerInfo from './PlayerInfo';
import Summary from './summary';
import axios from '../../api/axios';

const REGISTRATION_URL = "/registration"

const Registration = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(1);

  const [playersData, setPlayersData] = useState([]);
  const [playerNumber,setPlayerNumber] = useState(null);
  const [success,setSuccess] = useState(false);
  const [sum,setSum] = useState(false);
  const [err,setErr] = useState(null)

  const [player1data,setPlayer1Data] = useState(null);
  const [player2data,setPlayer2Data] = useState(null);
  const [player3data,setPlayer3Data] = useState(null);
  const [player4data,setPlayer4Data] = useState(null);

  const [applicantemail,setApplicantemail] = useState('');
  const [teamMembers,setTeamMembers] = useState();
  const [teamname,setTeamName] = useState('');
  const [teamleader,setTeamleader] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');



  

  const saveData = async (formdata) => {
    let newPlayersData;
    
    if (playersData.length === 0) {
      newPlayersData = [formdata];
    } else {
      newPlayersData = [
        ...playersData.slice(0, playerNumber - 1),
        formdata,
        ...playersData.slice(playerNumber)
      ];
    }
  
    // Update the backend data and wait for it to finish
    await updatebackenddata(newPlayersData);
  
    // Update the state with the new data
    await setPlayersData(newPlayersData);
    
    // Return a resolved promise
    return Promise.resolve();
  };
  


  const handleSubmit = async () => {
    try {
        const response = await axios.post(REGISTRATION_URL,
            JSON.stringify(data),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        
        
        // if(data.name6 && data.name6.trim() !== "undefined undefined" && data.name6.trim() !== ""){
        //   window.location.href = "https://pmny.in/Ur5jM55xZeAt"
        // }
        // else if(data.name5 && data.name5.trim() !== "undefined undefined" && data.name5.trim() !== ""){
        //   window.location.href = "https://pmny.in/5JU9LCzht2gf"
        // }
        // else if (data.name4 && data.name4.trim() !== "undefined undefined" && data.name4.trim() !== "") {
        //   window.location.href = "https://pmny.in/zJ99cCnhJ3Lu"
        // }
        
        
        setSuccess(true);
    } catch (err) {
      if (!err?.response) {
          setErr('No Server Response');
          console.log('No Server Response');
          console.log(err)
      } else {
          setErr('Registration Failed')
          console.log('Registration Failed')
      }
  }
  return data;
}


const updatebackenddata = async (pData) => {
  for (const [index, player] of pData.entries()) {
      switch (index) {
          case 0:
              await setPlayer1Data(player);
              break;
          case 1:
              await setPlayer2Data(player);
              break;
          case 2:
              await setPlayer3Data(player);
              break;
          case 3:
              await setPlayer4Data(player);
              break;
          default:
              break;
      }
  }
  return data; // Ensure that data is defined elsewhere in your code
};

    
    const data = {
      email: applicantemail,
  
      teamname: teamname,
      teamleader: teamleader,
      teammembers: teamMembers,
  
      name1: player1data?.Name,
      rollno1:player1data?.rollno,
      branch1:player1data?.branch,
      department1:player1data?.department,
      college1:player1data?.college,
      pfp1: player1data?.pfp,
      IdCard1: player1data?.collegeID,

      name2: player2data?.Name,
      rollno2:player2data?.rollno,
      branch2:player2data?.branch,
      department2:player2data?.department,
      college2:player2data?.college,
      pfp2: player2data?.pfp,
      IdCard2: player2data?.collegeID,
      
      name3: player3data?.Name,
      rollno3: player3data?.rollno,
      branch3: player3data?.branch,
      department3: player3data?.department,
      college3: player3data?.college,
      pfp3: player3data?.pfp,
      IdCard3: player3data?.collegeID,

      name4: player4data?.Name,
      rollno4: player4data?.rollno,
      branch4: player4data?.branch,
      department4: player4data?.department,
      college4: player4data?.college,
      pfp4: player4data?.pfp,
      IdCard4: player4data?.collegeID,

  };
  
  


    


  
  const handleApplicantEmailChange = (event) => {
    setApplicantemail(event.target.value)
  }
  
  const handleTeamMemberCount = (event) => {
    const selectedCollege = event.target.value;
    setTeamMembers(parseInt(selectedCollege));
    }
  const handleteamnamechange = (event) => {
    setTeamName(event.target.value)
  }
  const handleteamleaderchange = (event) => {
    setTeamleader(event.target.value)
  }
  useEffect(()=>{
    console.log(teamMembers);
  },[teamMembers])
  
  const handleNext = () => {
    const screenToPlayerNumber = {
      3: 1,
      4: 2,
      5: 3,
      6: 4,
      7: 5,
      8: 6
    };

    const playerNumber = screenToPlayerNumber[currentScreen+1];
    if (playerNumber !== undefined) {
        setPlayerNumber(playerNumber);
    }
    setCurrentScreen(currentScreen + 1);
  };
  const handlesBack = () => {
    setSum(false);
    setCurrentScreen(teamMembers + 2)
    // setPlayerNumber(1);
  }
  const handleBack = () => {
    
    const screenToPlayerNumber = {
      3: 1,
      4: 2,
      5: 3,
      6: 4,
      7: 5,
      8: 6
    };
    
    const playerNumber = screenToPlayerNumber[currentScreen-1];
    if (playerNumber !== undefined) {
        setPlayerNumber(playerNumber);
    }
    
    
    setCurrentScreen(currentScreen -1);
  };
  

  const handlesum = ()=>{
    setSum(true);
  }

  const renderScreen = (screenNumber) => {
    switch (screenNumber) {
      case 1:
        return (
              <form className="registration-form" onSubmit={handleNext}>
                <div className="registration-form-head">
                  <img className="registration-logo-image" alt='logo' src={miragelogo} />
                  <h1 className="registration-regform gamingevent">Thinkathon</h1>
                </div>
                <hr />
                <h1 className="registration-regform">Registration Form</h1>
                <div className="main-container">
                  <div className="registration-inner-regform" >
                    <input className="registration-input" onChange={handleApplicantEmailChange} name="email" type="email" placeholder="E-mail" required />
                  </div>
                  
                </div>
                <hr />
                <div className="registration-radio-flexbtn">
                  <button className="registration-submit-btn" type="submit">Next</button>
                </div>
              </form>
        );
      case 2:
        return (
            <div>
            
            <form className="registration-screen-2-team-form" onSubmit={handleNext} >
              <h1 className="registration-team-head registration-event-head"> Select Event</h1>
              <div className='registration-main-input-container'>
                <div className='registration-input-container'>
                  <input className="registration-input registration-teamname" onChange={handleteamnamechange} name="team_name" type="text" placeholder="Team Name" required/>
                  <input className="registration-input registration-teamname" onChange={handleteamleaderchange} type="text" placeholder="Team Leader Name" required/>
                </div>
                <div className="registration-course">
                      <select className="registration-course" id="course" onChange={handleTeamMemberCount} required>
                        <option className="registration-course-option" value="" disabled selected>No. Of Members</option>
                        <option className="registration-course-option" value="1">1</option>
                        <option className="registration-course-option" value="2">2</option>
                        <option className="registration-course-option" value="3">3</option>
                        <option className="registration-course-option" value="4">4</option>
                      </select>
                  </div>
                {/* <div className="registration-event-radio">
                  <div className="registration-event-sub-radio-1">
                    <div className="registration-event-select">
                        <label htmlFor="event-Recoil" className='events-ace-sub-heading'><img className='registration-logo' src={recoil} alt="Error in loading Toykathon Image" /></label>
                        <input className='registration-event-selec-radio-btn' type="radio" id="event-Recoil" name="event" value="Recoil" onChange={handleEventChange} required />
                    </div>
                  </div>
                  <div className="registration-event-sub-radio-1">
                    <div className="registration-event-select">
                        <label htmlFor="event-Encode" className='events-ace-sub-heading'><img className='registration-logo' src={encode} alt="Error in loading Toykathon Image" /></label>
                        <input className='registration-event-selec-radio-btn' type="radio" id="event-Encode" name="event" value="Encode" onChange={handleEventChange} required />
                    </div>
                  </div>
                  <div className="registration-event-sub-radio-1">
                    <div className="registration-event-select">
                        <label htmlFor="event-Qurious" className='events-ace-sub-heading'><img className='registration-logo' src={qurious} alt="Error in loading Toykathon Image" /></label>
                        <input className='registration-event-selec-radio-btn' type="radio" id="event-Qurious" name="event" value="Qurious" onChange={handleEventChange} required />
                    </div>
                  </div>
                  <div className="registration-event-sub-radio-1">
                    <div className="registration-event-select">
                        <label htmlFor="event-Monochrome" className='events-ace-sub-heading'><img className='registration-logo' src={monochrome} alt="Error in loading Toykathon Image" /></label>
                        <input className='registration-event-selec-radio-btn' type="radio" id="event-Monochrome" name="event" value="Monochrome" onChange={handleEventChange} required />
                    </div>
                  </div>
                  <div className="registration-event-sub-radio-1">
                    <div className="registration-event-select">
                        <label htmlFor="event-Cinephilia" className='events-ace-sub-heading'><img className='registration-logo' src={ciniphilia} alt="Error in loading Toykathon Image" /></label>
                        <input className='registration-event-selec-radio-btn' type="radio" id="event-Cinephilia" name="event" value="Cinephilia" onChange={handleEventChange} required />
                    </div>
                  </div>
                  <div className="registration-event-sub-radio-1">
                    <div className="registration-event-select">
                        <label htmlFor="event-Pixelperfect" className='events-ace-sub-heading'><img className='registration-logo' src={pixel} alt="Error in loading Toykathon Image" /></label>
                        <input className='registration-event-selec-radio-btn' type="radio" id="event-Pixelperfect" name="event" value="PixelPerfect" onChange={handleEventChange} required />
                    </div>
                  </div>
                </div> */}

              </div>
              <div className="registration-radio-flexbtn">
                <input className="registration-radio-submit-btn " onClick={handleBack} type="button" value="Back" />
                <input className="registration-radio-submit-btn " type="submit" value="Next" />
              </div>
            </form>
          </div>
        );
      case 3:
            if (teamMembers !== 1) {
              return <PlayerInfo playerNumber={1} event={teamMembers} key={playerNumber} playerdata = {player1data} handleBack={handleBack} handleNext={handleNext} saveData={saveData} updatebackenddata={updatebackenddata} err={err}/>;
            }
            else{
              return <PlayerInfo playerNumber={1} event={teamMembers} key={playerNumber} playerdata = {player1data} handleBack={handleBack} handleSum={handlesum}  saveData={saveData} updatebackenddata={updatebackenddata} success={success} err={err}/>;
            }
      case 4:
        if (teamMembers !== 2) {
          return <PlayerInfo playerNumber={2} event={teamMembers} key={playerNumber} playerdata = {player2data} handleBack={handleBack} handleNext={handleNext} saveData={saveData} updatebackenddata={updatebackenddata} err={err}/>;
        }
        else{
          return <PlayerInfo playerNumber={2} event={teamMembers} key={playerNumber} playerdata = {player2data} handleBack={handleBack} handleSum={handlesum}  saveData={saveData} updatebackenddata={updatebackenddata} success={success} err={err}/>;
        }
        
      case 5:
        if (teamMembers !== 3) {
          return <PlayerInfo playerNumber={3} event={teamMembers} key={playerNumber} playerdata = {player3data} handleBack={handleBack} handleNext={handleNext} saveData={saveData} updatebackenddata={updatebackenddata} err={err}/>;
        }
        else{
          return <PlayerInfo playerNumber={3} event={teamMembers} key={playerNumber} playerdata = {player3data} handleBack={handleBack} handleSum={handlesum}  saveData={saveData} updatebackenddata={updatebackenddata} success={success} err={err}/>;
        }
      case 6:
        if (teamMembers !== 4) {
          return <PlayerInfo playerNumber={4} event={teamMembers} key={playerNumber} playerdata = {player4data} handleBack={handleBack} handleNext={handleNext} saveData={saveData} updatebackenddata={updatebackenddata} err={err}/>;
        }
        else{
          return <PlayerInfo playerNumber={4} event={teamMembers} key={playerNumber} playerdata = {player4data} handleBack={handleBack} handleSum={handlesum}  saveData={saveData} updatebackenddata={updatebackenddata} success={success} err={err}/>;
        }
      
      default:
      return null;
    }
  };
  




return (
  <>
    <div className="registration-main">
      {sum === false ? (
        <div className={`registration-section ${currentScreen === "rules" ? "expand" : ""}`}>
          {renderScreen(currentScreen)}
          {currentScreen === 3 && selectedEvent === "Recoil" && (
            <div className="registration-rules">
              <h4>RULES AND INSTRUCTIONS</h4>
              <ol>
                <li>Each team must consist of 5 core members, with an optional 6th player for added flexibility.</li>
                <li>While you're welcome to bring your own peripherals to the venues, please note that they will be at your own responsibility.</li>
                <li>Please ensure that all information provided in this form is accurate and legitimate. Any inaccuracies discovered will result in the cancellation of your application.</li>
                <li>It is mandatory that all participants within a team belong to the same college or university to maintain fairness and integrity.</li>
                <li>Participants are encouraged to foster teamwork and camaraderie throughout the event to enhance the overall experience.</li>
                <li>Ensure a memorable experience by participating actively and engaging with fellow participants and organizers.</li>
                <li>Your feedback and suggestions are highly valued as we strive to improve future events and provide the best experience for all participants.</li>
              </ol>
            </div>
          )}
          {currentScreen === 3 && (selectedEvent === "HotDrop" || selectedEvent === "Booyah") && (
            <div className="registration-rules">
              <h4>RULES AND INSTRUCTIONS</h4>
              <ol>
                <li>Each team must consist of 4 core members, with an optional 5th player for added flexibility.</li>
                <li>All participants must ensure they come equipped with their own mobile devices for the event.</li>
                <li>While you're welcome to bring your own peripherals to the venues, please note that they will be at your own responsibility.</li>
                <li>Please ensure that all information provided in this form is accurate and legitimate. Any inaccuracies discovered will result in the cancellation of your application.</li>
                <li>It is mandatory that all participants within a team belong to the same college or university to maintain fairness and integrity.</li>
                <li>Participants are encouraged to foster teamwork and camaraderie throughout the event to enhance the overall experience.</li>
                <li>Ensure a memorable experience by participating actively and engaging with fellow participants and organizers.</li>
                <li>Your feedback and suggestions are highly valued as we strive to improve future events and provide the best experience for all participants.</li>
              </ol>
            </div>
          )}
          {currentScreen === 3 && (selectedEvent === "Toykathon") && (
            <div className="registration-rules">
              <h4>RULES AND INSTRUCTIONS</h4>
              <ol>
                <li>All participants must ensure they come equipped with their own mobile devices for the event.</li>
                <li>While you're welcome to bring your own peripherals to the venues, please note that they will be at your own responsibility.</li>
                <li>Please ensure that all information provided in this form is accurate and legitimate. Any inaccuracies discovered will result in the cancellation of your application.</li>
                <li>It is mandatory that all participants within a team belong to the same college or university to maintain fairness and integrity.</li>
                <li>Participants are encouraged to foster teamwork and camaraderie throughout the event to enhance the overall experience.</li>
                <li>Ensure a memorable experience by participating actively and engaging with fellow participants and organizers.</li>
                <li>Your feedback and suggestions are highly valued as we strive to improve future events and provide the best experience for all participants.</li>
              </ol>
            </div>
          )}
        </div>
      ) : (
        <>
          {success ? (
            <div className="signup-success-main">
              <div className="signup-success-main-core">
                <div className="signup-success-switch__container" id="switch-c2">
                  <h2 className="signup-success-switch__title signup-success-title">Application Submitted!</h2>
                  <p className="signup-success-switch__description signup-success-description">An acknowledgment of your application has been dispatched to your email inbox, along with a unique Application ID for your reference.</p>
                  <p className="signup-success-switch__description signup-success-description">Additionally, we recommend checking your Spam folder for the email to ensure you don't miss any important correspondence.</p>
                  <button className="signup-success-switch__button signup-success-button signup-success-switch-btn" onClick={() => { navigate("/home"); }}>HOME</button>
                </div>
              </div>
            </div>
          ) : (
            <Summary data={data} handleSubmit={handleSubmit} handleBack={handlesBack}/>
          )}
        </>
      )}
    </div>
  </>


  );
  
};

export default Registration;
