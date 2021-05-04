import socket from "socket.io";
import shared from "express-socket.io-session";
import session from "../plugins/session";

export default (server) => {
	const io = socket(server, {
		cors: {
			origin: "http://127.0.0.1:3000",
			methods: ["GET", "POST"],
			credentials: true,
		},
	});
	io.use(shared(session));
};
