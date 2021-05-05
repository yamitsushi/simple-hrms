import Messages from "../../models/Messages";
import authorize from "./libs/authorize";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		const messages = await Messages.findOne({ room: req.params.id })
			.populate("messages.sender", "name")
			.populate("room", "title");

		res.json(messages);
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
