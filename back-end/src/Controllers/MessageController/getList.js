import Rooms from "../../models/Rooms";
import Authorize from "../library/authorize";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);

		const rooms = await Rooms.find({
			users: { $in: req.session.user.id },
		})
			.sort({ updatedAt: -1 })
			.populate("lastMessage.sender", "name")
			.populate("users", "name");

		res.json(rooms);
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
