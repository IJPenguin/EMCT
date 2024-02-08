import cv2
from darknet import Darknet

# Load YOLOv8 model
config_file = 'yolov8.cfg'
weights_file = 'yolov8.weights'
class_names = 'coco.names'
model = Darknet(config_file)
model.load_weights(weights_file)
model.load_class_names(class_names)

# Load image
image_file = 'image.jpg'
image = cv2.imread(image_file)

# Preprocess input
resized_image = cv2.resize(image, (model.width, model.height))

# Make predictions
predictions = model.predict(resized_image)

# Postprocess predictions
for pred in predictions:
    class_id, confidence, bbox = pred
    class_name = model.class_names[class_id]
    xmin, ymin, xmax, ymax = bbox
    cv2.rectangle(image, (int(xmin), int(ymin)), (int(xmax), int(ymax)), (0, 255, 0), 2)
    cv2.putText(image, f'{class_name}: {confidence:.2f}', (int(xmin), int(ymin) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Visualize results
cv2.imshow('YOLOv8 Predictions', image)
cv2.waitKey(0)
cv2.destroyAllWindows()
