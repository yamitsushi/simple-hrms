import Jobs from "../../models/Jobs";
import Authorize from "../library/authorize";
import Permission from "../library/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const jobs = await Jobs.find();

		return res.json(jobs);
	} catch (err) {
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		return res.status(401).send("Unauthorized");
	}
};
