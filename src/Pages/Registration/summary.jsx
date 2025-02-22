import React, { useState } from 'react';
import './summary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import player_img from '../../assets/Team images/sampleimg.png';

const Summary = ({ handleSubmit , handleBack , data}) => {
  // const data = {game:"Cinephilia",name4:"asd ",name5:" h",name6:" a"}
  const [submitLoading, setSubmitLoading] = useState(false);

  const [playerStates, setPlayerStates] = useState(() => {
    return Array.from({ length: data.game === "Recoil" ? 6 :data.game === "Encode" ? 2 :data.game === "Qurious" ? 2 : data.game === "Monochrome" ? 1 :data.game === "PixelPerfect" ? 1 : data.game === "Cinephilia" ? 3 : 1 }, () => false);
  });

  const toggleCollapse = (index) => {
    setPlayerStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const handleButtonClick = () => {
    handleSubmit();
    setSubmitLoading(true);
  };
  const handledataBack = () => {
    handleBack();
  };
  
  const generatePlayerCard = (playerIndex, playerStates, data) => (
    <div key={playerIndex} className='summary-player-card'>
      <div className='summary-player-card-title'>
        <div className='summary-title-container'>
          <h3 className='summary-player-card-name'>Player - {playerIndex}</h3>
          {/* <h3 className='summary-player-card-name'>{data[`name${playerIndex}`]}</h3> */}
        </div>
        <FontAwesomeIcon
          className="logos"
          icon={playerStates[playerIndex] ? faChevronUp : faChevronDown}
          onClick={() => toggleCollapse(playerIndex)}
        />
      </div>
        {playerStates[playerIndex] && (
          <div className='summary-player-card-core'>
            
            <div className='summary-player-card-data'>
              <div className='summary-player-card-data-container'><p>Name:</p><input className='summary-input' value={data[`name${playerIndex}`]} readOnly /></div>
              <div className='summary-player-card-data-container'><p>Email:</p><input className='summary-input' value={data[`email${playerIndex}`]} readOnly /></div>
              <div className='summary-player-card-data-container'><p>Contact Number:</p>
              <input className='summary-input' value={data[`contact${playerIndex}`]} readOnly /></div>
            </div>
            
          </div>
        )}
      </div>
  );
  
  const playerSections = (() => {
    let numberOfPlayers = data.teammembers
    return Array.from({ length: numberOfPlayers }, (_, i) => i + 1).map((playerIndex) => 
      generatePlayerCard(playerIndex, playerStates, data)
    );
  })();

    return (
      <div className='summary-main'>
        <div className='summary-left'>
          <h1>Registration Summary</h1>
          <div className='summary-cards-container'>
            {playerSections}
          </div>
          

          <div className='summary-btn-container'>
            <input className="registration-submit-btn save-btn" onClick={handledataBack} type="button" value="Back" />
            <button 
              className="home-cssbuttons-io-button" 
              onClick={handleButtonClick}
              disabled={submitLoading} // Set disabled attribute based on submitLoading state
            >
              SUBMIT
              {submitLoading ? (
              <div className="home-icon home-icon-loading">
                <div class="loader">
                  <div class="justify-content-center jimu-primary-loading"></div>
                </div>
              </div>
              ):(
                <div className="home-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                </svg>
              </div>
              )}
            </button>
            
          </div>
          
        </div>
        
      </div>
    );
    
}

export default Summary;
