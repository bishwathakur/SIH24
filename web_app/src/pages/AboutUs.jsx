import React from 'react';

const AboutUs = () => {
  const profiles = [
    {
      name: 'Green Kedia',
      role: 'ML Engineer',
      avatar: './src/assets/Green.jpg',
      backdrop: './src/assets/bg-ml.jpeg',
      dept:'Computer Science and Engineering',
      linkedin: 'https://www.linkedin.com/in/green-kedia', // Add LinkedIn URLs
    },
    {
      name: 'Bishwa Thakur',
      role: 'Full Stack App Developer',
      avatar: './src/assets/Bishwa.jpg',
      backdrop: './src/assets/mern-stack.png',
      dept:'Civil Engineering',
      linkedin: 'https://www.linkedin.com/in/bishwa-thakur/',
    },
    {
      name: 'Aditya Aryan',
      role: 'Backend Developer-Web',
      avatar: './src/assets/Aditya.jpg',
      backdrop: './src/assets/mern-stack.png',
      dept:'Electrical Engineering',
      linkedin: 'https://www.linkedin.com/in/aditya-aryan',
    },
    {
      name: 'Daksh Mor',
      role: 'ML Engineer',
      avatar: './src/assets/Daksh.jpg',
      backdrop: './src/assets/bg-ml.jpeg',
      dept:'Computer Science and Engineering',
      linkedin: 'https://www.linkedin.com/in/daksh-mor',
    },
    {
      name: 'Nancy Srivastava',
      role: 'ML Engineer',
      avatar: './src/assets/Nancy.jpg',
      backdrop: './src/assets/bg-ml.jpeg',
      dept:'Electronics and Communication Engineering',
      linkedin: 'https://www.linkedin.com/in/nancy-srivastava',
    },
    {
      name: 'Govind Gangele',
      role: 'Frontend Developer',
      avatar: './src/assets/Govind.jpg',
      backdrop: './src/assets/react.png',
      dept:'Electrical Engineering',
      linkedin: 'https://www.linkedin.com/in/govind-gangele',
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-wrap justify-center items-center pt-28"
      style={{ backgroundColor: '#070808' }}
    >
      <div className="flex flex-wrap justify-center w-full max-w-6xl">
        {profiles.map((profile, index) => (
          <a
            key={index}
            href={profile.linkedin} // Open LinkedIn on click
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // For security
            className="relative flex flex-col justify-start h-[450px] w-[280px] m-4 overflow-hidden bg-black group transition-all duration-500"
            style={{
              borderRadius: '10px',
              padding: '20px',
            }}
          >
            {/* Backdrop Image */}
            <img
              src={profile.backdrop}
              alt="Backdrop"
              className="absolute top-0 left-0 h-[55%] w-full object-cover opacity-70"
            />

            {/* Avatar */}
            <div
              className="h-[110px] w-[110px] rounded-full bg-center bg-cover absolute top-[40%] left-0"
              style={{
                backgroundImage: `url(${profile.avatar})`,
                border: '3px solid #39FF14',
                marginLeft: '15px',
              }}
            ></div>

            {/* Name and Role */}
            <div className="absolute top-[65%] left-5">
              <h1 className="text-md text-white mt-1">{profile.name}</h1>
              <h2 style={{ color: '#39FF14' }} className="text-xs mt-1">{profile.role}</h2>
            </div>

            {/* Hidden paragraph for hover effect */}
            <div className="relative h-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out mt-auto">
              <p className="text-white mt-[16%]">
                Bachelor of technology-{profile.dept}
                <p>IIT ISM Dhanbad</p>
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
