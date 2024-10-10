'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, FileText, Rocket } from 'lucide-react'
import { Button } from "../../components/ui/button"

const SubsidyCloudLanding: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex items-center justify-center">
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-center"
          variants={itemVariants}
        >
          補助金クラウド
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 text-yellow-300 font-light text-center"
          variants={itemVariants}
        >
          パッと見つかる、すぐに申請。補助金申請をもっと身近に
        </motion.p>
        <motion.div
          className="flex justify-center mb-10 sm:mb-12"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="text-base sm:text-lg md:text-xl lg:text-2xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold rounded-full">
            <Link href="/login">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                今すぐ始める
              </motion.span>
            </Link>
          </Button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
        >
          {[
            { icon: Search, title: "簡単検索", description: "あなたに最適な補助金を素早く見つけます" },
            { icon: FileText, title: "申請サポート", description: "面倒な申請手続きをスムーズにサポート" },
            { icon: Rocket, title: "迅速な対応", description: "申請から結果までスピーディーに対応" }
          ].map((feature) => (
            <motion.div 
              key={feature.title}
              variants={itemVariants}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white border-opacity-20 text-white flex flex-col items-center text-center"
            >
              <motion.div 
                className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-yellow-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <feature.icon size={40} />
              </motion.div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SubsidyCloudLanding