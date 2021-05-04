import "dotenv/config";
import "./plugins/mongoose";
import app from "./app";
import websocket from "./plugins/websocket";

let listener = app.listen(
	process.env.EXPRESS_PORT || 3000,
	process.env.EXPRESS_HOST || "127.0.0.1",
	() => {
		console.log(
			`Listening to ${listener.address().address}:${listener.address().port}`
		);
	}
);

websocket(listener);
