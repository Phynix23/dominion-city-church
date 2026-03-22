// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <h3>Dominion City</h3>
            <p>Raising Leaders, Impacting Generations</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/ministries">Ministries</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/sermons">Sermons</Link></li>
              <li><Link to="/give">Giving</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Ministries</h4>
            <ul>
              <li><Link to="/ministries">Worship Team</Link></li>
              <li><Link to="/ministries">The Edge Youth</Link></li>
              <li><Link to="/ministries">Women of Impact</Link></li>
              <li><Link to="/ministries">Men of Honour</Link></li>
              <li><Link to="/ministries">Children's Church</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><FaMapMarkerAlt /> 23 Dominion Way, Lagos, Nigeria</p>
            <p><FaPhone /> +234 123 456 7890</p>
            <p><FaEnvelope /> info@dominioncity.org</p>

            <div className="service-times">
              <h5>Service Times</h5>
              <p>Sundays: 8:00 AM & 10:00 AM</p>
              <p>Wednesdays: 6:00 PM (Digging Deep)</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Dominion City. All Rights Reserved. | Website by <a href="#">Abuoma David</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;