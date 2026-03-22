// src/components/home/MinistriesSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaMusic,
  FaVideo,
  FaHandPaper,
  FaChild,
  FaPray,
  FaHeart,
  FaShieldAlt,
  FaUtensils,
} from 'react-icons/fa';
import './MinistriesSection.css';

const ministries = [
  {
    id: 1,
    name: 'Worship Team',
    icon: <FaMusic />,
    description: 'Lead the congregation into God\'s presence through music and song.',
    members: 45,
    meeting: 'Sat 3pm',
    category: 'worship',
  },
  {
    id: 2,
    name: 'Media & Technical',
    icon: <FaVideo />,
    description: 'Behind-the-scenes heroes managing sound, lights, and broadcast.',
    members: 30,
    meeting: 'Thu 5pm',
    category: 'technical',
  },
  {
    id: 3,
    name: 'Ushering & Protocol',
    icon: <FaHandPaper />,
    description: 'Create a warm, welcoming atmosphere with excellence and order.',
    members: 60,
    meeting: 'Sun 8am',
    category: 'hospitality',
  },
  {
    id: 4,
    name: 'Children\'s Ministry',
    icon: <FaChild />,
    description: 'Nurture the next generation in the ways of the Lord.',
    members: 35,
    meeting: 'Wed 4pm',
    category: 'children',
  },
  {
    id: 5,
    name: 'Prayer & Intercession',
    icon: <FaPray />,
    description: 'Stand in the gap through prayer and spiritual warfare.',
    members: 50,
    meeting: 'Mon-Fri 5am',
    category: 'prayer',
  },
  {
    id: 6,
    name: 'Outreach & Missions',
    icon: <FaHeart />,
    description: 'Take the love of Christ beyond our walls to communities.',
    members: 40,
    meeting: 'Sat 8am',
    category: 'outreach',
  },
  {
    id: 7,
    name: 'Security Team',
    icon: <FaShieldAlt />,
    description: 'Ensure a safe and secure environment for worship.',
    members: 25,
    meeting: 'Sat 10am',
    category: 'security',
  },
  {
    id: 8,
    name: 'Hospitality',
    icon: <FaUtensils />,
    description: 'Serve with love through refreshments and visitor care.',
    members: 20,
    meeting: '1st Sun',
    category: 'hospitality',
  },
];

const categories = ['all', 'worship', 'technical', 'hospitality', 'children', 'prayer', 'outreach'];

const MinistriesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMinistries = ministries.filter(
    (ministry) => activeCategory === 'all' || ministry.category === activeCategory
  );

  return (
    <section className="ministries-section" id="ministries">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Serving With Purpose</span>
          <h2>Our Ministries & Workforce</h2>
          <p className="section-description">Every member is a minister. Discover where you can serve and make an impact.</p>
        </div>

        <div className="ministries-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <motion.div className="ministries-grid" layout>
          <AnimatePresence>
            {filteredMinistries.map((ministry) => (
              <motion.div
                key={ministry.id}
                className="ministry-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <div className="ministry-icon">{ministry.icon}</div>
                <h3>{ministry.name}</h3>
                <p>{ministry.description}</p>
                <div className="ministry-details">
                  <span>
                    <i className="fas fa-users"></i> {ministry.members} Members
                  </span>
                  <span>
                    <i className="fas fa-clock"></i> {ministry.meeting}
                  </span>
                </div>
                <Link to="/ministries" className="btn-link">
                  Join Team <i className="fas fa-arrow-right"></i>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="workforce-cta">
          <h3>Ready to Serve?</h3>
          <p>Fill out our workforce interest form and we'll connect you with the right team.</p>
          <Link to="/ministries" className="btn btn-primary">
            Join the Workforce
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;