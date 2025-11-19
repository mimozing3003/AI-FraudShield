import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Dashboard.css'

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('deepfake')
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null)
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
    setResult(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock results based on active tab
      let mockResult
      if (activeTab === 'deepfake') {
        mockResult = {
          is_deepfake: Math.random() > 0.5,
          confidence: Math.floor(Math.random() * 40) + 60, // 60-99%
          explanation: "The facial features show inconsistencies typical of AI-generated content. Detected anomalies in eye movement and facial symmetry."
        }
      } else if (activeTab === 'voice') {
        mockResult = {
          is_fake: Math.random() > 0.5,
          confidence: Math.floor(Math.random() * 40) + 60, // 60-99%
          explanation: "Audio spectral patterns indicate synthetic generation. Detected unnatural frequency distributions and lack of human vocal irregularities."
        }
      } else {
        const riskPercentage = Math.floor(Math.random() * 100)
        let riskLevel = "Low"
        if (riskPercentage > 70) riskLevel = "High"
        else if (riskPercentage > 40) riskLevel = "Medium"
        
        mockResult = {
          risk_level: riskLevel,
          risk_percentage: riskPercentage,
          explanation: "ML model analysis complete. No major rule violations detected."
        }
      }
      
      setResult(mockResult)
      setIsLoading(false)
    }, 1500)
  }

  const tabs = [
    { id: 'deepfake', label: 'Deepfake Detection', icon: '📸' },
    { id: 'voice', label: 'Voice Authenticity', icon: '🎤' },
    { id: 'phishing', label: 'Phishing Detector', icon: '🔗' }
  ]

  return (
    <div className="dashboard">
      <div className="container">
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>AI FraudShield Dashboard</h1>
          {user && <p>Welcome back, {user.name}</p>}
        </motion.div>

        <div className="dashboard-content">
          {/* Detection Tabs */}
          <motion.div 
            className="detection-tabs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Detection Panel */}
          <motion.div 
            className="detection-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="panel-header">
              <h2>{tabs.find(tab => tab.id === activeTab)?.label}</h2>
              <p>{activeTab === 'deepfake' 
                ? 'Upload an image or video to check for AI-generated manipulations' 
                : activeTab === 'voice' 
                ? 'Upload an audio file to detect AI-generated synthetic voices' 
                : 'Enter a URL or text content to check for phishing attempts'}</p>
            </div>

            <form onSubmit={handleSubmit} className="detection-form">
              {activeTab === 'phishing' ? (
                <div className="form-group">
                  <label htmlFor="textInput">URL or Text Content</label>
                  <textarea
                    id="textInput"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Enter URL or email content..."
                    required
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="fileInput">
                    {activeTab === 'deepfake' ? 'Image/Video File' : 'Audio File'}
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept={activeTab === 'deepfake' ? 'image/*,video/*' : 'audio/*'}
                    required
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Content'}
              </button>
            </form>

            {/* Results */}
            {result && (
              <motion.div 
                className="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`result-card ${getResultClass(result)}`}>
                  <div className="result-header">
                    <h3>Detection Result</h3>
                    <div className="result-badge">
                      {getResultBadgeText(result)}
                    </div>
                  </div>
                  
                  <div className="result-details">
                    <p><strong>Confidence:</strong> {getResultConfidence(result)}%</p>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-level"
                        style={{ width: `${getResultConfidence(result)}%` }}
                      ></div>
                    </div>
                    <p><strong>Explanation:</strong> {result.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <div className="loading-results">
                <div className="spinner"></div>
                <p>Analyzing content...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Helper functions for result display
const getResultClass = (result) => {
  if (result.is_deepfake || result.is_fake) return 'risk-high'
  if (result.risk_level === 'High') return 'risk-high'
  if (result.risk_level === 'Medium') return 'risk-medium'
  return 'risk-low'
}

const getResultBadgeText = (result) => {
  if (result.is_deepfake) return 'High Risk'
  if (result.is_fake) return 'High Risk'
  if (result.risk_level) return result.risk_level + ' Risk'
  return 'Low Risk'
}

const getResultConfidence = (result) => {
  if (result.confidence !== undefined) return result.confidence
  if (result.risk_percentage !== undefined) return result.risk_percentage
  return 0
}

export default Dashboard