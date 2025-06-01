import React from 'react';
import Navbar from '@/components/common/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Footer from '@/components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="bg-dark-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;