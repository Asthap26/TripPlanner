import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Ecosystem from './components/Ecosystem';
import SocialProof from './components/SocialProof';
import Destinations from './components/Destinations';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Intro from './components/Intro';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Intro onEnter={() => setHasEntered(true)} />
          </motion.div>
        ) : (
          <motion.div 
            key="main" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Navbar />
            <Hero />
            <ProblemSolution />
            <HowItWorks />
            <Features />
            <Ecosystem />
            <SocialProof />
            <Destinations />
            <FinalCTA />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
