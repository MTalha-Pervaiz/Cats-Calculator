import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/calculator" onClick={toggleMenu}>Calculator</Link></li>
          <li><Link to="/saved-itinerary" onClick={toggleMenu}>Saved Itinerary</Link></li>
          <li><Link to="/hotels" onClick={toggleMenu}>Manage Hotels</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>Manage Services</Link></li>
          <li><Link to="/customize-document" onClick={toggleMenu}>Customize Document</Link></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </>
  );
};

export default SideMenu;