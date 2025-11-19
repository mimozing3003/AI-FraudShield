import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const features = [
    {
      title: "Real-time Analysis",
      description: "Get results in seconds with our optimized models",
      icon: "⚡"
    },
    {
      title: "Privacy Focused",
      description: "All processing happens locally, your data never leaves your device",
      icon: "🔒"
    },
    {
      title: "Continuously Updated",
      description: "Our models are regularly updated to detect new fraud techniques",
      icon: "🔄"
    }
  ]

  const team = [
    {
      name: "Saumojit Roy",
      role: "AI Researcher & Developer",
      bio: "Creator of AI FraudShield with expertise in machine learning and fraud detection."
    }
  ]

  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <motion.section 
          className="about-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>About AI FraudShield</h1>
          <p>Advanced AI-powered fraud detection platform by Saumojit Roy 2025</p>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mission"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              In an era where digital fraud is becoming increasingly sophisticated, 
              we believe everyone deserves protection from AI-generated threats. 
              AI FraudShield was created to empower individuals and organizations 
              with cutting-edge technology to detect and prevent digital fraud.
            </p>
            <p>
              Our platform combines state-of-the-art machine learning models with 
              intuitive design to make advanced fraud detection accessible to everyone.
            </p>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="features">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key Features
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
                whileHover={{ y: -10 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet the Creator
          </motion.h2>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                className="team-member"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <motion.section 
          className="technology"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React + Vite</li>
                <li>Framer Motion</li>
                <li>GSAP</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <ul>
                <li>FastAPI</li>
                <li>Python</li>
                <li>ONNX Runtime</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>AI Models</h3>
              <ul>
                <li>PyTorch</li>
                <li>Scikit-learn</li>
                <li>OpenCV</li>
                <li>Librosa</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About