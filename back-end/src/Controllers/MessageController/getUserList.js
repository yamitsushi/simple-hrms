import Users from "../../models/Users";
import Authorize from "../library/authorize";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);

		const users = await Users.find().select("name");

		res.json(users);
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
