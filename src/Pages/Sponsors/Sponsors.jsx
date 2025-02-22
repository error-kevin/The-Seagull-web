// Sponsors.js

import React from 'react';
import './Sponsors.css';
import sponsorImages from './Sponsorimages'; // Import sponsorImages from the new file

const numberOfRows = 2; 
const imagesPerRow = 5;

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const rowsOfImages = chunkArray(sponsorImages, imagesPerRow).slice(0, numberOfRows);

const Sponsors = () => {
    return (
        <div className="sponsors-parent">
            <h1 className="sponsors-head">Our Partners</h1>
            <div className="sponsors-logoparent">
                {rowsOfImages.map((row, rowIndex) => (
                <div key={rowIndex} className="sponsors-row">
                    {row.map((image, index) => (
                    <img
                        key={index}
                        src={image.imageurl}
                        alt={`Sponsor ${index} ${image.alt}`}
                        className="sponsors-logo"
                        onClick={() => window.open(image.onClickLink, '_blank')}
                    />
                    
                    ))}
                </div>
                ))}
            </div>
            
        </div>
  );
};

export default Sponsors;
