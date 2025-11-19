import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI FraudShield</h3>
            <p>Advanced AI-powered fraud detection platform by Saumojit Roy 2025</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@aifraudshield.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 AI FraudShield. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer