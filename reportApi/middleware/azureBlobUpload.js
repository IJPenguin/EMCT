const uploadToBlob = async (
	blobServiceClient,
	containerName,
	imgName,
	imgPath,
	imgLink
) => {
	const containerClient = blobServiceClient.getContainerClient(containerName);
	const blobClient = containerClient.getBlockBlobClient(imgName);

	try {
		await blobClient.uploadFile(imgPath);
		console.log("Image uploaded to Blob");
		imgLink = blobClient.url;
	} catch (error) {
		console.log(error);
	}

	return imgLink;
};

module.exports = { uploadToBlob };
