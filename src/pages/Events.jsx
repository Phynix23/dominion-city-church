// src/pages/Events.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaClock, FaMapMarkerAlt, FaTag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Events.css';

const events = [
  {
    id: 1,
    title: 'Dominion Night of Glory',
    date: '2024-03-15',
    time: '6:00 PM',
    location: 'Main Auditorium',
    description: 'A special night of worship, prayer, and prophetic impartation with Dr. David Ogbueli.',
    category: 'conference',
    featured: true,
    tags: ['All Services', 'Prayer']
  },
  {
    id: 2,
    title: 'Workforce Empowerment Summit',
    date: '2024-03-22',
    time: '9:00 AM',
    location: 'Conference Hall',
    description: 'Annual training and equipping for all workforce members across all units.',
    category: 'training',
    tags: ['Workforce', 'Training']
  },
  {
    id: 3,
    title: 'The Edge Youth Conference',
    date: '2024-04-05',
    time: '10:00 AM',
    location: 'Youth Centre',
    description: 'Empowering the next generation to take their place in God\'s purpose.',
    category: 'youth',
    tags: ['Youth', 'Conference']
  },
  {
    id: 4,
    title: 'Women of Impact Breakfast',
    date: '2024-04-12',
    time: '8:00 AM',
    location: 'Fellowship Hall',
    description: 'A special gathering for women to connect, share, and be empowered.',
    category: 'women',
    tags: ['Women', 'Fellowship']
  },
  {
    id: 5,
    title: 'Community Outreach Day',
    date: '2024-04-19',
    time: '8:00 AM',
    location: 'Various Locations',
    description: 'Taking the love of Christ to our community through various outreach programs.',
    category: 'outreach',
    tags: ['Outreach', 'Community']
  },
  {
    id: 6,
    title: 'Men of Honour Summit',
    date: '2024-04-26',
    time: '9:00 AM',
    location: 'Main Auditorium',
    description: 'Equipping men to fulfill their God-given mandate in family and society.',
    category: 'men',
    tags: ['Men', 'Summit']
  }
];

const categories = ['all', 'conference', 'training', 'youth', 'women', 'men', 'outreach'];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (eventTitle) => {
    toast.success(`Registration for ${eventTitle} opened! You will receive details via email.`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta name="description" content="Stay updated with all upcoming events, conferences, and programs at Dominion City." />
      </Helmet>

      <main>
        <section className="events-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Upcoming Events</h1>
              <p>Join us for life-changing experiences</p>
            </motion.div>
          </div>
        </section>

        <section className="events-main">
          <div className="container">
            <div className="events-filters">
              <div className="filter-group">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              <div className="search-group">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="events-list">
              {filteredEvents.map((event, index) => {
                const date = formatDate(event.date);
                return (
                  <motion.div
                    key={event.id}
                    className={`event-item ${event.featured ? 'featured' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="event-date-large">
                      <span className="event-day">{date.day}</span>
                      <span className="event-month">{date.month}</span>
                    </div>
                    <div className="event-content">
                      <h3>{event.title}</h3>
                      <div className="event-meta">
                        <span><FaClock /> {event.time}</span>
                        <span><FaMapMarkerAlt /> {event.location}</span>
                      </div>
                      <p>{event.description}</p>
                      <div className="event-tags">
                        {event.tags.map((tag, idx) => (
                          <span key={idx} className="tag"><FaTag /> {tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="event-action">
                      <button
                        className={`btn ${event.featured ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleRegister(event.title)}
                      >
                        {event.featured ? 'Register Now' : 'Learn More'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredEvents.length === 0 && (
              <div className="no-events">
                <p>No events found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Events;