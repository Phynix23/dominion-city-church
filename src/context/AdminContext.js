import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [sermons, setSermons] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem('admin_events');
    const storedTestimonies = localStorage.getItem('admin_testimonies');
    const storedPrayers = localStorage.getItem('admin_prayers');
    const storedSermons = localStorage.getItem('admin_sermons');
    
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedTestimonies) setTestimonies(JSON.parse(storedTestimonies));
    if (storedPrayers) setPrayerRequests(JSON.parse(storedPrayers));
    if (storedSermons) setSermons(JSON.parse(storedSermons));
    
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('admin_logged_in');
    if (adminLoggedIn === 'true') setIsAuthenticated(true);
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'dominion2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_logged_in', 'true');
      toast.success('Welcome to Admin Dashboard');
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_logged_in');
    toast.success('Logged out successfully');
  };

  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now(), createdAt: new Date().toISOString() };
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    localStorage.setItem('admin_events', JSON.stringify(updatedEvents));
    toast.success('Event added successfully');
  };

  const updateEvent = (id, updatedEvent) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('admin_events', JSON.stringify(updatedEvents));
    toast.success('Event updated');
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('admin_events', JSON.stringify(updatedEvents));
    toast.success('Event deleted');
  };

  const approveTestimony = (id) => {
    const updatedTestimonies = testimonies.map(testimony =>
      testimony.id === id ? { ...testimony, approved: true } : testimony
    );
    setTestimonies(updatedTestimonies);
    localStorage.setItem('admin_testimonies', JSON.stringify(updatedTestimonies));
    toast.success('Testimony approved');
  };

  const deleteTestimony = (id) => {
    const updatedTestimonies = testimonies.filter(testimony => testimony.id !== id);
    setTestimonies(updatedTestimonies);
    localStorage.setItem('admin_testimonies', JSON.stringify(updatedTestimonies));
    toast.success('Testimony deleted');
  };

  const deletePrayerRequest = (id) => {
    const updatedPrayers = prayerRequests.filter(prayer => prayer.id !== id);
    setPrayerRequests(updatedPrayers);
    localStorage.setItem('admin_prayers', JSON.stringify(updatedPrayers));
    toast.success('Prayer request removed');
  };

  const addSermon = (sermon) => {
    const newSermon = { ...sermon, id: Date.now(), views: 0, downloads: 0 };
    const updatedSermons = [newSermon, ...sermons];
    setSermons(updatedSermons);
    localStorage.setItem('admin_sermons', JSON.stringify(updatedSermons));
    toast.success('Sermon added');
  };

  return (
    <AdminContext.Provider value={{
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
    }}>
      {children}
    </AdminContext.Provider>
  );
};