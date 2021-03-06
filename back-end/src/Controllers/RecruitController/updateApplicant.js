import Applicants from "../../models/Applicants";
import Authorize from "../library/authorize";
import Permission from "../library/permission";

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
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		return res.status(401).send("Unauthorized");
	}
};
