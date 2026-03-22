// src/components/home/EventsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './EventsSection.css';

const events = [
  {
    id: 1,
    day: 15,
    month: 'MAR',
    title: 'Dominion Night of Glory',
    time: '6:00 PM',
    location: 'Main Auditorium',
    description: 'A special night of worship, prayer, and prophetic impartation with Dr. David Ogbueli.',
    tags: ['All Services', 'Prayer'],
    featured: true,
  },
  {
    id: 2,
    day: 22,
    month: 'MAR',
    title: 'Workforce Empowerment Summit',
    time: '9:00 AM',
    location: 'Conference Hall',
    description: 'Annual training and equipping for all workforce members across all units.',
    tags: ['Workforce', 'Training'],
    featured: false,
  },
  {
    id: 3,
    day: 5,
    month: 'APR',
    title: 'The Edge Youth Conference',
    time: '10:00 AM',
    location: 'Youth Centre',
    description: 'Empowering the next generation to take their place in God\'s purpose.',
    tags: ['Youth', 'Conference'],
    featured: false,
  },
  {
    id: 4,
    day: 12,
    month: 'APR',
    title: 'Women of Impact Breakfast',
    time: '8:00 AM',
    location: 'Fellowship Hall',
    description: 'A special gathering for women to connect, share, and be empowered.',
    tags: ['Women', 'Fellowship'],
    featured: false,
  },
];

const EventsSection = () => {
  return (
    <section className="events-section" id="events">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Stay Connected</span>
          <h2>Upcoming Events</h2>
        </div>

        <div className="events-calendar">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className={`event-card ${event.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="event-date">
                <span className="date-day">{event.day}</span>
                <span className="date-month">{event.month}</span>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-meta">
                  <FaClock /> {event.time} | <FaMapMarkerAlt /> {event.location}
                </p>
                <p className="event-description">{event.description}</p>
                <div className="event-tags">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="event-action">
                {event.featured ? (
                  <Link to="/events" className="btn btn-outline">Register</Link>
                ) : (
                  <Link to="/events" className="btn-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="events-footer">
          <Link to="/events" className="btn btn-primary">View All Events</Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;