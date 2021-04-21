const express = require("express");
const server = express();

const indexRouter = require("./routes");

server.use(express.static("public"));

server.use("/", indexRouter);

let listener = server.listen(
	process.env.EXPRESS_PORT || 3001,
	process.env.EXPRESS_HOST || "127.0.0.1",
	() => {
		console.log(
			`Listening to ${listener.address().address}:${listener.address().port}`
		);
	}
);
