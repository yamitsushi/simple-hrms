import socket from "socket.io";
import shared from "express-socket.io-session";
import session from "../plugins/session";
import Rooms from "../models/Rooms";
import Users from "../models/Users";

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

	websocket.on("connection", (socket) => {
		if (socket.handshake.session.user) {
			const id = socket.handshake.session.user.id;

			socket.on(`chat:${id}`, async (data) => {
				try {
					const user = await Users.findById(id);

					const room = await Rooms.findOneAndUpdate(
						{ _id: data, updated: { $ne: user } },
						{
							$push: { updated: user },
						},
						{ new: true }
					);
					websocket.sockets.emit(
						`update:${id}`,
						await room
							.populate("users", "name")
							.populate("lastMessage.sender", "name")
							.execPopulate()
					);
				} catch (err) {}
			});
		}
	});
};

export { websocket };
