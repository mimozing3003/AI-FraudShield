import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Home.css'

const Home = () => {
  const features = [
    {
      title: "Deepfake Detection",
      description: "Analyze images and videos for AI-generated manipulations",
      icon: "📸"
    },
    {
      title: "Voice Authenticity",
      description: "Detect AI-generated synthetic voices in audio files",
      icon: "🎤"
    },
    {
      title: "Phishing Detector",
      description: "Identify phishing URLs and email content",
      icon: "🔗"
    }
  ]

  const steps = [
    {
      title: "Upload Content",
      description: "Submit images, videos, audio files, URLs, or text for analysis"
    },
    {
      title: "AI Analysis",
      description: "Our models scan for digital fingerprints of manipulation"
    },
    {
      title: "Fraud Detection",
      description: "Receive instant risk assessment and detailed explanations"
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1>Protect Yourself from Digital Fraud</h1>
            <p>Our cutting-edge AI analyzes media and content to detect deepfakes, synthetic voices, and phishing attempts with industry-leading accuracy.</p>
            <div className="hero-buttons">
              <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Advanced Fraud Detection
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How AI FraudShield Works
          </motion.h2>
          
          <div className="steps">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="step-number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Protect Your Digital Assets?</h2>
            <p>Join thousands of users who trust AI FraudShield for advanced fraud detection.</p>
            <Link to="/dashboard" className="btn btn-primary">Access Dashboard</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home