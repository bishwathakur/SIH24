// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import vid from '../assets/new.mp4'; // Import the video file
const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{backgroundColor:'#070808'}}>
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={vid} 
        autoPlay 
        loop 
        muted 
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-7xl mt-20 font-bold max-w-4xl">
        Bird Vs Drone Classifier

        </h1>
        <p className="text-white text-lg mt-20 ml-24 mr-24">
          Wanna know whether that tiny speck in the sky is a feathered friend or an unmanned craft?<br></br>Our efficiently trained and precise ml-model classifies between birds and drones based on micro-Doppler radar signals.<br></br>Get ready to decode the skies and discover who’s really soaring above! 
        </p>
        <Link 
          to="/filepage"
          className="bg-black text-neon-green px-6 py-3 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300 mt-4 inline-block text-center"
        >
          Go to File Page
        </Link>
      </div>
    </div>
  );
};

export default Home;


