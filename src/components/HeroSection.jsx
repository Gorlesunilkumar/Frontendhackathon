import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection(){
  return (
    <section id="home" className="hero-gradient text-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold">Welcome to KL UNIVERSITY</h1>
          <p className="mt-4 text-lg max-w-2xl">Explore clubs, events, and participation records. Get involved and stay updated.</p>
          <div className="mt-6 flex gap-4">
            <a href="#clubs" className="px-5 py-3 bg-white text-primary rounded font-semibold">Explore Clubs</a>
            <a href="#notices" className="px-5 py-3 border border-white/60 rounded">Notices</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
