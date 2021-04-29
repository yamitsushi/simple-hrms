import Jobs from "../../models/Jobs";
import Authorize from "./libs/authorize";
import Permission from "./libs/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const job = await Jobs.findById(req.params.id);

		return res.status(200).json(job);
	} catch (err) {
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		if (err === "Missing")
			return res.status(409).json({
				title: "409 Missing Data",
				message: "Data not found",
			});
		return res.status(401).send("Unauthorized");
	}
};
