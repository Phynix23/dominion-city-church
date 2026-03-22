import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      // Replace with your Mailchimp/ConvertKit API endpoint
      await axios.post('/api/newsletter/subscribe', { email });
      toast.success('Subscribed successfully! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaEnvelope className="newsletter-icon" />
          <h2>Stay Connected</h2>
          <p>Get daily devotionals, sermon updates, and event notifications delivered to your inbox.</p>
          
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={isSubscribing}>
              <FaPaperPlane /> {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          <p className="newsletter-note">No spam, unsubscribe anytime.</p>
        </motion.div>
      </div>

      <style jsx>{`
        .newsletter-section {
          padding: 80px 0;
          background: linear-gradient(135deg, var(--secondary-blue), var(--dark-bg));
          text-align: center;
        }
        
        .newsletter-icon {
          font-size: 48px;
          color: var(--primary-blue);
          margin-bottom: 20px;
        }
        
        .newsletter-content h2 {
          font-size: 36px;
          margin-bottom: 15px;
        }
        
        .newsletter-content p {
          color: var(--text-gray);
          max-width: 500px;
          margin: 0 auto 30px;
        }
        
        .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          gap: 15px;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 15px 20px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(65,105,225,0.3);
          border-radius: 50px;
          color: white;
          font-size: 16px;
        }
        
        .newsletter-form button {
          padding: 15px 30px;
          background: var(--primary-blue);
          border: none;
          border-radius: 50px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .newsletter-form button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-blue);
        }
        
        .newsletter-note {
          font-size: 12px;
          margin-top: 15px;
          opacity: 0.7;
        }
        
        @media (max-width: 768px) {
          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Newsletter;