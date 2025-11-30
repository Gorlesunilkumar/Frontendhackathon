import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function AdminDashboard(){
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('events')
  const [students, setStudents] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    year: '',
    email: '',
    password: ''
  })
  const [eventFormData, setEventFormData] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
    club: '',
    status: 'Upcoming'
  })
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([])

  // Fetch students and events on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        await Promise.all([fetchStudents(), fetchEvents()])
      } catch (err) {
        setError('Failed to load data. Please check your connection.')
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students)
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredStudents(filtered)
    }
  }, [students, searchTerm])

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching students:', error)
      throw error
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  const handleCreateStudent = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        alert('Student created successfully!')
        setFormData({
          name: '',
          rollNumber: '',
          department: '',
          year: '',
          email: '',
          password: ''
        })
        fetchStudents() // Refresh the list
      } else {
        alert('Error creating student')
      }
    } catch (error) {
      console.error('Error creating student:', error)
      alert('Error creating student')
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEventInputChange = (e) => {
    setEventFormData({
      ...eventFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventFormData)
      })
      if (response.ok) {
        alert('Event created successfully!')
        setShowEventModal(false)
        setEventFormData({
          name: '',
          date: '',
          description: '',
          location: '',
          club: ''
        })
        setEditingEvent(null)
        fetchEvents() // Refresh the list
      } else {
        alert('Error creating event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Error creating event')
    }
    setLoading(false)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setEventFormData({
      name: event.name || '',
      date: event.date || '',
      description: event.description || '',
      location: event.location || '',
      club: event.club || '',
      status: event.status || 'Upcoming'
    })
    setShowEventModal(true)
  }

  const handleViewStudentDetails = (student) => {
    alert(`Student Details:\nName: ${student.name}\nRoll Number: ${student.rollNumber}\nDepartment: ${student.department}\nYear: ${student.year}\nEmail: ${student.email}`)
  }

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Name,Roll Number,Department,Year,Email\n" +
      filteredStudents.map(student =>
        `${student.name},${student.rollNumber},${student.department},${student.year},${student.email}`
      ).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "students_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        alert('Student deleted successfully!')
        fetchStudents() // Refresh the list
      } else {
        alert('Error deleting student')
      }
    } catch (error) {
      console.error('Error deleting student:', error)
      alert('Error deleting student')
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        alert('Event deleted successfully!')
        fetchEvents() // Refresh the list
      } else {
        alert('Error deleting event')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event')
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Total Events</p>
            <p className="text-2xl font-bold">{events.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Active Students</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Upcoming Events</p>
            <p className="text-2xl font-bold">{events.filter(event => event.status === 'Upcoming').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Total Clubs</p>
            <p className="text-2xl font-bold">{[...new Set(events.map(event => event.club?.name || event.club))].length}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-3 ${activeTab === 'events' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
              >
                Events Management
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-3 ${activeTab === 'students' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
              >
                Student Records
              </button>
            </div>
          </div>

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Events List</h2>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Add New Event
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {events.map(event => (
                      <tr key={event._id}>
                        <td className="px-6 py-4">{event.name}</td>
                        <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{event.participants ? event.participants.length : 0}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            event.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.status || 'Upcoming'}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-primary hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="p-6">
              {/* Create Student Form */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Create New Student</h3>
                <form onSubmit={handleCreateStudent} className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Student'}
                  </button>
                </form>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Student Records</h2>
                <div className="flex gap-2">
                  <input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1 border rounded"
                  />
                  <button onClick={handleExportData} className="px-4 py-2 bg-primary text-white rounded">
                    Export Data
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map(student => (
                      <tr key={student._id}>
                        <td className="px-6 py-4">{student.name}</td>
                        <td className="px-6 py-4">{student.rollNumber}</td>
                        <td className="px-6 py-4">{student.department}</td>
                        <td className="px-6 py-4">{student.year}</td>
                        <td className="px-6 py-4">{student.email}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewStudentDetails(student)}
                            className="text-primary hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h3>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={eventFormData.name}
                onChange={handleEventInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={eventFormData.date}
                onChange={handleEventInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Event Description"
                value={eventFormData.description}
                onChange={handleEventInputChange}
                className="w-full px-3 py-2 border rounded"
                rows="3"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={eventFormData.location}
                onChange={handleEventInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="club"
                placeholder="Club Name"
                value={eventFormData.club}
                onChange={handleEventInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <select
                name="status"
                value={eventFormData.status}
                onChange={handleEventInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false)
                    setEditingEvent(null)
                    setEventFormData({
                      name: '',
                      date: '',
                      description: '',
                      club: '',
                      status: 'Upcoming'
                    })
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
