import React from 'react';
import './Pagenotfound.css';

const Pagenotfound = () => {
  return (
    <div className='pagenotfound-main'>
      <div className="unicorn"></div>

      <div className="container">
        <div className="four-oh-four">
          <h1>404 Error</h1>
        </div>

        <div className="warning">
          <h2>"All those moments will be lost in time, like tears in rain."</h2>
          <p>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default Pagenotfound;
