import Users from "../../models/Users";
import authorize from "./libs/authorize";

export default async (req, res) => {
	try {
		await authorize(req.session.user);

		const users = await Users.find().select("name");

		res.json(users);
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};
