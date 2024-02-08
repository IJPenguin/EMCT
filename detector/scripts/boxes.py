from PIL import Image, ImageDraw
from ultralytics import YOLO

# Load a pretrained YOLOv8n model
model = YOLO(r'E:\EMCT\detector\runs\detect\train29\weights\last.pt')

# Run inference on an image
results = model('00.jpg')  # results list

# Load the original image
image = Image.open('00.jpg')

# Draw bounding boxes on the image
draw = ImageDraw.Draw(image)
for box in results.xyxy[0]:
    xmin, ymin, xmax, ymax = box
    draw.rectangle([xmin, ymin, xmax, ymax], outline='red', width=3)

# Save the annotated image
image.save('annotated_image.jpg')

# Optionally, display the annotated image
image.show()
