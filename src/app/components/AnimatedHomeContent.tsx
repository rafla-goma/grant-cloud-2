'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';

const AnimatedHomeContent: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [50, 0],
      transition: { duration: 1, ease: "easeOut" }
    });
  }, [controls]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <motion.h1 
        className="text-6xl font-bold mb-4 text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        補助金クラウド
      </motion.h1>
      <motion.p 
        className="text-2xl mb-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        パッと見つかる、すぐに申請
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-xl transition-all duration-300">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            はじめる
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedHomeContent;