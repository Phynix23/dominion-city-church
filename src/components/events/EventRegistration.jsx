import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import emailService from '../../utils/emailService';

const EventRegistration = ({ event, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      // Send registration email
      await emailService.sendEventRegistration({
        ...formData,
        eventName: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        registrationId
      });
      
      // Save to localStorage
      const registrations = JSON.parse(localStorage.getItem('event_registrations') || '[]');
      registrations.push({
        ...formData,
        eventId: event.id,
        eventTitle: event.title,
        registrationId,
        date: new Date().toISOString()
      });
      localStorage.setItem('event_registrations', JSON.stringify(registrations));
      
      toast.success(`Registration successful! Check your email for confirmation. Registration ID: ${registrationId}`);
      onClose();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="registration-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="registration-content"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
            
            <h2>Register for {event.title}</h2>
            <p className="event-details">
              {event.date} at {event.time} • {event.location}
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Number of Guests (including you)</label>
                <input
                  type="number"
                  name="numberOfGuests"
                  min="1"
                  max="10"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="specialRequests"
                  placeholder="Special Requests (dietary, accessibility, etc.)"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventRegistration;