// src/pages/Ministries.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import {
  FaMusic, FaVideo, FaHandPaper, FaChild, FaPray, FaHeart,
  FaShieldAlt, FaUtensils, FaHandsHelping, FaUsers
} from 'react-icons/fa';
import './Ministries.css';

const ministries = [
  {
    id: 1,
    name: 'Worship Team',
    icon: <FaMusic />,
    description: 'Lead the congregation into God\'s presence through music and song.',
    members: 45,
    meeting: 'Sat 3pm',
    category: 'worship',
    requirements: [
      'Must be a committed member for at least 6 months',
      'Must have musical skill (instrument/vocal)',
      'Must attend weekly rehearsals',
      'Must have a servant\'s heart'
    ]
  },
  {
    id: 2,
    name: 'Media & Technical',
    icon: <FaVideo />,
    description: 'Behind-the-scenes heroes managing sound, lights, and broadcast.',
    members: 30,
    meeting: 'Thu 5pm',
    category: 'technical',
    requirements: [
      'Technical aptitude or willingness to learn',
      'Ability to work under pressure',
      'Team player',
      'Available for all services'
    ]
  },
  {
    id: 3,
    name: 'Ushering & Protocol',
    icon: <FaHandPaper />,
    description: 'Create a warm, welcoming atmosphere with excellence and order.',
    members: 60,
    meeting: 'Sun 8am',
    category: 'hospitality',
    requirements: [
      'Friendly and welcoming demeanor',
      'Punctuality and reliability',
      'Good communication skills',
      'Professional appearance'
    ]
  },
  {
    id: 4,
    name: 'Children\'s Ministry',
    icon: <FaChild />,
    description: 'Nurture the next generation in the ways of the Lord.',
    members: 35,
    meeting: 'Wed 4pm',
    category: 'children',
    requirements: [
      'Love for children',
      'Patience and creativity',
      'Background check required',
      'Teaching ability'
    ]
  },
  {
    id: 5,
    name: 'Prayer & Intercession',
    icon: <FaPray />,
    description: 'Stand in the gap through prayer and spiritual warfare.',
    members: 50,
    meeting: 'Mon-Fri 5am',
    category: 'prayer',
    requirements: [
      'Consistent prayer life',
      'Ability to wake up for early prayers',
      'Spiritual maturity',
      'Filled with the Holy Spirit'
    ]
  },
  {
    id: 6,
    name: 'Outreach & Missions',
    icon: <FaHeart />,
    description: 'Take the love of Christ beyond our walls to communities.',
    members: 40,
    meeting: 'Sat 8am',
    category: 'outreach',
    requirements: [
      'Compassionate heart',
      'Available on Saturdays',
      'Good interpersonal skills',
      'Willingness to serve anywhere'
    ]
  },
  {
    id: 7,
    name: 'Security Team',
    icon: <FaShieldAlt />,
    description: 'Ensure a safe and secure environment for worship.',
    members: 25,
    meeting: 'Sat 10am',
    category: 'security',
    requirements: [
      'Physically fit',
      'Alert and observant',
      'Calm under pressure',
      'Security training provided'
    ]
  },
  {
    id: 8,
    name: 'Hospitality',
    icon: <FaUtensils />,
    description: 'Serve with love through refreshments and visitor care.',
    members: 20,
    meeting: '1st Sun',
    category: 'hospitality',
    requirements: [
      'Warm and welcoming',
      'Attention to detail',
      'Food handling certification',
      'Team player'
    ]
  },
  {
    id: 9,
    name: 'Counselling Ministry',
    icon: <FaHandsHelping />,
    description: 'Provide biblical counsel and support to those in need.',
    members: 15,
    meeting: 'By appointment',
    category: 'counselling',
    requirements: [
      'Biblical knowledge',
      'Training in counselling',
      'Confidentiality',
      'Emotional maturity'
    ]
  }
];

const categories = ['all', 'worship', 'technical', 'hospitality', 'children', 'prayer', 'outreach', 'security', 'counselling'];

const Ministries = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ministry: '',
    testimony: '',
    agree: false
  });

  const filteredMinistries = ministries.filter(
    (ministry) => activeCategory === 'all' || ministry.category === activeCategory
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error('Please confirm that you have been a member for at least 3 months');
      return;
    }
    toast.success('Application submitted successfully! We will contact you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ministry: '',
      testimony: '',
      agree: false
    });
    setSelectedMinistry(null);
  };

  return (
    <>
      <Helmet>
        <title>Ministries & Workforce</title>
        <meta name="description" content="Discover various ministries and workforce units at Dominion City where you can serve and make an impact." />
      </Helmet>

      <main>
        <section className="ministries-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Our Ministries & Workforce</h1>
              <p>Find your place to serve and make an eternal impact</p>
            </motion.div>
          </div>
        </section>

        <section className="ministries-main">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Serve With Purpose</span>
              <h2>Workforce Departments</h2>
              <p>Every member is a minister. Discover where God is calling you to serve.</p>
            </div>

            <div className="ministries-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <motion.div className="ministries-list" layout>
              <AnimatePresence>
                {filteredMinistries.map((ministry) => (
                  <motion.div
                    key={ministry.id}
                    className="ministry-card-large"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="ministry-icon-large">{ministry.icon}</div>
                    <div className="ministry-info">
                      <h3>{ministry.name}</h3>
                      <p>{ministry.description}</p>
                      <div className="ministry-meta">
                        <span><FaUsers /> {ministry.members} Members</span>
                        <span><FaPray /> {ministry.meeting}</span>
                      </div>
                      <button
                        className="btn btn-outline"
                        onClick={() => setSelectedMinistry(selectedMinistry === ministry.id ? null : ministry.id)}
                      >
                        {selectedMinistry === ministry.id ? 'Hide Requirements' : 'View Requirements'}
                      </button>
                      <AnimatePresence>
                        {selectedMinistry === ministry.id && (
                          <motion.div
                            className="requirements-list"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4>Requirements:</h4>
                            <ul>
                              {ministry.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="join-workforce">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Serve?</h2>
              <p>Fill out the form below and our workforce coordinator will contact you.</p>
            </motion.div>

            <motion.form
              className="join-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <select
                  name="ministry"
                  value={formData.ministry}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Ministry Area</option>
                  {ministries.map(ministry => (
                    <option key={ministry.id} value={ministry.name}>{ministry.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name="testimony"
                  rows="4"
                  placeholder="Tell us about yourself and why you want to serve..."
                  value={formData.testimony}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleInputChange}
                    required
                  />
                  I have been a member for at least 3 months
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Submit Application</button>
            </motion.form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Ministries;