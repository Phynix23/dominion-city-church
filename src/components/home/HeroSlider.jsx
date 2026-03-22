import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    image: '/images/hero/worship-1.jpg',
    title: 'Welcome to Dominion City',
    subtitle: 'A place where lives are transformed, destinies are fulfilled, and leaders are raised.',
    buttons: [
      { text: 'Plan Your Visit', link: '/contact', primary: true },
      { text: 'Watch Live', link: '/sermons', primary: false, icon: <FaPlay /> },
    ],
  },
  {
    id: 2,
    image: '/images/hero/pastor-david.jpg',
    title: 'With Dr. David Ogbueli',
    subtitle: 'Experience the transformative power of God\'s Word through prophetic teaching.',
    buttons: [
      { text: 'Latest Sermons', link: '/sermons', primary: true },
      { text: 'Meet the Man of God', link: '/about', primary: false },
    ],
  },
  {
    id: 3,
    image: '/images/hero/congregation-1.jpg',
    title: 'Join Our Growing Family',
    subtitle: 'Be part of a vibrant community of believers passionate about God.',
    buttons: [
      { text: 'Connect With Us', link: '/contact', primary: true },
      { text: 'Upcoming Events', link: '/events', primary: false },
    ],
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <style>{`
        .hero-slider {
          position: relative;
          height: 100vh;
          overflow: hidden;
          margin-top: 0;
        }
        
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        
        .slide.active {
          opacity: 1;
        }
        
        .slide-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
        }
        
        .slide-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          width: 90%;
          max-width: 800px;
          z-index: 2;
        }
        
        .slide-content h1 {
          font-size: 64px;
          margin-bottom: 20px;
          font-family: var(--font-primary);
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .slide-content p {
          font-size: 18px;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .slide-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(65, 105, 225, 0.2);
          border: 1px solid var(--primary-blue);
          color: var(--primary-blue);
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .slider-btn:hover {
          background: var(--primary-blue);
          color: white;
        }
        
        .slider-prev {
          left: 30px;
        }
        
        .slider-next {
          right: 30px;
        }
        
        .slider-dots {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .dot.active {
          background: var(--primary-blue);
          transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
          .slide-content h1 {
            font-size: 36px;
          }
          
          .slide-content p {
            font-size: 16px;
          }
          
          .slide-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .slider-prev, .slider-next {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          
          .slider-prev {
            left: 15px;
          }
          
          .slider-next {
            right: 15px;
          }
        }
      `}</style>
      
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <div className="slide-bg" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="slide-overlay" />
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="slide-buttons">
                {slide.buttons.map((btn, idx) => (
                  <Link
                    key={idx}
                    to={btn.link}
                    className={`btn ${btn.primary ? 'btn-primary' : 'btn-outline'}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    {btn.icon && btn.icon}
                    {btn.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <button className="slider-btn slider-prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-btn slider-next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSlider;