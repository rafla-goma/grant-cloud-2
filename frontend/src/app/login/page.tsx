'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { Button } from "../../components/ui/button"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 実際のログインロジックを実装
    console.log('ログイン試行', { email, password })
    router.push('/dashboard')
  }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">ログイン</h1>
          <p className="text-lg sm:text-xl text-yellow-300 font-light">補助金クラウドへようこそ</p>
        </motion.div>
        <motion.form 
          className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white border-opacity-30"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <div className="mb-6">
            <label htmlFor="email-address" className="block text-sm font-medium mb-2 text-white">メールアドレス</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-30 border border-purple-300 rounded-md text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-white">パスワード</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-30 border border-purple-300 rounded-md text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-yellow-300 focus:ring-yellow-300 border-purple-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">ログイン状態を保持</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-yellow-300 hover:text-yellow-200">パスワードをお忘れですか？</a>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 rounded-full transition-all duration-300"
          >
            ログイン
          </Button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default LoginPage