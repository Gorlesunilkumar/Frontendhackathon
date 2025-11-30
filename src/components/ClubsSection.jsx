import React from 'react'
import { motion } from 'framer-motion'

const clubs = [
  {id:1, name:'Music Club', desc:'Instruments, bands, and performances', image:'https://picsum.photos/400/250?random=7'},
  {id:2, name:'Robotics Club', desc:'Robots, coding and competitions', image:'https://picsum.photos/400/250?random=8'},
  {id:3, name:'Drama Club', desc:'Plays, improv and stagecraft', image:'https://picsum.photos/400/250?random=9'},
]

export default function ClubsSection(){
  return (
    <section id="clubs" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Clubs & Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {clubs.map(c=> (
            <motion.article key={c.id} whileHover={{scale:1.02}} className="p-6 bg-white rounded shadow">
              <img src={c.image} alt={c.name} className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => alert(`Viewing events for ${c.name}`)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
                >
                  View Events
                </button>
                <button
                  onClick={() => alert(`Joined ${c.name}`)}
                  className="px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white"
                >
                  Join Club
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
