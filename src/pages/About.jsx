// src/pages/About.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaBible, FaCross, FaDove, FaHeart, FaChurch, FaCrown } from 'react-icons/fa';
import './About.css';

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const timelineEvents = [
    { year: '1998', title: 'The Vision', description: 'Dr. David Ogbueli receives a prophetic vision to raise leaders who would impact generations.' },
    { year: '2000', title: 'First Service', description: 'First Sunday service held with 12 members in a small hall in Lagos.' },
    { year: '2005', title: 'First Branch', description: 'First branch outside Lagos opens in Abuja, marking the beginning of expansion.' },
    { year: '2010', title: 'Dominion City International', description: 'International branches established in London and United States.' },
    { year: '2024', title: 'Today', description: 'Over 50 branches worldwide, thousands of lives transformed, generations impacted.' },
  ];

  const beliefs = [
    { icon: <FaBible />, title: 'The Bible', description: 'We believe the Bible is the inspired, infallible Word of God and our final authority for faith and practice.' },
    { icon: <FaCross />, title: 'Salvation', description: 'We believe salvation is through faith in Jesus Christ alone, by His death and resurrection.' },
    { icon: <FaDove />, title: 'Holy Spirit', description: 'We believe in the baptism of the Holy Spirit and the operation of spiritual gifts today.' },
    { icon: <FaHeart />, title: 'Healing', description: 'We believe divine healing is provided for all in the atonement of Christ.' },
    { icon: <FaChurch />, title: 'The Church', description: 'We believe in the importance of the local church and fellowship with believers.' },
    { icon: <FaCrown />, title: 'Second Coming', description: 'We believe in the blessed hope of Jesus Christ\'s imminent return.' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="Learn about Dominion City's history, our beliefs, and the vision God gave Dr. David Ogbueli." />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Our Story</h1>
              <p>Discover the journey of faith that birthed Dominion City</p>
            </motion.div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="history-section" ref={ref}>
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <span className="section-subtitle">Our History</span>
              <h2>How It All Began</h2>
            </motion.div>

            <div className="timeline">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.2 } },
                  }}
                >
                  <div className="timeline-content">
                    <div className="timeline-year">{event.year}</div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Beliefs Section */}
        <section className="beliefs-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">What We Believe</span>
              <h2>Our Statement of Faith</h2>
            </div>

            <div className="beliefs-grid">
              {beliefs.map((belief, index) => (
                <motion.div
                  key={index}
                  className="belief-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="belief-icon">{belief.icon}</div>
                  <h3>{belief.title}</h3>
                  <p>{belief.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pastor Section */}
        <section className="pastor-section" id="pastor">
          <div className="container">
            <div className="pastor-container">
              <motion.div
                className="pastor-image"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img src="/images/pastor/dr-david-ogbueli-large.jpg" alt="Dr. David Ogbueli" />
              </motion.div>
              <motion.div
                className="pastor-bio"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2>Dr. David Ogbueli</h2>
                <span className="pastor-title">Founder & Senior Pastor</span>
                <p>
                  Dr. David Ogbueli is a prophet, teacher, and apostle of grace with a mandate to raise leaders 
                  who will impact generations. His ministry is characterized by profound revelational teaching, 
                  prophetic precision, and a deep passion for seeing people walk in their God-given destiny.
                </p>
                <p>
                  With over 25 years of ministry, he has impacted thousands across the globe through conferences, 
                  seminars, and his daily broadcast "Wisdom for Living." He is a sought-after conference speaker 
                  known for his ability to simplify deep spiritual truths.
                </p>
                <div className="pastor-quote">
                  "Every man's destiny is too great to be fulfilled alone. You need God, you need people, and you need purpose."
                </div>
                <p>He is married to Pastor Mrs. Sarah Ogbueli, and they are blessed with children.</p>
                <Link to="/sermons" className="btn btn-primary">Watch His Messages</Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;