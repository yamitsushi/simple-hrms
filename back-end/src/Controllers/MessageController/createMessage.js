import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import authorize from "./libs/authorize";

import { websocket } from "../../plugins/websocket";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

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

		room.lastMessages = message.messages[0];

		await room.save();
		await message.save();

		req.body.users.forEach((user) => {
			websocket.sockets.emit(`create:${user._id}`, room);
		});

		res.send(
			await room
				.populate("users", "name")
				.populate("lastMessages.sender", "name")
				.execPopulate()
		);
	} catch (err) {
		console.log(err);
		if (err.code === 11000)
			return res.status(409).json({
				title: "409 Duplicated data",
				message: "Account already exist",
			});
		return res.status(401).send("Unauthorized");
	}
};
