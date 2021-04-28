import Users from "../../models/Users";
import Authorize from "./libs/authorize";
import Permission from "./libs/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const user = await new Users(req.body).save();

		return res.send(user);
	} catch (err) {
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		if (err.code === 11000)
			return res.status(409).json({
				title: "409 Duplicated data",
				message: "Account already exist",
			});
		return res.status(401).send("Unauthorized");
	}
};
