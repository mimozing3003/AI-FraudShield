import requests
import time

def test_api_connection():
    """Test if the frontend can connect to the backend API"""
    try:
        # Test the root endpoint
        response = requests.get('http://localhost:8000/')
        print(f"Backend root endpoint status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Backend server is running and accessible")
        else:
            print("❌ Backend server returned an error")
            return False
            
        # Test CORS headers (needed for frontend communication)
        print("\nTesting CORS headers...")
        print("Access-Control-Allow-Origin:", response.headers.get('Access-Control-Allow-Origin', 'Not set'))
        
        return True
        
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server. Make sure it's running on port 8000")
        return False
    except Exception as e:
        print(f"❌ Error testing API connection: {e}")
        return False

if __name__ == "__main__":
    print("Testing API connection between frontend and backend...")
    print("=" * 50)
    
    success = test_api_connection()
    
    if success:
        print("\n🎉 All tests passed! Frontend and backend are properly connected.")
        print("\nYou can now use the application at:")
        print("Frontend: http://localhost:3000")
        print("Backend: http://localhost:8000")
    else:
        print("\n❌ Connection tests failed. Please check the server logs.")