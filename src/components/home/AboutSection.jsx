// src/components/home/AboutSection.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { FaCross } from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Updated stats - only changed the values, kept the labels exactly the same
  const stats = [
    { value: 30, label: 'Years of Impact', suffix: '+' },
    { value: 1000, label: 'Branches', suffix: '+' },
    { value: 1000000, label: 'Lives Changed', suffix: '+' },
  ];

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <span className="section-subtitle">Welcome to</span>
          <h2>Dominion City</h2>
          <div className="divider">
            <FaCross />
          </div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
            }}
          >
            <p className="lead">
              Dominion City is more than a church; it's a movement of people passionate about God and
              committed to raising kingdom-minded leaders who will impact their generations.
            </p>
            <p>
              Under the visionary leadership of Dr. David Ogbueli, we have seen countless lives transformed,
              families restored, and destinies fulfilled. Our mandate is clear: to raise leaders, impact
              generations, and demonstrate the love of Christ to our world.
            </p>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">
                    {isInView && (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    )}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn btn-primary">
              Read Our Story
            </Link>
          </motion.div>

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } },
            }}
          >
            <img src="/images/pastor/Dr. David Ogbueli.jpeg" alt="Dr. David Ogbueli" />
            <div className="image-caption">
              <h4>Dr. David Ogbueli</h4>
              <p>Founder & Senior Pastor</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;