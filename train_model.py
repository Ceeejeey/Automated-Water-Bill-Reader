import os
import yaml
import time
import torch
from torch.nn import Sequential
from ultralytics import YOLO
from ultralytics.nn.tasks import DetectionModel

# Paths
MODEL_PATH = "yolov8n.pt"  # Pre-trained YOLOv8 Nano model
DATASET_PATH = "/home/gihan/Documents/waterBillReader/dataset"  # Adjust path as necessary

# Updated Data Config
data_config = {
    "train": os.path.join(DATASET_PATH, "train/images"),
    "val": os.path.join(DATASET_PATH, "valid/images"),
    "test": os.path.join(DATASET_PATH, "test/images"),
    "nc": 12,
    "names": ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'kwh']
}

# Save the updated config
data_config_path = os.path.join(DATASET_PATH, "data.yaml")
with open(data_config_path, "w") as file:
    yaml.dump(data_config, file)

# Register DetectionModel and Sequential as safe globals in PyTorch 2.6+
try:
    torch.serialization.add_safe_globals([DetectionModel, Sequential])
    print("DetectionModel and Sequential added to safe globals.")
except AttributeError:
    print("Safe globals not available. Proceeding without it.")

def train_model():
    """ Train the YOLOv8 model with the given dataset and configurations. """
    # Check if model path exists
    if not os.path.exists(MODEL_PATH):
        print(f"Model file not found at {MODEL_PATH}. Downloading YOLOv8n model...")
        os.system(f"wget https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt -O {MODEL_PATH}")

    print("\nStarting Training...")

    # Start time
    start_time = time.time()

    # Initialize model
    try:
        # Load the model
        model = YOLO(MODEL_PATH)  # Only the model path is required
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    # Training Configuration
    try:
        model.train(
            data=data_config_path,
            epochs=150,
            batch=16,
            imgsz=640,
            device="cpu",  # Change to "cuda" if GPU is available
            optimizer="SGD",
            lr0=0.001,
            lrf=0.01,
            weight_decay=0.0005,
            patience=10,
            augment=True,
            mosaic=0.7,
            mixup=0.2,
            project="WaterMeter_Training",
            name="water_meter_model",
            verbose=True
        )
    except Exception as e:
        print(f"Error during training: {e}")
        return

    # Track training time
    end_time = time.time()
    training_time = end_time - start_time
    hours = training_time // 3600
    minutes = (training_time % 3600) // 60
    seconds = training_time % 60

    print(f"\nTraining completed in {int(hours)}h {int(minutes)}m {int(seconds)}s\n")

    # Evaluate the model
    evaluate_model(model)

def evaluate_model(model):
    """ Evaluate model on validation and test datasets. """
    print("\nEvaluating model accuracy on validation dataset...\n")
    try:
        val_results = model.val(
            data=data_config_path,
            imgsz=640,
            device="cpu",
            batch=8
        )

        print("\nValidation Evaluation Results:")
        print(f"Precision: {val_results['metrics/precision']:.4f}")
        print(f"Recall: {val_results['metrics/recall']:.4f}")
        print(f"mAP50: {val_results['metrics/mAP50']:.4f}")
        print(f"mAP50-95: {val_results['metrics/mAP50-95']:.4f}")

        print("\nEvaluating model accuracy on test dataset...\n")
        test_results = model.val(
            data=data_config_path,
            split="test",
            imgsz=640,
            device="cpu",
            batch=8
        )

        print("\nTest Evaluation Results:")
        print(f"Precision: {test_results['metrics/precision']:.4f}")
        print(f"Recall: {test_results['metrics/recall']:.4f}")
        print(f"mAP50: {test_results['metrics/mAP50']:.4f}")
        print(f"mAP50-95: {test_results['metrics/mAP50-95']:.4f}")

    except Exception as e:
        print(f"Error during evaluation: {e}")

if __name__ == "__main__":
    train_model()
