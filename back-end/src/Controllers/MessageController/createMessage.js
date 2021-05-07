import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import Authorize from "../library/authorize";

import { websocket } from "../../plugins/websocket";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);

		const room = await new Rooms({
			title: req.body.title,
			users: req.body.users,
		});

		const message = await new Messages({
			room: room,
			messages: {
				text: `${req.session.user.name} initiate a room`,
			},
		});

		room.lastMessage = message.messages[0];

		await room.save();
		await message.save();

		const tempRoom = await room.populate("users", "name").execPopulate();

		req.body.users.forEach((user) => {
			websocket.sockets.emit(`create:${user._id}`, tempRoom);
		});

		return res.status(204).send();
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
