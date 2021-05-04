import Rooms from "../../models/Rooms";

export default async (req, res) => {
	const rooms = await Rooms.find({
		users: { $in: req.session.user.id },
	})
		.populate("users", "name")
		.populate("lastMessages.sender", "name");

	res.json(rooms);
};
