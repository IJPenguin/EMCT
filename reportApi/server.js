const express = require("express");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();
const { BlobServiceClient } = require("@azure/storage-blob");
const multer = require("multer");

const { checkRequest, getCurrentDateTime } = require("./utils");
const { uploadToBlob } = require("./middleware/azureBlobUpload");
const { storage } = require("./middleware/imageUpload");
const { postReportToDB } = require("./middleware/publishReport");

const app = express();
const port = process.env.PORT || 6969;
const logFilePath = process.env.LOG_FILE_PATH;

// Upload Middleware
const upload = multer({ storage: storage });

// Azure Blob Client
const blobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.STORAGE_ACCOUNT_CONNECTION_STRING
);

// Azure Blob Container Name
const containerName = process.env.CONTAINER_NAME;

// MongoDB
const connectionString = process.env.DB_CONNECTION_STRING;
const mongoClient = new MongoClient(connectionString);

// Report Route
app.route("/report").post(upload.single("img"), async (req, res) => {
	//Type Checking the request
	try {
		checkRequest(req);
	} catch (err) {
		res.status(400).send("Bad Request");
		fs.appendFile(
			logFilePath,
			`${getCurrentDateTime()} - ${req.body.req_id} - Failed \n`,
			(err) => {
				if (err) {
					console.error(`Error appending to ${logFilePath}:`, err);
					throw err;
				}
				console.log("Log entry appended successfully.");
			}
		);
		return;
	}
	try {
		// Getting Image Details
		const imgPath = `${process.env.UPLOAD_PATH}/${req.file.originalname}`;
		const imgName = req.file.originalname;
		let imgLink = null;
		let result = null;

		// Upload image to Blob
		imgLink = await uploadToBlob(
			blobServiceClient,
			containerName,
			imgName,
			imgPath,
			imgLink
		);

		await postReportToDB(
			mongoClient,
			req.body.req_id,
			req.body.time,
			req.body.title,
			req.body.location,
			imgLink,
			req.body.description,
			req.body.is_reported
		);

		//Log the request
		fs.appendFile(
			logFilePath,
			`${getCurrentDateTime()} - ${req.body.req_id} - Successful \n`,
			(err) => {
				if (err) {
					console.error(`Error appending to ${logFilePath}:`, err);
					throw err;
				}
				console.log("Log entry appended successfully.");
			}
		);
		res.status(200).send("Report Created");
	} catch (error) {
		fs.appendFile(
			logFilePath,
			`${getCurrentDateTime()} - ${req.body.req_id} - Failed \n`,
			(err) => {
				if (err) {
					console.error(`Error appending to ${logFilePath}:`, err);
					throw err;
				}
				console.log("Log entry appended successfully.");
			}
		);

		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
