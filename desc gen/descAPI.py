import requests
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from flask import Flask, request, jsonify

app = Flask(__name__)

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large").to("cuda")

@app.route("/capgen", methods=["POST"])
def image_caption():
    try:
        img_url = request.json["img_url"]
        text = request.json.get("text", None)

        raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')

        if text:
            inputs = processor(raw_image, text, return_tensors="pt").to("cuda")
        else:
            inputs = processor(raw_image, return_tensors="pt").to("cuda")

        out = model.generate(**inputs)
        caption = processor.decode(out[0], skip_special_tokens=True)
        
        return jsonify({"caption": caption}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
