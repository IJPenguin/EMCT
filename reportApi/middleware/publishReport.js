const postReportToDB = async (
	client,
	r_id,
	time,
	title,
	location,
	imgLink,
	description,
	is_reported
) => {
	try {
		const database = client.db("emctReports");
		const collection = database.collection("reports");

		const report = {
			reportId: r_id,
			reportTime: time,
			reportLocation: location,
			reportTitle: title,
			reportImgLink: imgLink,
			reportDescription: description,
			reportStatus: is_reported,
		};

		const result = await collection.insertOne(report);
	} catch (err) {
		console.log(err);
	} finally {
		client.close();
	}
};

module.exports = { postReportToDB };
