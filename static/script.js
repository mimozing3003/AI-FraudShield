// AI FraudShield JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Deepfake form submission
    const deepfakeForm = document.getElementById('deepfake-form');
    if (deepfakeForm) {
        deepfakeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeDeepfake();
        });
    }

    // Voice form submission
    const voiceForm = document.getElementById('voice-form');
    if (voiceForm) {
        voiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeVoice();
        });
    }

    // Phishing form submission
    const phishingForm = document.getElementById('phishing-form');
    if (phishingForm) {
        phishingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzePhishing();
        });
    }
});

// Show loading state
function showLoading(container) {
    container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <span>Analyzing content...</span>
        </div>
    `;
    container.classList.remove('hidden');
}

// Show error state
function showError(container, message) {
    container.innerHTML = `<p class="error">Error: ${message}</p>`;
    container.classList.remove('hidden');
}

// Analyze deepfake
async function analyzeDeepfake() {
    const form = document.getElementById('deepfake-form');
    const fileInput = document.getElementById('deepfake-file');
    const resultContainer = document.getElementById('deepfake-result');
    
    // Validate file input
    if (!fileInput.files || fileInput.files.length === 0) {
        showError(resultContainer, "Please select a file to analyze.");
        return;
    }
    
    const file = fileInput.files[0];
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showError(resultContainer, "File size exceeds 10MB limit.");
        return;
    }
    
    const formData = new FormData(form);
    
    // Show loading state
    showLoading(resultContainer);
    
    try {
        const response = await fetch('/deepfake', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        displayDeepfakeResult(result);
    } catch (error) {
        showError(resultContainer, error.message);
    }
}

// Display deepfake result
function displayDeepfakeResult(result) {
    const resultContainer = document.getElementById('deepfake-result');
    
    const riskLevel = result.is_deepfake ? 'High' : 'Low';
    const riskClass = result.is_deepfake ? 'risk-high' : 'risk-low';
    const confidencePercent = Math.round(result.confidence * 100);
    const confidenceClass = confidencePercent > 70 ? 'high-confidence' : 
                           confidencePercent > 40 ? 'medium-confidence' : 'low-confidence';
    
    resultContainer.innerHTML = `
        <div class="${riskClass}">
            <div class="result-title">Detection Result</div>
            <p><strong>Risk Level:</strong> ${riskLevel}</p>
            <p><strong>Confidence:</strong> ${confidencePercent}%</p>
            <div class="confidence-bar">
                <div class="confidence-level ${confidenceClass}" style="width: 0%"></div>
            </div>
            <p><strong>Explanation:</strong> ${result.explanation}</p>
        </div>
    `;
    
    // Animate the confidence bar
    setTimeout(() => {
        const confidenceBar = resultContainer.querySelector('.confidence-level');
        confidenceBar.style.width = `${confidencePercent}%`;
    }, 100);
}

// Analyze voice
async function analyzeVoice() {
    const form = document.getElementById('voice-form');
    const fileInput = document.getElementById('voice-file');
    const resultContainer = document.getElementById('voice-result');
    
    // Validate file input
    if (!fileInput.files || fileInput.files.length === 0) {
        showError(resultContainer, "Please select a file to analyze.");
        return;
    }
    
    const file = fileInput.files[0];
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showError(resultContainer, "File size exceeds 10MB limit.");
        return;
    }
    
    const formData = new FormData(form);
    
    // Show loading state
    showLoading(resultContainer);
    
    try {
        const response = await fetch('/voicecheck', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        displayVoiceResult(result);
    } catch (error) {
        showError(resultContainer, error.message);
    }
}

// Display voice result
function displayVoiceResult(result) {
    const resultContainer = document.getElementById('voice-result');
    
    const riskLevel = result.is_fake ? 'High' : 'Low';
    const riskClass = result.is_fake ? 'risk-high' : 'risk-low';
    const confidencePercent = Math.round(result.confidence * 100);
    const confidenceClass = confidencePercent > 70 ? 'high-confidence' : 
                           confidencePercent > 40 ? 'medium-confidence' : 'low-confidence';
    
    resultContainer.innerHTML = `
        <div class="${riskClass}">
            <div class="result-title">Detection Result</div>
            <p><strong>Risk Level:</strong> ${riskLevel}</p>
            <p><strong>Confidence:</strong> ${confidencePercent}%</p>
            <div class="confidence-bar">
                <div class="confidence-level ${confidenceClass}" style="width: 0%"></div>
            </div>
            <p><strong>Explanation:</strong> ${result.explanation}</p>
        </div>
    `;
    
    // Animate the confidence bar
    setTimeout(() => {
        const confidenceBar = resultContainer.querySelector('.confidence-level');
        confidenceBar.style.width = `${confidencePercent}%`;
    }, 100);
}

// Analyze phishing
async function analyzePhishing() {
    const input = document.getElementById('phishing-input').value;
    const resultContainer = document.getElementById('phishing-result');
    
    if (!input.trim()) {
        showError(resultContainer, "Please enter a URL or text to analyze.");
        return;
    }
    
    // Show loading state
    showLoading(resultContainer);
    
    try {
        const response = await fetch('/phishingcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `input_text=${encodeURIComponent(input)}`
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        displayPhishingResult(result);
    } catch (error) {
        showError(resultContainer, error.message);
    }
}

// Display phishing result
function displayPhishingResult(result) {
    const resultContainer = document.getElementById('phishing-result');
    
    let riskClass = 'risk-low';
    if (result.risk_percentage > 70) {
        riskClass = 'risk-high';
    } else if (result.risk_percentage > 40) {
        riskClass = 'risk-medium';
    }
    
    const confidenceClass = result.risk_percentage > 70 ? 'high-confidence' : 
                          result.risk_percentage > 40 ? 'medium-confidence' : 'low-confidence';
    
    resultContainer.innerHTML = `
        <div class="${riskClass}">
            <div class="result-title">Detection Result</div>
            <p><strong>Risk Level:</strong> ${result.risk_level}</p>
            <p><strong>Risk Percentage:</strong> ${result.risk_percentage}%</p>
            <div class="confidence-bar">
                <div class="confidence-level ${confidenceClass}" style="width: 0%"></div>
            </div>
            <p><strong>Explanation:</strong> ${result.explanation}</p>
        </div>
    `;
    
    // Animate the confidence bar
    setTimeout(() => {
        const confidenceBar = resultContainer.querySelector('.confidence-level');
        confidenceBar.style.width = `${result.risk_percentage}%`;
    }, 100);
}