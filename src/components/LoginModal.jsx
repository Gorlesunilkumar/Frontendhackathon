import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginModal({open, setOpen}){
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if(!open) return null

  const submit = async ()=>{
    if(isLogin){
      // Mock login - in real app replace with API call
      setOpen(false)
      if(role === 'admin') navigate('/dashboard/admin')
      else navigate('/dashboard/student')
    } else {
      // Register new student
      setLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            rollNumber,
            department,
            year,
            email,
            password
          })
        })
        if(response.ok){
          alert('Registration successful! Please login.')
          setIsLogin(true)
          setEmail('')
          setPassword('')
          setName('')
          setRollNumber('')
          setDepartment('')
          setYear('')
        } else {
          alert('Registration failed')
        }
      } catch(error) {
        console.error('Registration error:', error)
        alert('Registration failed')
      }
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md border border-gray-200 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-center">{isLogin ? 'Welcome Back!' : 'Create Account'}</h3>

        {/* Toggle between Login/Register */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline text-sm"
          >
            {isLogin ? 'New student? Register here' : 'Already have an account? Login'}
          </button>
        </div>

        {/* Login Form */}
        <div className="mt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Registration Fields */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Enter your roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Enter your department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Enter your year (e.g., 1st, 2nd, 3rd, 4th)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Login Actions */}
        {isLogin && (
          <div className="mt-6 space-y-3">
            <button
              onClick={() => {
                setRole('student');
                submit();
              }}
              disabled={loading}
              className="w-full px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>👨‍🎓</span>
              {loading ? 'Processing...' : 'Login as Student'}
            </button>
            <button
              onClick={() => {
                setRole('admin');
                submit();
              }}
              disabled={loading}
              className="w-full px-4 py-3 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>👨‍💼</span>
              {loading ? 'Processing...' : 'Login as Admin'}
            </button>
          </div>
        )}

        {/* Register Action */}
        {!isLogin && (
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Register'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
