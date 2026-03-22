// src/pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Contact.css';

const branches = [
  {
    name: 'Lagos HQ',
    address: '23 Dominion Way, Lagos Mainland',
    services: 'Sundays: 8am, 10am'
  },
  {
    name: 'Abuja',
    address: '15 Dominion Avenue, Central Business District',
    services: 'Sundays: 9am, 11am'
  },
  {
    name: 'Port Harcourt',
    address: '7 Grace Boulevard, GRA Phase 2',
    services: 'Sundays: 8am, 10am'
  },
  {
    name: 'Ibadan',
    address: '42 Victory Road, Bodija Estate',
    services: 'Sundays: 9am, 11am'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Contact Dominion City for prayer requests, questions, or to connect with any of our branches." />
      </Helmet>

      <main>
        <section className="contact-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Get in Touch</h1>
              <p>We'd love to hear from you</p>
            </motion.div>
          </div>
        </section>

        <section className="contact-main">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Contact Information</h2>
                
                <div className="info-item">
                  <div className="info-icon"><FaMapMarkerAlt /></div>
                  <div className="info-text">
                    <h3>Headquarters</h3>
                    <p>23 Dominion Way, Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon"><FaPhone /></div>
                  <div className="info-text">
                    <h3>Phone</h3>
                    <p>+234 123 456 7890</p>
                    <p>+234 123 456 7891</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon"><FaEnvelope /></div>
                  <div className="info-text">
                    <h3>Email</h3>
                    <p>info@dominioncity.org</p>
                    <p>prayer@dominioncity.org</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon"><FaClock /></div>
                  <div className="info-text">
                    <h3>Office Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              <motion.form
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3>Send Us a Message</h3>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </motion.form>
            </div>
          </div>
        </section>

        <section className="branches-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Find Us</span>
              <h2>Our Branches</h2>
              <p>Worship with us at any of our locations near you</p>
            </div>

            <div className="branches-grid">
              {branches.map((branch, index) => (
                <motion.div
                  key={index}
                  className="branch-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <h4>{branch.name}</h4>
                  <p><FaMapMarkerAlt /> {branch.address}</p>
                  <p><FaClock /> {branch.services}</p>
                </motion.div>
              ))}
            </div>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.711377187562!2d3.379214!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjIiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Dominion City Location Map"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="social-section">
          <div className="container">
            <div className="section-header">
              <h2>Connect With Us</h2>
              <p>Follow us on social media for daily inspiration and updates</p>
            </div>

            <div className="social-links-large">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaYoutube /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaWhatsapp /></a>
              <a href="#" className="social-icon"><FaTelegram /></a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;