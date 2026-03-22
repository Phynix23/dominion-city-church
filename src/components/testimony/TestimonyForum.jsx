import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaCalendar, FaHeart, FaShare, FaComment, 
  FaThumbsUp, FaFilter, FaSearch, FaTimes, FaStar,
  FaPrayingHands, FaHandsHelping, FaChurch, FaHome
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './TestimonyForum.css';

const TestimonyForum = () => {
  const [testimonies, setTestimonies] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      date: '2024-03-15',
      title: 'Healed from Chronic Illness',
      testimony: 'After 5 years of chronic back pain, God healed me during a Sunday service! I can now walk without pain and serve in the ushering team.',
      category: 'healing',
      likes: 24,
      comments: 8,
      featured: true,
      prayerCount: 12,
      userAvatar: null
    },
    {
      id: 2,
      name: 'Michael Okonkwo',
      date: '2024-03-10',
      title: 'Financial Breakthrough',
      testimony: 'I was about to lose my business when God provided a miracle. A client I had been chasing for 2 years suddenly signed a contract worth ₦5 million!',
      category: 'financial',
      likes: 45,
      comments: 15,
      featured: true,
      prayerCount: 28,
      userAvatar: null
    },
    {
      id: 3,
      name: 'Pastor David Adeleke',
      date: '2024-03-05',
      title: 'Family Restoration',
      testimony: 'My marriage was on the brink of collapse, but through prayers and counseling at Dominion City, God restored our home. We are now stronger than ever!',
      category: 'family',
      likes: 67,
      comments: 23,
      featured: true,
      prayerCount: 35,
      userAvatar: null
    },
    {
      id: 4,
      name: 'Blessing Eze',
      date: '2024-02-28',
      title: 'Delivered from Depression',
      testimony: 'I struggled with depression for years. Through the Digging Deep service and mentorship, God set me free. Now I lead a support group for others.',
      category: 'deliverance',
      likes: 52,
      comments: 18,
      featured: false,
      prayerCount: 22,
      userAvatar: null
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTestimony, setNewTestimony] = useState({
    name: '',
    title: '',
    testimony: '',
    category: 'healing',
    isAnonymous: false,
    agreeToTerms: false
  });
  const [likedTestimonies, setLikedTestimonies] = useState([]);
  const [selectedTestimony, setSelectedTestimony] = useState(null);

  const categories = [
    { id: 'all', name: 'All Testimonies', icon: <FaStar /> },
    { id: 'healing', name: 'Healing', icon: <FaHeart /> },
    { id: 'financial', name: 'Financial', icon: <FaHandsHelping /> },
    { id: 'family', name: 'Family', icon: <FaHome /> },
    { id: 'deliverance', name: 'Deliverance', icon: <FaPrayingHands /> },
    { id: 'career', name: 'Career', icon: <FaChurch /> }
  ];

  useEffect(() => {
    // Load liked testimonies from localStorage
    const savedLikes = localStorage.getItem('likedTestimonies');
    if (savedLikes) {
      setLikedTestimonies(JSON.parse(savedLikes));
    }
  }, []);

  const handleLike = (testimonyId) => {
    if (likedTestimonies.includes(testimonyId)) {
      // Unlike
      setTestimonies(prev => prev.map(t => 
        t.id === testimonyId ? { ...t, likes: t.likes - 1 } : t
      ));
      setLikedTestimonies(prev => prev.filter(id => id !== testimonyId));
      localStorage.setItem('likedTestimonies', JSON.stringify(likedTestimonies.filter(id => id !== testimonyId)));
      toast.info('You removed your like');
    } else {
      // Like
      setTestimonies(prev => prev.map(t => 
        t.id === testimonyId ? { ...t, likes: t.likes + 1 } : t
      ));
      setLikedTestimonies(prev => [...prev, testimonyId]);
      localStorage.setItem('likedTestimonies', JSON.stringify([...likedTestimonies, testimonyId]));
      toast.success('Thank you for encouraging this testimony!');
    }
  };

  const handleSubmitTestimony = (e) => {
    e.preventDefault();
    
    if (!newTestimony.agreeToTerms) {
      toast.error('Please agree to the terms before submitting');
      return;
    }

    const testimony = {
      id: Date.now(),
      name: newTestimony.isAnonymous ? 'Anonymous' : newTestimony.name,
      date: new Date().toISOString().split('T')[0],
      title: newTestimony.title,
      testimony: newTestimony.testimony,
      category: newTestimony.category,
      likes: 0,
      comments: 0,
      featured: false,
      prayerCount: 0,
      userAvatar: null
    };

    setTestimonies([testimony, ...testimonies]);
    setShowForm(false);
    setNewTestimony({
      name: '',
      title: '',
      testimony: '',
      category: 'healing',
      isAnonymous: false,
      agreeToTerms: false
    });
    toast.success('Testimony submitted! It will be reviewed and published soon.');
  };

  const handlePray = (testimonyId) => {
    setTestimonies(prev => prev.map(t => 
      t.id === testimonyId ? { ...t, prayerCount: t.prayerCount + 1 } : t
    ));
    toast.success('Prayer offered for this testimony!');
  };

  const handleShare = async (testimony) => {
    const shareData = {
      title: testimony.title,
      text: `Read this testimony from Dominion City: ${testimony.title}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        // Copy to clipboard as fallback
        navigator.clipboard.writeText(`${testimony.title}\n\n${testimony.testimony}\n\nShared from Dominion City Church`);
        toast.info('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(`${testimony.title}\n\n${testimony.testimony}\n\nShared from Dominion City Church`);
      toast.info('Link copied to clipboard!');
    }
  };

  const filteredTestimonies = testimonies.filter(testimony => {
    const matchesCategory = selectedCategory === 'all' || testimony.category === selectedCategory;
    const matchesSearch = testimony.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimony.testimony.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimony.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTestimonies = filteredTestimonies.filter(t => t.featured);
  const regularTestimonies = filteredTestimonies.filter(t => !t.featured);

  return (
    <section className="testimony-forum">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Share Your Story</span>
          <h2>Testimony Forum</h2>
          <p>What has God done for you? Share your testimony to encourage others!</p>
        </div>

        {/* Action Buttons */}
        <div className="testimony-actions">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Share Your Testimony
          </button>
        </div>

        {/* Search and Filter */}
        <div className="testimony-filters">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search testimonies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Testimonies */}
        {featuredTestimonies.length > 0 && (
          <div className="featured-section">
            <h3>Featured Testimonies</h3>
            <div className="featured-grid">
              {featuredTestimonies.map(testimony => (
                <TestimonyCard
                  key={testimony.id}
                  testimony={testimony}
                  isLiked={likedTestimonies.includes(testimony.id)}
                  onLike={() => handleLike(testimony.id)}
                  onPray={() => handlePray(testimony.id)}
                  onShare={() => handleShare(testimony)}
                  onView={() => setSelectedTestimony(testimony)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Testimonies */}
        <div className="testimonies-grid">
          {regularTestimonies.map(testimony => (
            <TestimonyCard
              key={testimony.id}
              testimony={testimony}
              isLiked={likedTestimonies.includes(testimony.id)}
              onLike={() => handleLike(testimony.id)}
              onPray={() => handlePray(testimony.id)}
              onShare={() => handleShare(testimony)}
              onView={() => setSelectedTestimony(testimony)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTestimonies.length === 0 && (
          <div className="empty-state">
            <FaStar />
            <h3>No testimonies found</h3>
            <p>Be the first to share what God has done for you!</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Share Your Testimony
            </button>
          </div>
        )}
      </div>

      {/* Submit Testimony Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowForm(false)}>
                <FaTimes />
              </button>
              <h3>Share Your Testimony</h3>
              <p>Tell us what God has done in your life</p>

              <form onSubmit={handleSubmitTestimony}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newTestimony.name}
                    onChange={(e) => setNewTestimony({ ...newTestimony, name: e.target.value })}
                    required={!newTestimony.isAnonymous}
                    disabled={newTestimony.isAnonymous}
                  />
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={newTestimony.isAnonymous}
                      onChange={(e) => setNewTestimony({ ...newTestimony, isAnonymous: e.target.checked })}
                    />
                    Post anonymously
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Testimony Title"
                    value={newTestimony.title}
                    onChange={(e) => setNewTestimony({ ...newTestimony, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    value={newTestimony.category}
                    onChange={(e) => setNewTestimony({ ...newTestimony, category: e.target.value })}
                    required
                  >
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    rows="6"
                    placeholder="Share your testimony..."
                    value={newTestimony.testimony}
                    onChange={(e) => setNewTestimony({ ...newTestimony, testimony: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={newTestimony.agreeToTerms}
                      onChange={(e) => setNewTestimony({ ...newTestimony, agreeToTerms: e.target.checked })}
                      required
                    />
                    I confirm that this testimony is true and agree to share it publicly
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Submit Testimony
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Testimony Modal */}
      <AnimatePresence>
        {selectedTestimony && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimony(null)}
          >
            <motion.div
              className="modal-content modal-large"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedTestimony(null)}>
                <FaTimes />
              </button>
              <div className="testimony-detail">
                <div className="testimony-header">
                  <div className="testimony-author">
                    <FaUser />
                    <span>{selectedTestimony.name}</span>
                    <FaCalendar />
                    <span>{new Date(selectedTestimony.date).toLocaleDateString()}</span>
                  </div>
                  <div className="testimony-category">
                    {categories.find(c => c.id === selectedTestimony.category)?.icon}
                    <span>{categories.find(c => c.id === selectedTestimony.category)?.name}</span>
                  </div>
                </div>
                <h2>{selectedTestimony.title}</h2>
                <p className="testimony-text">{selectedTestimony.testimony}</p>
                <div className="testimony-stats">
                  <button onClick={() => handleLike(selectedTestimony.id)}>
                    <FaThumbsUp /> {selectedTestimony.likes} People Encouraged
                  </button>
                  <button onClick={() => handlePray(selectedTestimony.id)}>
                    <FaPrayingHands /> {selectedTestimony.prayerCount} Prayed
                  </button>
                  <button onClick={() => handleShare(selectedTestimony)}>
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Testimony Card Component
const TestimonyCard = ({ testimony, isLiked, onLike, onPray, onShare, onView }) => {
  const categories = {
    healing: { icon: <FaHeart />, color: '#4CAF50' },
    financial: { icon: <FaHandsHelping />, color: '#FFC107' },
    family: { icon: <FaHome />, color: '#9C27B0' },
    deliverance: { icon: <FaPrayingHands />, color: '#F44336' },
    career: { icon: <FaChurch />, color: '#2196F3' }
  };

  const category = categories[testimony.category] || categories.healing;

  return (
    <motion.div
      className="testimony-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {testimony.featured && <div className="featured-badge">⭐ Featured</div>}
      <div className="testimony-card-header">
        <div className="testimony-avatar">
          <FaUser />
        </div>
        <div>
          <h4>{testimony.name}</h4>
          <span className="testimony-date">{new Date(testimony.date).toLocaleDateString()}</span>
        </div>
        <div className="testimony-category-icon" style={{ background: `${category.color}20`, color: category.color }}>
          {category.icon}
        </div>
      </div>
      <h3>{testimony.title}</h3>
      <p className="testimony-excerpt">{testimony.testimony.substring(0, 120)}...</p>
      <div className="testimony-card-actions">
        <button className={isLiked ? 'liked' : ''} onClick={onLike}>
          <FaThumbsUp /> {testimony.likes}
        </button>
        <button onClick={onPray}>
          <FaPrayingHands /> {testimony.prayerCount}
        </button>
        <button onClick={onShare}>
          <FaShare />
        </button>
        <button className="read-more" onClick={onView}>
          Read More
        </button>
      </div>
    </motion.div>
  );
};

export default TestimonyForum;