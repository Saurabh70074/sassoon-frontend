import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Header.css'; // Style this file for header-specific styles
import logo from '../../images/sassoon-academy-logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('sassoontoken');

    // Redirect to the login page
    navigate('/login');
  };
  return (
    <header className="header">
   <img 
        src={logo}
        alt="logo" 
        className="logo-image" 
      />
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;