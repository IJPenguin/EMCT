from PIL import Image
from ultralytics import YOLO

# Load a pretrained YOLOv8n model
model = YOLO(r"E:\EMCT\detector\runs\detect\train2\weights\last.pt")

# Run inference on 'bus.jpg'
results = model(r'C:\Users\agniv\Downloads\112345-1582901887.jpg')  # results list

# Show the results
for r in results:
    im_array = r.plot()  # plot a BGR numpy array of predictions
    im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
    im.show()  # show image
    im.save('results.jpg')  # save image