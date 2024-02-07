from ultralytics import YOLO
import cv2
# Load a model
model = YOLO(r'E:\EMCT\detector\runs\detect\train29\weights\last.pt')  # pretrained YOLOv8n model

# Run batched inference on a list of images
results = model('ishan.jpg')  # return a list of Results objects
# print(results)

# Process results list
x1, y1, x2, y2 = results
cv2.rectangle(results, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
    


    
    
    