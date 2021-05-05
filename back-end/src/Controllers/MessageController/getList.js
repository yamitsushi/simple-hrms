import Rooms from "../../models/Rooms";
import authorize from "./libs/authorize";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		const rooms = await Rooms.find({
			users: { $in: req.session.user.id },
		})
			.populate("users", "name")
			.populate("lastMessages.sender", "name")
			.sort({ updatedAt: -1 });

		res.json(rooms);
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
