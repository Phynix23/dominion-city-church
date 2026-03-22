// src/components/home/SermonsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaDownload, FaShare } from 'react-icons/fa';
import './SermonsSection.css';

const sermons = [
  {
    id: 1,
    title: 'The Power of Dominion',
    preacher: 'Dr. David Ogbueli',
    date: 'Mar 10, 2024',
    thumbnail: '/images/sermons/sermon-1.jpg',
  },
  {
    id: 2,
    title: 'Raising Kingdom Leaders',
    preacher: 'Pastor Sarah Ogbueli',
    date: 'Mar 3, 2024',
    thumbnail: '/images/sermons/sermon-2.jpg',
  },
  {
    id: 3,
    title: 'Faith That Moves Mountains',
    preacher: 'Pastor Shola Olapade',
    date: 'Feb 25, 2024',
    thumbnail: '/images/sermons/sermon-3.jpg',
  },
];

const SermonsSection = () => {
  return (
    <section className="sermons-section" id="sermons">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">The Word</span>
          <h2>Latest Sermons</h2>
        </div>

        <div className="sermons-grid">
          {sermons.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              className="sermon-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="sermon-thumbnail">
                <img src={sermon.thumbnail} alt={sermon.title} />
                <div className="play-overlay">
                  <FaPlay />
                </div>
              </div>
              <div className="sermon-content">
                <h3>{sermon.title}</h3>
                <p className="sermon-meta">
                  {sermon.preacher} | {sermon.date}
                </p>
                <div className="sermon-actions">
                  <button className="btn-icon">
                    <FaPlay /> Watch
                  </button>
                  <button className="btn-icon">
                    <FaDownload />
                  </button>
                  <button className="btn-icon">
                    <FaShare />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="sermons-footer">
          <Link to="/sermons" className="btn btn-outline">Watch More Sermons</Link>
        </div>
      </div>
    </section>
  );
};

export default SermonsSection;