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

	if (typeof req.body.is_reported !== "boolean") {
		throw new Error("Invalid is_reported");
	}

	if (typeof req.body.time !== "string") {
		throw new Error("Invalid Time");
	}
};

module.exports = { checkRequest };
