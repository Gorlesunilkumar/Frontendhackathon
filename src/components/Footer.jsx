import React from 'react'

export default function Footer(){
  return (
    <footer className="py-6 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} KL UNIVERSITY — All rights reserved
      </div>
    </footer>
  )
}
