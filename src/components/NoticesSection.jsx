import React from 'react'

const notices = [
  {id:1, title:'Inter-college Fest', body:'Registration open until Oct 20.'},
  {id:2, title:'Sports Day', body:'Volunteers needed.'}
]

export default function NoticesSection(){
  return (
    <section id="notices" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Notices</h2>
        <div className="space-y-4">
          {notices.map(n=> (
            <div key={n.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-600">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
