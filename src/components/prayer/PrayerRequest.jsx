import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandsPraying, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';


const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayer: '',
    isPrivate: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Prayer request submitted! Our prayer team will pray for you.');
      setFormData({ name: '', email: '', prayer: '', isPrivate: true });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="prayer-section" style={{ padding: '80px 0', background: 'var(--dark-bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <FaHandsPraying style={{ fontSize: '64px', color: 'var(--primary-blue)', marginBottom: '20px' }} />
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Prayer Request</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>
              Our prayer team is ready to stand with you in faith.
            </p>
            <div style={{ background: 'rgba(65, 105, 225, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaLock />
              <span>Your request is confidential</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}>Prayer Schedule</h4>
              <p>Monday - Friday: 5:00 AM</p>
              <p>Wednesday: 6:00 PM (Digging Deep)</p>
              <p>24/7 Prayer Line: <strong>+234 123 456 7890</strong></p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '20px' }}
          >
            <h3 style={{ fontSize: '24px', marginBottom: '25px' }}>Submit Your Request</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(65,105,225,0.3)', borderRadius: '10px', color: 'white' }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(65,105,225,0.3)', borderRadius: '10px', color: 'white' }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <textarea
                name="prayer"
                rows="5"
                placeholder="What would you like us to pray about?"
                value={formData.prayer}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(65,105,225,0.3)', borderRadius: '10px', color: 'white', fontFamily: 'inherit' }}
              ></textarea>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                />
                Keep this request private
              </label>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default PrayerRequest;