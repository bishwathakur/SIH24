import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scrolling to hide/show navbar
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'transform translate-y-0' : 'transform -translate-y-full'}`}
    >
      <div className="bg-gray-900 bg-opacity-0 text-white h-20">
        <ul className="flex text-2xl flex-row items-center justify-between">
          <div className="absolute left-0 p-4 text-5xl" style={{ fontFamily: "fantasy" }}>
            {/* INVISIBLE EYE */}
          </div>
          <div className="flex flex-1 justify-center">
            <li className="p-2 pr-5 pt-4">
              <Link to="/" className="text-white hover:text-neon-green">Home</Link>
            </li>
            <li className="p-2 pr-5 pt-4">
              <Link to="/about" className="text-white hover:text-neon-green">About us</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

