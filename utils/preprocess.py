import cv2
import numpy as np
import librosa
import re
from urllib.parse import urlparse

def preprocess_image(image_path, target_size=(224, 224)):
    """
    Preprocess image for deepfake detection model
    
    Args:
        image_path (str): Path to the image file
        target_size (tuple): Target size for the model input
        
    Returns:
        np.array: Preprocessed image array
    """
    try:
        # Read image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Could not read image")
        # Convert BGR to RGB
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        # Resize to target size
        image = cv2.resize(image, target_size)
        # Normalize pixel values
        image = image.astype(np.float32) / 255.0
        # Add batch dimension
        image = np.expand_dims(image, axis=0)
        return image
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        # Return a dummy array for demonstration
        return np.random.rand(1, *target_size, 3).astype(np.float32)

def preprocess_video_frame(frame, target_size=(224, 224)):
    """
    Preprocess a video frame for deepfake detection model
    
    Args:
        frame (np.array): Video frame
        target_size (tuple): Target size for the model input
        
    Returns:
        np.array: Preprocessed frame array
    """
    try:
        # Convert BGR to RGB if needed
        if len(frame.shape) == 3 and frame.shape[2] == 3:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        # Resize to target size
        frame = cv2.resize(frame, target_size)
        # Normalize pixel values
        frame = frame.astype(np.float32) / 255.0
        # Add batch dimension
        frame = np.expand_dims(frame, axis=0)
        return frame
    except Exception as e:
        print(f"Error preprocessing frame: {e}")
        # Return a dummy array for demonstration
        return np.random.rand(1, *target_size, 3).astype(np.float32)

def extract_audio_features(audio_path, n_mfcc=13):
    """
    Extract MFCC and spectral features from audio file
    
    Args:
        audio_path (str): Path to the audio file
        n_mfcc (int): Number of MFCC features to extract
        
    Returns:
        dict: Dictionary containing extracted features
    """
    try:
        # Load audio file
        y, sr = librosa.load(audio_path, sr=None)
        
        # Extract MFCC features
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
        mfccs_mean = np.mean(mfccs.T, axis=0)
        
        # Extract spectral features
        spectral_centroids = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))
        spectral_rolloff = np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))
        zero_crossing_rate = np.mean(librosa.feature.zero_crossing_rate(y))
        
        # Combine features
        features = np.hstack([mfccs_mean, spectral_centroids, spectral_rolloff, zero_crossing_rate])
        
        return {
            'features': features,
            'mfccs': mfccs_mean,
            'spectral_centroids': spectral_centroids,
            'spectral_rolloff': spectral_rolloff,
            'zero_crossing_rate': zero_crossing_rate
        }
    except Exception as e:
        print(f"Error extracting audio features: {e}")
        # Return dummy features for demonstration
        dummy_features = np.random.rand(n_mfcc + 3)
        return {
            'features': dummy_features,
            'mfccs': dummy_features[:n_mfcc],
            'spectral_centroids': dummy_features[n_mfcc],
            'spectral_rolloff': dummy_features[n_mfcc+1],
            'zero_crossing_rate': dummy_features[n_mfcc+2]
        }

def extract_text_features(text):
    """
    Extract lexical and domain features from text/URL for phishing detection
    
    Args:
        text (str): Input text or URL
        
    Returns:
        dict: Dictionary containing extracted features
    """
    features = {}
    
    # Initialize all features to 0
    feature_names = ['has_https', 'domain_length', 'subdomain_depth', 'has_ip', 
                    'has_suspicious_chars', 'url_length', 'num_digits', 'num_special_chars', 
                    'num_periods', 'num_slashes', 'text_length', 'has_suspicious_keywords', 
                    'num_exclamation', 'num_question', 'has_money_symbols']
    
    for name in feature_names:
        features[name] = 0
    
    # Check if input is URL
    is_url = bool(re.match(r'^https?://', text))
    
    if is_url:
        try:
            parsed = urlparse(text)
            domain = parsed.netloc.lower()
            
            # Domain features
            features['has_https'] = 1 if text.startswith('https') else 0
            features['domain_length'] = len(domain)
            features['subdomain_depth'] = domain.count('.') if domain else 0
            features['has_ip'] = 1 if re.search(r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b', domain) else 0
            features['has_suspicious_chars'] = 1 if re.search(r'[@\-_\.]{2,}', domain) else 0
            
            # Lexical features
            features['url_length'] = len(text)
            features['num_digits'] = len(re.findall(r'\d', text))
            features['num_special_chars'] = len(re.findall(r'[!@#$%^&*(),.?":{}|<>]', text))
            features['num_periods'] = text.count('.')
            features['num_slashes'] = text.count('/')
        except Exception as e:
            print(f"Error parsing URL: {e}")
            # Default features
            features.update({
                'has_https': 0, 'domain_length': len(text), 'subdomain_depth': 0,
                'has_ip': 0, 'has_suspicious_chars': 0, 'url_length': len(text),
                'num_digits': 0, 'num_special_chars': 0, 'num_periods': 0, 'num_slashes': 0
            })
    else:
        # Text features (for email content)
        features['text_length'] = len(text)
        features['num_digits'] = len(re.findall(r'\d', text))
        features['num_special_chars'] = len(re.findall(r'[!@#$%^&*(),.?":{}|<>]', text))
        features['has_suspicious_keywords'] = 1 if any(word in text.lower() for word in 
                                                     ['urgent', 'verify', 'account', 'password', 'click']) else 0
        features['num_exclamation'] = text.count('!')
        features['num_question'] = text.count('?')
        features['has_money_symbols'] = 1 if any(symbol in text for symbol in ['$','€','£','¥']) else 0
    
    return features