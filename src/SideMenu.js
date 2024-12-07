import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="navbar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/calculator">Calculator</Link></li>
        <li><Link to="/saved-itinerary">Saved Itinerary</Link></li>
        <li><Link to="/hotels">Manage Hotels</Link></li>
        <li><Link to="/services">Manage Services</Link></li>
        <li><Link to="/customize-document">Customize Document</Link></li>
      </ul>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default SideMenu;