import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Header.css'

const Header = ({ user, onLogout }) => {
  const location = useLocation()

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/">
            <h1>AI FraudShield</h1>
          </Link>
        </motion.div>
        
        <nav>
          <ul>
            <motion.li 
              whileHover={{ y: -2 }}
              className={location.pathname === '/' ? 'active' : ''}
            >
              <Link to="/">Home</Link>
            </motion.li>
            <motion.li 
              whileHover={{ y: -2 }}
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              <Link to="/dashboard">Dashboard</Link>
            </motion.li>
            <motion.li 
              whileHover={{ y: -2 }}
              className={location.pathname === '/about' ? 'active' : ''}
            >
              <Link to="/about">About</Link>
            </motion.li>
            {user ? (
              <motion.li 
                whileHover={{ y: -2 }}
                className="user-menu"
              >
                <span>Welcome, {user.name}</span>
                <button onClick={onLogout}>Logout</button>
              </motion.li>
            ) : (
              <motion.li 
                whileHover={{ y: -2 }}
                className={location.pathname === '/login' ? 'active' : ''}
              >
                <Link to="/login">Login</Link>
              </motion.li>
            )}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header