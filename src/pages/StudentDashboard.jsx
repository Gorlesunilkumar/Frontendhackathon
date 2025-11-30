import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard(){
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  const [activities, setActivities] = useState([
    { id: 1, name: 'Annual Music Festival', date: '2025-10-15', role: 'Participant', status: 'Completed' },
    { id: 2, name: 'Robotics Workshop', date: '2025-11-20', role: 'Team Leader', status: 'Upcoming' },
    { id: 3, name: 'Drama Club Performance', date: '2025-09-05', role: 'Actor', status: 'Completed' }
  ])

  const upcomingEvents = [
    { id: 1, name: 'Winter Sports Meet', date: '2025-12-10', registration: 'Open' },
    { id: 2, name: 'Coding Competition', date: '2025-11-30', registration: 'Open' }
  ]

  const registerForEvent = async (eventId, eventName) => {
    setLoading(true)
    try {
      // For demo purposes, we'll use a sample student ID
      // In a real app, this would come from authentication context
      const sampleStudentId = '507f1f77bcf86cd799439011' // Sample MongoDB ObjectId

      const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: sampleStudentId
        })
      })

      const data = await response.json()

      if(response.ok){
        alert(`Successfully registered for ${eventName}!`)
      } else {
        alert(`Registration failed: ${data.message}`)
      }
    } catch(error) {
      console.error('Registration error:', error)
      alert('Registration failed: Network error')
    }
    setLoading(false)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </button>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Student Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name: John Doe</p>
              <p className="text-gray-600">Roll Number: ST2025001</p>
            </div>
            <div>
              <p className="text-gray-600">Department: Computer Science</p>
              <p className="text-gray-600">Year: 3rd Year</p>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Activity History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.map(activity => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4">{activity.name}</td>
                    <td className="px-6 py-4">{activity.date}</td>
                    <td className="px-6 py-4">{activity.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="p-4 border rounded">
                <h3 className="font-medium">{event.name}</h3>
                <p className="text-sm text-gray-600">Date: {event.date}</p>
                <div className="mt-2">
                  <button
                    onClick={() => registerForEvent(event.id, event.name)}
                    disabled={loading}
                    className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
