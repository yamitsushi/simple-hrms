import Applicants from "../../models/Applicants";
import Authorize from "./libs/authorize";
import Permission from "./libs/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const applicant = await new Promise((resolved, reject) => {
			Applicants.findByIdAndUpdate(
				req.params.id,
				{ ...req.body },
				{ new: true, omitUndefined: true },
				(err, data) => {
					if (err) return reject(err);
					return resolved(data);
				}
			);
		});

		return res.json(applicant);
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
