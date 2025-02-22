import React from 'react';
import Lottie from 'react-lottie';

// Import the JSON file of your Lottie animation

function MyLottieAnimation({ src ,height,width}) {
  // Define default options for the Lottie animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: src, // Use the 'src' prop as the animation data
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
        <Lottie 
            options={defaultOptions}
            height={height}
            width={width}
        />
        </div>
    );
}

export default MyLottieAnimation;
