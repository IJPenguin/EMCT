from ultralytics import YOLO

# Load a COCO-pretrained YOLOv8n model
model = YOLO('yolov8n.pt')

# Train the model on the Open Images V7 dataset
results = model.train(data=r"E:\EMCT\detector\datasets\openImagesv7.yaml", epochs=100, imgsz=640)