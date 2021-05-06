import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import authorize from "./libs/authorize";

import { websocket } from "../../plugins/websocket";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		const room = await new Promise((resolved, reject) => {
			Rooms.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true },
				(err, data) => {
					if (err) return reject(err);
					if (!data) return reject("Missing");
					return resolved(data);
				}
			);
		});

		const message = await Messages.findOne(
			{ room: req.params.id },
			{ messages: { $slice: 0 } }
		);
		message.messages.push({
			text: `${req.session.user.name} modified the room`,
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
		console.log(err);
		return res.status(401).send("Unauthorized");
	}
};
