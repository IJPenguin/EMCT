const express = require("express");
const dotenv = require("dotenv").config();
const fs = require("fs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { uploadToBlob } = require("./middleware/azureBlobUpload");
const multer = require("multer");
const { storage } = require("./middleware/imageUpload");
const { checkRequest } = require("./middleware/check");

const app = express();
const port = process.env.PORT || 6969;

// Upload Middleware
const upload = multer({ storage: storage });

// Azure Blob Client
const blobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.STORAGE_ACCOUNT_CONNECTION_STRING
);

// Azure Blob Container Name
const containerName = process.env.CONTAINER_NAME;

// Report Route
app.route("/report").get(upload.single("img"), (req, res) => {
	//Type Checking the request
	try {
		checkRequest(req);
	} catch (err) {
		res.status(400).send("Bad Request");
		fs.appendFile(
			"../logs",
			`${Date.now()} - ${req.body.id} - Failed \n`,
			(err) => {
				if (err) throw err;
				console.log("Log Updated");
			}
		);
	}
	try {
		// Getting Image Details
		const imgPath = `${process.env.UPLOAD_PATH}/${req.file.originalname}`;
		const imgName = req.file.originalname;
		const imgLink = null;

		// Upload image to Blob
		uploadToBlob(
			blobServiceClient,
			containerName,
			imgName,
			imgPath,
			imgLink
		);

		// Send all the data to CosmosDB
		

		//Log the request
		// ?Dev - Use "appendFileSync" for frequent reqests
		fs.appendFile(
			"../logs",
			`${Date.now()} - ${req.body.id} - Successful \n`,
			(err) => {
				if (err) throw err;
				console.log("Log Updated");
			}
		);
		res.status(200).send("Report Created");
	} catch (error) {
		fs.appendFile(
			"../logs",
			`${Date.now()} - ${req.body.id} - Failed \n`,
			(err) => {
				if (err) throw err;
				console.log("Log Updated");
			}
		);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
