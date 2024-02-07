const checkRequest = (req) => {
	// Check if all the required parameters are present
	if (
		!req.body.req_id ||
		!req.body.title ||
		!req.body.description ||
		!req.body.location ||
		!req.body.is_reported ||
		!req.body.time
	) {
		throw new Error("Request Missing Parameters");
	}

	// Type Checking

	if (typeof req.body.req_id !== "string") {
		throw new Error("Invalid Request ID");
	}

	if (typeof req.body.title !== "string") {
		throw new Error("Invalid Title");
	}

	if (typeof req.body.description !== "string") {
		throw new Error("Invalid Description");
	}

	if (typeof req.body.location !== "string") {
		throw new Error("Invalid Location");
	}

	if (typeof req.body.is_reported !== "string") {
		throw new Error("Invalid is_reported");
	}

	if (typeof req.body.time !== "string") {
		throw new Error("Invalid Time");
	}
};

function getCurrentDateTime() {
	let currentDate = new Date();
	let day = currentDate.getDate();
	let month = currentDate.getMonth() + 1;
	let year = currentDate.getFullYear();

	let hours = currentDate.getHours();
	let minutes = currentDate.getMinutes();
	let seconds = currentDate.getSeconds();

	day = day < 10 ? "0" + day : day;
	month = month < 10 ? "0" + month : month;
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	let formattedDateTime = `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;

	return formattedDateTime;
}
module.exports = { checkRequest, getCurrentDateTime };
