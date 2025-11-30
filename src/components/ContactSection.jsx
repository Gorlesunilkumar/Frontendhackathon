import React from 'react'

export default function ContactSection(){
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <form className="space-y-3 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea className="w-full border rounded px-3 py-2" rows="4" />
          </div>
          <div>
            <button
              type="button"
              onClick={() => alert('Message sent successfully!')}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
