import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
const apiurl ='https://sih24-8j8v.onrender.com/predict'
import video from '../../src/assets/radar.mp4';

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

function FilePage() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // Reference to the video element
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);

    // Play the video when the button is clicked
    if (videoRef.current) {
      videoRef.current.play();
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(apiurl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      let finalPrediction = response.data.predictions;

      // Mapping the predictions to final output
      if (finalPrediction === '2drone' || finalPrediction === '3drone') {
        finalPrediction = 'Drone';
      } else if (finalPrediction === '2bird' || finalPrediction === '3bird') {
        finalPrediction = 'Bird';
      }

      setPrediction(finalPrediction);
      setError(null);

      // Set images based on finalPrediction
      if (response.data.predictions === '2drone' || response.data.predictions === '2bird') {
        setImages([
          { src: 'https://res.cloudinary.com/dmgwucocs/image/upload/v1727688610/images2d/plot1.jpg', text: 'Time-frequency spectrograms provide a detailed view of how a signals frequency components evolve over time by dividing the signal into short segments, applying a Fourier Transform to each, and plotting the results...' },
          { src: 'https://res.cloudinary.com/dmgwucocs/image/upload/v1727688611/images2d/plot2.jpg', text: 'Cyclic patterns reveal recurring patterns or cycles within the data...' },
        ]);
      } else {
        setImages([
          { src: 'https://res.cloudinary.com/dmgwucocs/image/upload/v1727688610/images/plot1.jpg', text: 'Time-frequency spectrograms provide a detailed view of how a signals frequency components evolve over time...' },
          { src: 'https://res.cloudinary.com/dmgwucocs/image/upload/v1727688611/images/plot2.jpg', text: 'Waveforms and phase information depict a signals amplitude variations and phase changes over time...' },
          { src: 'https://res.cloudinary.com/dmgwucocs/image/upload/v1727688612/images/plot3.jpg', text: 'Frequency shift data tracks how a signals frequency varies over time...' },
          { src: 'https://res.cloudinary.com/dmgwucocs/image/upload/v1727688613/images/plot4.jpg', text: 'Cyclic patterns reveal recurring patterns or cycles within the data...' },
        ]);
      }

      setTimeout(() => {
        setShowAnimation(false);
        setShowImages(true);
      }, 3000);

    } catch (err) {
      setError('Error uploading file');
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  // Pause the video initially when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat py-20 px-6 text-white" style={{ backgroundColor: '#070808' }}>
      <video
        ref={videoRef}  // Reference to the video element
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={video}
        autoPlay
        muted
        loop
      ></video>

      <div className="relative z-10">
        {!showImages ? (
          <>
            <h1 className="text-3xl font-bold mb-6 mt-20 text-center">Upload a Micro Doppler Signature</h1>
            <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-600 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
              />
              <button
                onClick={handleUpload}
                className="w-full bg-neon-green text-white py-2 px-4 rounded hover:bg-neon-green-light"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload and Predict'}
              </button>
              {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
              {prediction && !showAnimation && (
                <p className="mt-4 text-center">It is a {prediction}...</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">{prediction} Micro Doppler based visualisation </h1>
            {images.map((image, index) => (
              <ImageCard key={index} src={image.src} text={image.text} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const ImageCard = ({ src, text }) => {
  const ref = useRef();
  const onScreen = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className={`transition-opacity transition-transform duration-500 ease-out flex items-center mb-12 p-8 rounded-xl bg-gray-900 shadow-2xl transform ${onScreen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100px]'
        } hover:shadow-neon hover:scale-105`} // Added hover effects
      style={{ transition: 'transform 0.3s, box-shadow 0.3s' }} // Smooth transition for hover effects
    >
      <div className="w-1/2 mr-6">
        <img src={src} alt={text} className="w-full h-auto rounded-xl shadow-lg" />
      </div>
      <div className="w-1/2 text-left">
        <p className="text-lg font-semibold text-gray-200 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};


export default FilePage;

