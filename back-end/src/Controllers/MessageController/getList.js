import Rooms from "../../models/Rooms";
import authorize from "./libs/authorize";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		const rooms = await Rooms.find({
			users: { $in: req.session.user.id },
		})
			.sort({ updatedAt: -1 })
			.populate("lastMessage.sender", "name")
			.populate("users", "name");
		console.log(rooms);

		res.json(rooms);
	} catch (err) {
		console.log(err);
		return res.status(401).send("Unauthorized");
	}
};
