const express = require("express");
const colors = require("@colors/colors");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 6969;

app.route("/").put();

app.get("/", (req, res) => {
    res.send("Penguin Pro🐧")
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`.cyan);
});
