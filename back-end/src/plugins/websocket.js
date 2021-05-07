import socket from "socket.io";
import shared from "express-socket.io-session";
import session from "../plugins/session";
import Rooms from "../models/Rooms";
import Users from "../models/Users";

let websocket;

export default (server) => {
	websocket = socket(server, {
		cors: {
			origin: process.env.FRONT_END_ORIGIN,
			methods: ["GET", "POST"],
			credentials: true,
		},
	});
	websocket.use(shared(session));

	websocket.on("connection", (socket) => {
		socket.on("chat", async (data) => {
			try {
				const id = socket.handshake.session.user.id;

				const user = await Users.findById(id);

				const room = await Rooms.findOneAndUpdate(
					{ _id: data.room, updated: { $ne: user } },
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
			} catch (err) {
				console.log(err);
			}
		});
	});
};

export { websocket };
