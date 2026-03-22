// src/pages/Sermons.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaPlay, FaDownload, FaShare, FaHeadphones, FaCalendar, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Sermons.css';

const sermons = [
  {
    id: 1,
    title: 'The Power of Dominion',
    preacher: 'Dr. David Ogbueli',
    date: '2024-03-10',
    thumbnail: '/images/sermons/sermon-1.jpg',
    series: 'Dominion Life',
    duration: '45:32',
    videoUrl: 'https://www.youtube.com/embed/example1',
    audioUrl: '#',
    description: 'Understanding your authority in Christ and how to walk in dominion.'
  },
  {
    id: 2,
    title: 'Raising Kingdom Leaders',
    preacher: 'Pastor Sarah Ogbueli',
    date: '2024-03-03',
    thumbnail: '/images/sermons/sermon-2.jpg',
    series: 'Leadership Series',
    duration: '52:18',
    videoUrl: 'https://www.youtube.com/embed/example2',
    audioUrl: '#',
    description: 'Discovering the principles of raising leaders who will impact generations.'
  },
  {
    id: 3,
    title: 'Faith That Moves Mountains',
    preacher: 'Pastor Shola Olapade',
    date: '2024-02-25',
    thumbnail: '/images/sermons/sermon-3.jpg',
    series: 'Faith Foundations',
    duration: '38:45',
    videoUrl: 'https://www.youtube.com/embed/example3',
    audioUrl: '#',
    description: 'Building unshakeable faith that produces extraordinary results.'
  },
  {
    id: 4,
    title: 'The Spirit of Wisdom',
    preacher: 'Dr. David Ogbueli',
    date: '2024-02-18',
    thumbnail: '/images/sermons/sermon-4.jpg',
    series: 'Wisdom for Living',
    duration: '55:20',
    videoUrl: 'https://www.youtube.com/embed/example4',
    audioUrl: '#',
    description: 'Accessing the Spirit of wisdom for supernatural success.'
  },
  {
    id: 5,
    title: 'Financial Freedom',
    preacher: 'Pastor John Adekunle',
    date: '2024-02-11',
    thumbnail: '/images/sermons/sermon-5.jpg',
    series: 'Financial Freedom',
    duration: '42:15',
    videoUrl: 'https://www.youtube.com/embed/example5',
    audioUrl: '#',
    description: 'Biblical principles for financial breakthrough and stewardship.'
  },
  {
    id: 6,
    title: 'The Power of Prayer',
    preacher: 'Dr. David Ogbueli',
    date: '2024-02-04',
    thumbnail: '/images/sermons/sermon-6.jpg',
    series: 'Prayer School',
    duration: '48:50',
    videoUrl: 'https://www.youtube.com/embed/example6',
    audioUrl: '#',
    description: 'Unlocking the power of prayer for supernatural results.'
  }
];

const seriesList = ['All Series', 'Dominion Life', 'Leadership Series', 'Faith Foundations', 'Wisdom for Living', 'Financial Freedom', 'Prayer School'];

const Sermons = () => {
  const [selectedSeries, setSelectedSeries] = useState('All Series');
  const [selectedSermon, setSelectedSermon] = useState(sermons[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredSermons = selectedSeries === 'All Series'
    ? sermons
    : sermons.filter(sermon => sermon.series === selectedSeries);

  const handleWatch = (sermon) => {
    setSelectedSermon(sermon);
    setIsPlaying(true);
    toast.info(`Now playing: ${sermon.title}`);
  };

  const handleDownload = (sermon) => {
    toast.success(`Downloading ${sermon.title}...`);
  };

  const handleShare = (sermon) => {
    navigator.clipboard.writeText(window.location.href);
    toast.info('Link copied to clipboard!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>Sermons</title>
        <meta name="description" content="Listen and watch sermons by Dr. David Ogbueli and other ministers at Dominion City." />
      </Helmet>

      <main>
        <section className="sermons-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Sermons & Messages</h1>
              <p>Listen to life-transforming messages anytime, anywhere</p>
            </motion.div>
          </div>
        </section>

        <section className="sermons-player-section">
          <div className="container">
            <div className="featured-player">
              <div className="player-container">
                <iframe
                  src={selectedSermon.videoUrl}
                  title={selectedSermon.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="player-info">
                <h2>{selectedSermon.title}</h2>
                <div className="player-meta">
                  <span><FaUser /> {selectedSermon.preacher}</span>
                  <span><FaCalendar /> {formatDate(selectedSermon.date)}</span>
                  <span>{selectedSermon.duration}</span>
                </div>
                <p>{selectedSermon.description}</p>
                <div className="player-actions">
                  <button className="btn btn-primary" onClick={() => handleDownload(selectedSermon)}>
                    <FaDownload /> Download
                  </button>
                  <button className="btn btn-outline" onClick={() => handleShare(selectedSermon)}>
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sermons-list-section">
          <div className="container">
            <div className="series-tabs">
              {seriesList.map(series => (
                <button
                  key={series}
                  className={`series-tab ${selectedSeries === series ? 'active' : ''}`}
                  onClick={() => setSelectedSeries(series)}
                >
                  {series}
                </button>
              ))}
            </div>

            <div className="sermons-grid">
              <AnimatePresence>
                {filteredSermons.map((sermon, index) => (
                  <motion.div
                    key={sermon.id}
                    className="sermon-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="sermon-thumb">
                      <img src={sermon.thumbnail} alt={sermon.title} />
                      <div className="sermon-overlay" onClick={() => handleWatch(sermon)}>
                        <FaPlay />
                      </div>
                    </div>
                    <div className="sermon-info">
                      <h3>{sermon.title}</h3>
                      <div className="sermon-details">
                        <span><FaUser /> {sermon.preacher}</span>
                        <span><FaCalendar /> {formatDate(sermon.date)}</span>
                      </div>
                      <div className="sermon-actions">
                        <button onClick={() => handleWatch(sermon)}><FaPlay /> Watch</button>
                        <button onClick={() => handleDownload(sermon)}><FaHeadphones /> Audio</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Sermons;