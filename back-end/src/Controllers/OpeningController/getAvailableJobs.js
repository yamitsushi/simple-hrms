import Jobs from "../../models/Jobs";

export default async (req, res) => {
	try {
		const jobs = await Jobs.find({ status: "Active" });

		return res.json(jobs);
	} catch (err) {
		return res.status(409).send("Error Found");
	}
};
