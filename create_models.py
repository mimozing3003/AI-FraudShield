"""
Script to create proper dummy models for the AI FraudShield application
"""
import os
import numpy as np
import onnx
from onnx import helper, TensorProto
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
import torch
import torch.nn as nn

def create_deepfake_model():
    """Create a more realistic dummy ONNX model for deepfake detection"""
    try:
        # Input: image features (simplified)
        X = helper.make_tensor_value_info('input', TensorProto.FLOAT, [1, 224, 224, 3])
        
        # Output: probability of being a deepfake (single value)
        Y = helper.make_tensor_value_info('output', TensorProto.FLOAT, [1, 1])
        
        # Create a simple network: Conv -> Global Average Pooling -> Dense -> Sigmoid
        # For simplicity, we'll create a model that just applies some operations
        nodes = [
            # Reshape to work with Conv
            helper.make_node('Reshape', inputs=['input', 'shape_const'], outputs=['reshaped']),
            # Simple operation to simulate processing
            helper.make_node('ReduceMean', inputs=['reshaped'], outputs=['mean'], axes=[1, 2]),
            # Dense layer simulation
            helper.make_node('Identity', inputs=['mean'], outputs=['output'])
        ]
        
        # Constants
        shape_const = helper.make_tensor('shape_const', TensorProto.INT64, [2], [1, -1])
        
        # Create graph
        graph_def = helper.make_graph(
            nodes,
            'deepfake-detection-model',
            [X],
            [Y],
            [shape_const]
        )
        
        # Create model
        model_def = helper.make_model(graph_def, producer_name='ai-fraudshield')
        
        # Save model
        os.makedirs('models', exist_ok=True)
        onnx.save(model_def, 'models/deepfake_model.onnx')
        print("✓ Created deepfake detection ONNX model")
        return True
    except Exception as e:
        print(f"✗ Error creating deepfake model: {e}")
        return False

def create_phishing_model():
    """Create a more realistic dummy sklearn model for phishing detection"""
    try:
        # Create a more realistic phishing detection model
        # Features: [has_https, domain_length, subdomain_depth, has_ip, has_suspicious_chars, 
        #            url_length, num_digits, num_special_chars, num_periods, num_slashes, 
        #            text_length, has_suspicious_keywords, num_exclamation, num_question, has_money_symbols]
        
        # Generate training data
        np.random.seed(42)
        n_samples = 1000
        
        # Create realistic feature distributions
        X = np.random.rand(n_samples, 15)
        
        # Make some features more discriminative
        # Features that are more indicative of phishing:
        X[:, 3] = np.random.beta(1, 5, n_samples)  # has_ip (rare in legitimate sites)
        X[:, 4] = np.random.beta(1, 4, n_samples)  # has_suspicious_chars (rare in legitimate)
        X[:, 12] = np.random.beta(1, 3, n_samples)  # num_exclamation (more in phishing)
        X[:, 14] = np.random.beta(1, 3, n_samples)  # has_money_symbols (more in phishing)
        
        # Create labels with some correlation to suspicious features
        y = ((X[:, 3] + X[:, 4] + X[:, 12] + X[:, 14]) + np.random.normal(0, 0.1, n_samples)) > 1.0
        y = y.astype(int)
        
        # Train a random forest model (more realistic than logistic regression for this task)
        model = RandomForestClassifier(n_estimators=10, random_state=42)
        model.fit(X, y)
        
        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(model, 'models/phishing_model.pkl')
        print("✓ Created phishing detection sklearn model")
        return True
    except Exception as e:
        print(f"✗ Error creating phishing model: {e}")
        return False

def create_voice_model():
    """Create a more realistic dummy PyTorch model for voice analysis"""
    try:
        # Create a simpler model that can be saved without issues
        model = torch.nn.Sequential(
            torch.nn.Linear(16, 64),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.3),
            torch.nn.Linear(64, 32),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.3),
            torch.nn.Linear(32, 2)
        )
        
        # Initialize weights
        for m in model.modules():
            if isinstance(m, torch.nn.Linear):
                torch.nn.init.xavier_uniform_(m.weight)
                torch.nn.init.constant_(m.bias, 0)
        
        # Save model
        os.makedirs('models', exist_ok=True)
        torch.save(model.state_dict(), 'models/voice_model.pth')
        print("✓ Created voice analysis PyTorch model")
        return True
    except Exception as e:
        print(f"✗ Error creating voice model: {e}")
        return False

def main():
    """Create all dummy models"""
    print("Creating dummy models for AI FraudShield...")
    
    success_count = 0
    total_count = 3
    
    if create_deepfake_model():
        success_count += 1
    
    if create_phishing_model():
        success_count += 1
        
    if create_voice_model():
        success_count += 1
    
    print(f"\nCreated {success_count}/{total_count} models successfully")
    
    if success_count == total_count:
        print("✓ All models created successfully!")
        print("\nModel files created:")
        print("  - models/deepfake_model.onnx  (ONNX model for deepfake detection)")
        print("  - models/phishing_model.pkl   (Scikit-learn model for phishing detection)")
        print("  - models/voice_model.pth      (PyTorch model for voice analysis)")
    else:
        print("⚠ Some models failed to create. Check error messages above.")

if __name__ == "__main__":
    main()