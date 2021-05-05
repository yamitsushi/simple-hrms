import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import authorize from "./libs/authorize";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

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
	} catch (err) {
		if (err.code === 11000)
			return res.status(409).json({
				title: "409 Duplicated data",
				message: "Account already exist",
			});
		return res.status(401).send("Unauthorized");
	}
};
