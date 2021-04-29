import Jobs from "../../models/Jobs";
import Authorize from "./libs/authorize";
import Permission from "./libs/permission";

import uniqid from "uniqid";
import fs from "fs";
import { promisify } from "util";

const open = promisify(fs.open);
const write = promisify(fs.writeFile);
const close = promisify(fs.close);

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const job = await new Jobs({
			title: req.body.title,
			description: "public/jobs/" + uniqid(),
		});

		const fileManager = await open(job.description, "wx");
		await write(fileManager, req.body.description);
		await close(fileManager);

		await job.save();

		return res.send(job);
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
