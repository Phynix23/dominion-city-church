import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    // Load all content from localStorage and static data
    const events = JSON.parse(localStorage.getItem('admin_events') || '[]');
    const sermons = JSON.parse(localStorage.getItem('admin_sermons') || '[]');
    const testimonies = JSON.parse(localStorage.getItem('admin_testimonies') || '[]');
    
    // Static content
    const staticContent = [
      { type: 'page', title: 'Home', path: '/', content: 'Welcome to Dominion City' },
      { type: 'page', title: 'About Us', path: '/about', content: 'Our story and beliefs' },
      { type: 'page', title: 'Ministries', path: '/ministries', content: 'Church ministries' },
      { type: 'page', title: 'Events', path: '/events', content: 'Upcoming events' },
      { type: 'page', title: 'Sermons', path: '/sermons', content: 'Latest messages' },
      { type: 'page', title: 'Give', path: '/give', content: 'Support the vision' },
      { type: 'page', title: 'Contact', path: '/contact', content: 'Get in touch' }
    ];
    
    const formattedEvents = events.map(e => ({ ...e, type: 'event', path: '/events' }));
    const formattedSermons = sermons.map(s => ({ ...s, type: 'sermon', path: '/sermons' }));
    const formattedTestimonies = testimonies.map(t => ({ ...t, type: 'testimony', path: '/' }));
    
    setAllContent([...staticContent, ...formattedEvents, ...formattedSermons, ...formattedTestimonies]);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    
    const searchResults = allContent.filter(item => 
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.content?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
    
    setResults(searchResults);
  }, [query, allContent]);

  const getIcon = (type) => {
    switch(type) {
      case 'event': return '📅';
      case 'sermon': return '🎥';
      case 'testimony': return '🙏';
      default: return '📄';
    }
  };

  return (
    <>
      <button className="search-trigger" onClick={() => setIsOpen(true)}>
        <FaSearch />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="search-container"
              initial={{ scale: 0.9, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="search-header">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search sermons, events, pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button onClick={() => setIsOpen(false)}><FaTimes /></button>
              </div>
              
              <div className="search-results">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <Link
                      key={index}
                      to={result.path}
                      onClick={() => setIsOpen(false)}
                      className="search-result-item"
                    >
                      <span className="result-icon">{getIcon(result.type)}</span>
                      <div className="result-content">
                        <h4>{result.title}</h4>
                        <p>{result.description?.substring(0, 100) || result.content?.substring(0, 100)}</p>
                        <span className="result-type">{result.type}</span>
                      </div>
                    </Link>
                  ))
                ) : query.length >= 2 ? (
                  <div className="no-results">No results found for "{query}"</div>
                ) : (
                  <div className="search-hint">Type at least 2 characters to search</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .search-trigger {
          background: none;
          border: none;
          color: var(--text-light);
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          transition: color 0.3s ease;
        }
        
        .search-trigger:hover {
          color: var(--primary-blue);
        }
        
        .search-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(5px);
          z-index: 2000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
        }
        
        .search-container {
          width: 90%;
          max-width: 700px;
          background: var(--dark-bg);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--primary-blue);
        }
        
        .search-header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .search-header svg {
          color: var(--primary-blue);
          margin-right: 15px;
        }
        
        .search-header input {
          flex: 1;
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          outline: none;
        }
        
        .search-header button {
          background: none;
          border: none;
          color: var(--text-gray);
          cursor: pointer;
          font-size: 20px;
        }
        
        .search-results {
          max-height: 500px;
          overflow-y: auto;
        }
        
        .search-result-item {
          display: flex;
          gap: 15px;
          padding: 15px 20px;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.3s ease;
        }
        
        .search-result-item:hover {
          background: rgba(65, 105, 225, 0.1);
        }
        
        .result-icon {
          font-size: 24px;
        }
        
        .result-content h4 {
          color: var(--text-light);
          margin-bottom: 5px;
        }
        
        .result-content p {
          color: var(--text-gray);
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .result-type {
          color: var(--primary-blue);
          font-size: 12px;
          text-transform: uppercase;
        }
        
        .no-results, .search-hint {
          padding: 40px;
          text-align: center;
          color: var(--text-gray);
        }
      `}</style>
    </>
  );
};

export default GlobalSearch;