from ultralytics import YOLO

# Load a model
model = YOLO(r"E:\EMCT\detector\runs\detect\train3\weights\last.pt")  # load a partially trained model

# Resume training
results = model.train(resume=True)