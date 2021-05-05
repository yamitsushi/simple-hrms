import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import Users from "../../models/Users";
import authorize from "./libs/authorize";

import { websocket } from "../../plugins/websocket";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		const room = await Rooms.findOneAndUpdate(
			{ _id: req.params.id, updated: { $ne: req.session.user.id } },
			{
				$push: { updated: await Users.findById(req.session.user.id) },
			},
			{ new: true }
		);

		const messages = await Messages.findOne({ room: req.params.id })
			.populate("messages.sender", "name")
			.populate("room", "title");

		if (room)
			room.users.forEach((user) => {
				websocket.sockets.emit(`update:${user._id}`, room);
			});

		res.json(messages);
	} catch (err) {
		console.log(err);
		return res.status(401).send("Unauthorized");
	}
};
