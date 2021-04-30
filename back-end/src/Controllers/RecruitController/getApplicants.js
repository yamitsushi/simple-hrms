import Applicants from "../../models/Applicants";
import Jobs from "../../models/Jobs";
import Authorize from "./libs/authorize";
import Permission from "./libs/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const job = await new Promise((resolved, reject) => {
			Jobs.findById(req.params.job, (err, data) => {
				if (err) return reject(err);
				return resolved(data);
			});
		});

		const applicants = await new Promise((resolved, reject) => {
			Applicants.find({ job: job.id }, (err, data) => {
				if (err) return reject(err);
				return resolved(data);
			});
		});

		return res.json(applicants);
	} catch (err) {
		res.send(err.message);
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		return res.status(401).send("Unauthorized");
	}
};
