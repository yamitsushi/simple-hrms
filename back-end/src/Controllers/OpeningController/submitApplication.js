import Applicants from "../../models/Applicants";
import Jobs from "../../models/Jobs";

export default async (req, res) => {
	try {
		const job = await new Promise((resolved, reject) => {
			Jobs.findById(req.params.id, (err, data) => {
				if (err) return reject(err);
				return resolved(data);
			});
		});

		const application = await new Applicants({
			name: req.body.name,
			email: req.body.email,
			bio: req.file.destination + req.file.filename,
			job,
		});

		await application.save();

		return res.status(200).json(application);
	} catch (err) {
		return res.status(409).json({
			title: "409 Missing Data",
			message: "Data not found",
		});
	}
};
