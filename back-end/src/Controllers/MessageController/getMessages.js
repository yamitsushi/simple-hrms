import Messages from "../../models/Messages";
import Rooms from "../../models/Rooms";
import Users from "../../models/Users";
import authorize from "./libs/authorize";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		await Rooms.findByIdAndUpdate(req.params.id, {
			$push: { updated: await Users.findById(req.session.user.id) },
		});

		const messages = await Messages.findOne({ room: req.params.id })
			.populate("messages.sender", "name")
			.populate("room", "title");

		res.json(messages);
	} catch (err) {
		console.log(err);
		return res.status(401).send("Unauthorized");
	}
};
