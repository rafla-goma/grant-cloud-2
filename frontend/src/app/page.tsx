import React from 'react';
import AnimatedHomeContent from './components/AnimatedHomeContent';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <AnimatedHomeContent />
    </div>
  );
};

export default Home;