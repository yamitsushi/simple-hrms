import socket from "socket.io";
import shared from "express-socket.io-session";
import session from "../plugins/session";

let websocket;

export default (server) => {
	websocket = socket(server, {
		cors: {
			origin: "http://127.0.0.1:3000",
			methods: ["GET", "POST"],
			credentials: true,
		},
	});
	websocket.use(shared(session));
};

export { websocket };
