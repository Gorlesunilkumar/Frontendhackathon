import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import ClubsSection from '../components/ClubsSection'
import GallerySection from '../components/GallerySection'
import NoticesSection from '../components/NoticesSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function LandingPage(){
  const [rollNumber, setRollNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [participationData, setParticipationData] = useState(null)
  const [error, setError] = useState('')

  const checkParticipation = async () => {
    if (!rollNumber.trim()) {
      setError('Please enter a roll number')
      return
    }

    setLoading(true)
    setError('')
    setParticipationData(null)

    try {
      const response = await fetch(`http://localhost:5000/api/students/participation/${rollNumber.trim()}`)
      const data = await response.json()

      if (response.ok) {
        setParticipationData(data)
      } else {
        setError(data.message || 'Student not found')
      }
    } catch (error) {
      console.error('Error fetching participation data:', error)
      setError('Failed to fetch participation data. Please try again.')
    }

    setLoading(false)
  }
  return (
    <div className="pt-16">
      <HeroSection />
      <ClubsSection />
      <GallerySection />
      <NoticesSection />
      <ContactSection />
      <section id="participation" className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Check Participation</h2>
          <div className="flex gap-2">
            <input
              placeholder="Enter roll number"
              className="w-full border rounded px-3 py-2"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
            <button
              onClick={checkParticipation}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check'}
            </button>
          </div>
          {participationData && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Participation Details</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Name: {participationData.student.name}</p>
                  <p className="text-sm text-gray-600">Roll Number: {participationData.student.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department: {participationData.student.department}</p>
                  <p className="text-sm text-gray-600">Year: {participationData.student.year}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Events Participated: {participationData.totalEvents}</p>
                  {participationData.events.length > 0 && (
                    <ul className="text-sm text-gray-600 mt-1">
                      {participationData.events.slice(0, 3).map(event => (
                        <li key={event.id}>• {event.name} ({new Date(event.date).toLocaleDateString()})</li>
                      ))}
                      {participationData.events.length > 3 && (
                        <li className="text-gray-500">...and {participationData.events.length - 3} more</li>
                      )}
                    </ul>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Clubs Joined: {participationData.totalClubs}</p>
                  {participationData.clubs.length > 0 && (
                    <ul className="text-sm text-gray-600 mt-1">
                      {participationData.clubs.slice(0, 3).map(club => (
                        <li key={club.id}>• {club.name}</li>
                      ))}
                      {participationData.clubs.length > 3 && (
                        <li className="text-gray-500">...and {participationData.clubs.length - 3} more</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
