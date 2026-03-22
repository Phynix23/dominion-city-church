// src/components/home/GivingSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaSeedling, FaHeart } from 'react-icons/fa';
import './GivingSection.css';

const givingOptions = [
  {
    icon: <FaHandHoldingHeart />,
    title: 'Tithes & Offerings',
    description: 'Support the vision through your faithful tithes and offerings.',
    link: '/give',
  },
  {
    icon: <FaSeedling />,
    title: 'Seeds & Projects',
    description: 'Sow a seed into specific projects and kingdom assignments.',
    link: '/give',
  },
  {
    icon: <FaHeart />,
    title: 'Benevolence',
    description: 'Touch lives through our outreach and compassion initiatives.',
    link: '/give',
  },
];

const GivingSection = () => {
  return (
    <section className="giving-section" id="give">
      <div className="container">
        <div className="giving-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Partner With Us</h2>
            <p>Your generous giving helps us reach more lives, raise leaders, and impact generations.</p>
          </motion.div>

          <div className="giving-options">
            {givingOptions.map((option, index) => (
              <motion.div
                key={index}
                className="giving-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="giving-icon">{option.icon}</div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <Link to={option.link} className="btn btn-primary">Give Now</Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bank-details"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Bank Transfer Details</h4>
            <p><strong>Account Name:</strong> Dominion City Church</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Bank:</strong> First Bank of Nigeria</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GivingSection;