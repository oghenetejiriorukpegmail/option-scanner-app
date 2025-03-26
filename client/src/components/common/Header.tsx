import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Option Scanner App</Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/scanner" className="nav-link">Scanner</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;