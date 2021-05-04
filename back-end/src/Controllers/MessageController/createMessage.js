import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";

export default async (req, res) => {
	const room = await new Rooms({
		title: req.body.title,
		users: req.body.users,
		updated: [req.session.user.id],
	});

	const message = await new Messages({
		room: room,
		messages: {
			text: `${req.session.user.name} initiate a room`,
			sender: req.session.user.id,
		},
	});

	room.lastMessages = message.messages[0];

	await room.save();
	await message.save();

	res.send(
		await room
			.populate("users", "name")
			.populate("lastMessages.sender", "name")
			.execPopulate()
	);
};
