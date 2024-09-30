// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './components/Home'; 
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import FilePage from './pages/FilePage'; 


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/filepage" element={<FilePage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;

