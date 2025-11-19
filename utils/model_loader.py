import onnxruntime as ort
import torch
import joblib
import os
import numpy as np

class ModelLoader:
    """Utility class for loading various ML models"""
    
    @staticmethod
    def load_onnx_model(model_path):
        """
        Load ONNX model for inference
        
        Args:
            model_path (str): Path to the ONNX model file
            
        Returns:
            onnxruntime.InferenceSession: Loaded ONNX model
        """
        if not os.path.exists(model_path):
            print(f"Model {model_path} not found.")
            return None
            
        try:
            session = ort.InferenceSession(model_path)
            return session
        except Exception as e:
            print(f"Error loading ONNX model: {e}")
            return None
    
    @staticmethod
    def load_pytorch_model(model_path):
        """
        Load PyTorch model for inference
        
        Args:
            model_path (str): Path to the PyTorch model file
            
        Returns:
            torch.nn.Module: Loaded PyTorch model
        """
        if not os.path.exists(model_path):
            print(f"Model {model_path} not found.")
            return None
            
        try:
            # Create model architecture
            model = torch.nn.Sequential(
                torch.nn.Linear(16, 64),
                torch.nn.ReLU(),
                torch.nn.Dropout(0.3),
                torch.nn.Linear(64, 32),
                torch.nn.ReLU(),
                torch.nn.Dropout(0.3),
                torch.nn.Linear(32, 2)
            )
            
            # Load state dict
            state_dict = torch.load(model_path, map_location=torch.device('cpu'))
            model.load_state_dict(state_dict)
            model.eval()
            return model
        except Exception as e:
            print(f"Error loading PyTorch model: {e}")
            return None
    
    @staticmethod
    def load_sklearn_model(model_path):
        """
        Load Scikit-learn model for inference
        
        Args:
            model_path (str): Path to the sklearn model file
            
        Returns:
            sklearn model: Loaded sklearn model
        """
        if not os.path.exists(model_path):
            print(f"Model {model_path} not found.")
            return None
            
        try:
            model = joblib.load(model_path)
            return model
        except Exception as e:
            print(f"Error loading sklearn model: {e}")
            return None
    
    @staticmethod
    def create_dummy_models():
        """
        Create simple dummy models for demonstration purposes
        """
        # Create dummy ONNX model
        try:
            import onnx
            from onnx import helper, TensorProto
            
            # Create a simple model that just returns a fixed output
            X = helper.make_tensor_value_info('X', TensorProto.FLOAT, [1, 3])
            Y = helper.make_tensor_value_info('Y', TensorProto.FLOAT, [1, 1])
            
            node_def = helper.make_node(
                'Identity',
                inputs=['X'],
                outputs=['Y']
            )
            
            graph_def = helper.make_graph(
                [node_def],
                'dummy-model',
                [X],
                [Y]
            )
            
            model_def = helper.make_model(graph_def, producer_name='ai-fraudshield')
            
            # Save the model
            onnx.save(model_def, 'models/deepfake_model.onnx')
            print("Created dummy ONNX model")
        except Exception as e:
            print(f"Could not create dummy ONNX model: {e}")
        
        # Create dummy sklearn model
        try:
            from sklearn.linear_model import LogisticRegression
            import numpy as np
            
            # Create a simple dummy model
            model = LogisticRegression()
            X = np.random.rand(10, 10)
            y = np.random.randint(0, 2, 10)
            model.fit(X, y)
            
            # Save the model
            joblib.dump(model, 'models/phishing_model.pkl')
            print("Created dummy sklearn model")
        except Exception as e:
            print(f"Could not create dummy sklearn model: {e}")
        
        # Create dummy PyTorch model
        try:
            import torch.nn as nn
            
            class DummyModel(nn.Module):
                def __init__(self):
                    super(DummyModel, self).__init__()
                    self.fc = nn.Linear(10, 2)
                
                def forward(self, x):
                    return self.fc(x)
            
            model = DummyModel()
            torch.save(model.state_dict(), 'models/voice_model.pth')
            print("Created dummy PyTorch model")
        except Exception as e:
            print(f"Could not create dummy PyTorch model: {e}")