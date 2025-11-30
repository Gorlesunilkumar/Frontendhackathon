import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<LandingPage />} />
          <Route path="dashboard/admin" element={<AdminDashboard />} />
          <Route path="dashboard/student" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
