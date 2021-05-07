import Users from "../../models/Users";
import Authorize from "../library/authorize";
import Permission from "../library/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		const user = await new Promise((resolved, reject) => {
			Users.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true },
				(err, data) => {
					if (err) return reject(err);
					if (!data) return reject("Missing");
					return resolved(data);
				}
			);
		});

		return res.send(user);
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
		if (err.code === 11000)
			return res.status(409).json({
				title: "409 Duplicated data",
				message: "Account already exist",
			});
		return res.status(401).send("Unauthorized");
	}
};
