import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaEye, FaPray, FaVideo } from 'react-icons/fa';
import { useAdmin } from '../context/AdminContext';
import { toast } from 'react-toastify';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  
  const {
    isAuthenticated,
    login,
    logout,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    testimonies,
    approveTestimony,
    deleteTestimony,
    prayerRequests,
    deletePrayerRequest,
    sermons,
    addSermon
  } = useAdmin();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateEvent(editingItem.id, formData);
    } else {
      addEvent(formData);
    }
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      category: ''
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={loginCredentials.username}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginCredentials.password}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="btn btn-outline">Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>
          Events
        </button>
        <button className={activeTab === 'testimonies' ? 'active' : ''} onClick={() => setActiveTab('testimonies')}>
          Testimonies
        </button>
        <button className={activeTab === 'prayers' ? 'active' : ''} onClick={() => setActiveTab('prayers')}>
          Prayer Requests
        </button>
        <button className={activeTab === 'sermons' ? 'active' : ''} onClick={() => setActiveTab('sermons')}>
          Sermons
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'events' && (
          <>
            <button className="btn btn-primary add-btn" onClick={() => { setShowForm(true); setEditingItem(null); }}>
              <FaPlus /> Add Event
            </button>
            
            <div className="admin-table">
              <table>
                <thead>
                  <tr><th>Title</th><th>Date</th><th>Location</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>{event.location}</td>
                      <td>
                        <button onClick={() => handleEdit(event)}><FaEdit /></button>
                        <button onClick={() => deleteEvent(event.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'testimonies' && (
          <div className="admin-table">
            <table>
              <thead>
                <tr><th>Name</th><th>Title</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {testimonies.map(testimony => (
                  <tr key={testimony.id}>
                    <td>{testimony.name}</td>
                    <td>{testimony.title}</td>
                    <td>{testimony.approved ? 'Approved' : 'Pending'}</td>
                    <td>
                      {!testimony.approved && (
                        <button onClick={() => approveTestimony(testimony.id)}><FaCheck /></button>
                      )}
                      <button onClick={() => deleteTestimony(testimony.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'prayers' && (
          <div className="admin-table">
            <table>
              <thead>
                <tr><th>Name</th><th>Prayer Request</th><th>Private</th><th>Date</th><th>Action</th></tr>
              </thead>
              <tbody>
                {prayerRequests.map(prayer => (
                  <tr key={prayer.id}>
                    <td>{prayer.name}</td>
                    <td>{prayer.prayer.substring(0, 50)}...</td>
                    <td>{prayer.isPrivate ? 'Yes' : 'No'}</td>
                    <td>{new Date(prayer.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => deletePrayerRequest(prayer.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
              <h3>{editingItem ? 'Edit Event' : 'Add New Event'}</h3>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Update' : 'Add'} Event
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;