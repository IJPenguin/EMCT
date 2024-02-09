const express = require("express");
const colors = require("@colors/colors");
const dotenv = require("dotenv").config();
const { report, r1 } = require("./routes/report");
const { upload } = require("./middleware/imageUpload");

const app = express();
const port = process.env.PORT || 6969;

app.route("/").get(upload.single("img"), [report, r1]);  

app.listen(port, () => {
	console.log(`Server is running on port ${port}`.cyan);
});
