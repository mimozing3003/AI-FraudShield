"""
This file is created to help Render detect the correct entry point for the application.
The actual application logic is in app.py.
"""

from app import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)