import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Option Scanner App. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="https://github.com/oghenetejiriorukpegmail/option-scanner-app" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;