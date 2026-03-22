import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import MarqueeGrid from '../components/home/MarqueeGrid';
import AboutSection from '../components/home/AboutSection';
import MinistriesSection from '../components/home/MinistriesSection';
import EventsSection from '../components/home/EventsSection';
import SermonsSection from '../components/home/SermonsSection';
import GivingSection from '../components/home/GivingSection';
import TestimonyForum from '../components/testimony/TestimonyForum';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSlider />
      <MarqueeGrid />
      <AboutSection />
      <MinistriesSection />
      <EventsSection />
      <TestimonyForum />  {/* Add this line */}
      <SermonsSection />
      <GivingSection />
    </motion.main>
  );
};

export default Home;