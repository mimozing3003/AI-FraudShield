import React, { useState, useEffect } from 'react'
import ApiService from '../services/api'

const ApiTest = () => {
  const [status, setStatus] = useState('Testing...')
  const [details, setDetails] = useState('')

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test a simple connection to the backend
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
        
        const response = await fetch('http://localhost:8000/', { 
          method: 'GET',
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        
        if (response.ok) {
          setStatus('✅ Connected')
          setDetails('Frontend successfully connected to backend API')
        } else {
          setStatus('❌ Connection Error')
          setDetails(`Backend returned status ${response.status}`)
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          setStatus('❌ Timeout')
          setDetails('Connection timed out - backend may not be running')
        } else {
          setStatus('❌ Connection Failed')
          setDetails(`Error: ${error.message}`)
        }
      }
    }

    testConnection()
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      padding: '10px',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <strong>API Connection Status:</strong>
      <div>{status}</div>
      <div style={{ marginTop: '5px', color: '#6c757d' }}>{details}</div>
    </div>
  )
}

export default ApiTest