import React from 'react';
import './Pagenotfound.css';
import pnf from '../../assets/404.svg'

const Pagenotfound = () => {
  return (
    <div className='pnf-main'>
      <div className='pnf-core'>
        <img src={pnf} alt=''/>
      </div>
    </div>
  );
};

export default Pagenotfound;
