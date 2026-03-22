// src/components/home/MarqueeGrid.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MarqueeGrid.css';

const marqueeImages = [
  { src: '/images/grid/worship-1.jpg', label: 'Worship Night' },
  { src: '/images/grid/outreach-1.jpg', label: 'Community Impact' },
  { src: '/images/grid/youth-1.jpg', label: 'The Edge Youth' },
  { src: '/images/grid/baptism-1.jpg', label: 'Baptism Service' },
  { src: '/images/grid/prayer-1.jpg', label: 'Prayer Meeting' },
  { src: '/images/grid/children-1.jpg', label: 'Children\'s Ministry' },
  { src: '/images/grid/women-1.jpg', label: 'Women of Impact' },
  { src: '/images/grid/men-1.jpg', label: 'Men of Honour' },
];

const MarqueeGrid = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseEnter = () => {
    const track = trackRef.current;
    if (track) {
      track.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    const track = trackRef.current;
    if (track) {
      track.style.animationPlayState = 'running';
    }
  };

  return (
    <section className="marquee-grid-section">
      <div className="marquee-container">
        <div
          className="marquee-track"
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[...marqueeImages, ...marqueeImages].map((item, index) => (
            <motion.div
              key={index}
              className="marquee-item"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={item.src} alt={item.label} />
              <div className="marquee-overlay">
                <span>{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeGrid;