// API service to communicate with the backend
const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  // Deepfake detection
  async detectDeepfake(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/deepfake`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
  
  // Voice authenticity detection
  async detectVoice(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/voicecheck`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
  
  // Phishing detection
  async detectPhishing(text) {
    const formData = new FormData();
    formData.append('input_text', text);
    
    const response = await fetch(`${API_BASE_URL}/phishingcheck`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
}

export default new ApiService();