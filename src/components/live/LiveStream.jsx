import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaFacebook, FaComments, FaBell, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LiveStream = () => {
  const [isLive, setIsLive] = useState(true);
  const [viewers, setViewers] = useState(142);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    // Simulate live viewer count
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const message = {
      id: Date.now(),
      user: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString()
    };
    setChatMessages([...chatMessages, message]);
    setNewMessage('');
    toast.success('Message sent!');
  };

  const scheduleReminder = (service) => {
    localStorage.setItem(`reminder_${service}`, JSON.stringify({
      service,
      time: new Date().toISOString()
    }));
    toast.success(`Reminder set for ${service}!`);
    setShowReminderModal(false);
  };

  return (
    <section className="live-stream-section">
      <div className="container">
        <div className="live-header">
          <div className="live-indicator">
            <span className="pulse"></span>
            <span className="live-text">LIVE</span>
            <span className="viewer-count">{viewers} watching</span>
          </div>
          <h2>Join Us Online</h2>
        </div>

        <div className="stream-container">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/live_stream?channel=UCxxxxx"
              title="Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="chat-sidebar">
            <div className="chat-header">
              <h4><FaComments /> Live Chat</h4>
              <span className="chat-count">{chatMessages.length} messages</span>
            </div>
            
            <div className="chat-messages">
              {chatMessages.map(msg => (
                <motion.div
                  key={msg.id}
                  className="chat-message"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <strong><FaUser /> {msg.user}</strong>
                  <p>{msg.text}</p>
                  <small>{msg.time}</small>
                </motion.div>
              ))}
            </div>
            
            <div className="chat-input">
              <input
                type="text"
                placeholder="Send a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>

        <div className="upcoming-streams">
          <h3>Upcoming Services</h3>
          <div className="stream-schedule">
            <div className="schedule-item">
              <div className="schedule-time">
                <span className="day">Sunday</span>
                <span className="time">8:00 AM & 10:00 AM</span>
              </div>
              <button className="remind-btn" onClick={() => scheduleReminder('Sunday Service')}>
                <FaBell /> Remind Me
              </button>
            </div>
            <div className="schedule-item">
              <div className="schedule-time">
                <span className="day">Wednesday</span>
                <span className="time">6:00 PM (Digging Deep)</span>
              </div>
              <button className="remind-btn" onClick={() => scheduleReminder('Wednesday Service')}>
                <FaBell /> Remind Me
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .live-stream-section {
          padding: 80px 0;
          background: var(--darker-bg);
        }
        
        .live-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,0,0,0.2);
          padding: 8px 20px;
          border-radius: 50px;
          margin-bottom: 20px;
        }
        
        .pulse {
          width: 12px;
          height: 12px;
          background: #ff0000;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
        
        .live-text {
          color: #ff0000;
          font-weight: bold;
          font-size: 14px;
        }
        
        .viewer-count {
          color: var(--text-gray);
          font-size: 12px;
        }
        
        .stream-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 50px;
        }
        
        .video-wrapper {
          background: #000;
          border-radius: 15px;
          overflow: hidden;
        }
        
        .chat-sidebar {
          background: rgba(255,255,255,0.05);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          height: 500px;
        }
        
        .chat-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        
        .chat-message {
          background: rgba(255,255,255,0.1);
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 10px;
        }
        
        .chat-input {
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          gap: 10px;
        }
        
        .chat-input input {
          flex: 1;
          padding: 10px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 10px;
          color: white;
        }
        
        .chat-input button {
          padding: 10px 20px;
          background: var(--primary-blue);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }
        
        .stream-schedule {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }
        
        .schedule-item {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 15px;
          text-align: center;
        }
        
        .remind-btn {
          margin-top: 10px;
          background: transparent;
          border: 1px solid var(--primary-blue);
          padding: 8px 20px;
          border-radius: 25px;
          color: var(--primary-blue);
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .stream-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default LiveStream;