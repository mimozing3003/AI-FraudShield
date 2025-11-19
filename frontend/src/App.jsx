import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ApiTest from './components/ApiTest'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Login from './pages/Login'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken')
    if (token) {
      // In a real app, you would verify the token with your backend
      setUser({ name: 'Saumojit Roy', email: 'saumojit@example.com' })
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('authToken', 'fake-jwt-token')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
        <ApiTest />
      </div>
    </Router>
  )
}

export default App