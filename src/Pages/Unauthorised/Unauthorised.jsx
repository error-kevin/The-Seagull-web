import React from 'react';
import './Unauthorised.css';
import unauthorised from '../../assets/Unauthorised.jpg'
import { useNavigate} from 'react-router-dom';


const Unauthorised = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div className='unauthorised-main'>
      
      <div className='unauthorised-core'>
        <img className="unauthorised-img" alt="" src={unauthorised}/>
        <button className="unauthorised-goback-button" type='button' onClick={goBack }>Go Back</button>
        
      </div>
    </div>
  )
}

export default Unauthorised







      
    
    