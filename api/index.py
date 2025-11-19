import os
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from typing import Optional
import logging
import traceback

from utils.detectors import detect_deepfake, detect_voice_fake, detect_phishing

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI FraudShield", description="Advanced AI-powered fraud detection platform by Saumojit Roy 2025")

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("templates/index.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content, status_code=200)

@app.post("/deepfake")
async def deepfake_check(file: UploadFile = File(...)):
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "video/avi", "video/mov"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload an image or video file.")
    
    # Save uploaded file temporarily
    file_location = f"temp_{file.filename}"
    try:
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        
        # Process the file
        result = detect_deepfake(file_location)
        
        # Log the result
        logger.info(f"Deepfake detection result for {file.filename}: {result}")
        
        return result
    except Exception as e:
        logger.error(f"Error processing deepfake detection: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(file_location):
            os.remove(file_location)

@app.post("/voicecheck")
async def voice_check(file: UploadFile = File(...)):
    # Validate file type
    allowed_types = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload an audio file.")
    
    # Save uploaded file temporarily
    file_location = f"temp_{file.filename}"
    try:
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        
        # Process the file
        result = detect_voice_fake(file_location)
        
        # Log the result
        logger.info(f"Voice detection result for {file.filename}: {result}")
        
        return result
    except Exception as e:
        logger.error(f"Error processing voice detection: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing audio file: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(file_location):
            os.remove(file_location)

@app.post("/phishingcheck")
async def phishing_check(input_text: str = Form(...)):
    if not input_text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")
    
    if len(input_text) > 10000:  # 10KB limit
        raise HTTPException(status_code=400, detail="Input text is too long. Maximum 10,000 characters allowed.")
    
    try:
        result = detect_phishing(input_text)
        
        # Log the result
        logger.info(f"Phishing detection result: {result}")
        
        return result
    except Exception as e:
        logger.error(f"Error processing phishing detection: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error analyzing input: {str(e)}")

# Vercel serverless function handler
@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)