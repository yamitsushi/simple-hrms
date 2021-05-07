import Applicants from "../../models/Applicants";
import Authorize from "../library/authorize";
import Permission from "../library/permission";

import fs from "fs";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const applicant = await new Promise((resolved, reject) => {
			Applicants.findById(req.params.id, (err, data) => {
				if (err) return reject(err);
				return resolved(data);
			});
		});
		fs.unlinkSync(applicant.bio);

		await applicant.delete();

		return res.status(204).send();
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
