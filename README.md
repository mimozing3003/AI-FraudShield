# AI FraudShield

Advanced AI-powered fraud detection platform that can detect deepfakes, synthetic voices, and phishing attempts.

## Features

- **Deepfake Detection**: Analyze images and videos for AI-generated manipulations
- **Voice Authenticity**: Detect AI-generated synthetic voices in audio files
- **Phishing Detector**: Identify phishing URLs and email content using ML + rule-based approaches

## Installation

1. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart jinja2 onnxruntime librosa opencv-python numpy scikit-learn torch joblib
   ```

2. Create the required models:
   ```bash
   python create_models.py
   ```

## Running the Application

Start the server using uvicorn:
```bash
uvicorn app:app --reload
```

The application will be available at `http://localhost:8000`

## Usage

1. **Deepfake Detection**: Upload an image or video file to check for AI-generated manipulations
2. **Voice Authenticity**: Upload an audio file to detect synthetic voices
3. **Phishing Detector**: Enter a URL or text content to check for phishing attempts

## API Endpoints

- `POST /deepfake` - Deepfake detection for image/video files
- `POST /voicecheck` - Voice authenticity analysis for audio files
- `POST /phishingcheck` - Phishing detection for URLs/text content

## Technology Stack

- **Backend**: FastAPI, Python
- **Frontend**: HTML, CSS, JavaScript
- **ML Models**: ONNX (deepfake), PyTorch (voice), Scikit-learn (phishing)
- **Libraries**: OpenCV, Librosa, NumPy

## Project Structure

```
.
├── app.py              # Main FastAPI application
├── create_models.py    # Script to create dummy models
├── requirements.txt    # Python dependencies
├── static/             # CSS, JavaScript files
│   ├── style.css
│   └── script.js
├── templates/          # HTML templates
│   └── index.html
├── utils/              # Utility functions
│   ├── detectors.py
│   ├── model_loader.py
│   └── preprocess.py
├── models/             # ML models (created by create_models.py)
│   ├── deepfake_model.onnx
│   ├── phishing_model.pkl
│   └── voice_model.pth
└── README.md
```

## Author

Saumojit Roy - 2025