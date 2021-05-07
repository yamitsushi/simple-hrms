import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import Authorize from "../library/authorize";

import { websocket } from "../../plugins/websocket";
import Users from "../../models/Users";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);

		const room = await Rooms.findById(req.params.id);

		const user = await Users.findById(req.session.user.id);

		const message = await Messages.findOne(
			{ room: room._id },
			{ messages: { $slice: 0 } }
		);
		message.messages.push({
			text: req.body.message,
			sender: user,
		});
		await message.save();

		room.lastMessage = message.messages[0];
		room.updated = [];
		await room.save();

		const send = await room.populate("users", "name").execPopulate();

		room.users.forEach((user) => {
			websocket.sockets.emit(`update:${user._id}`, send);
		});

		const emit = await message
			.populate("messages.sender", "name")
			.execPopulate();

		websocket.sockets.emit(`chat:${message.room}`, emit.messages[0]);

		return res.status(204).send();
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
