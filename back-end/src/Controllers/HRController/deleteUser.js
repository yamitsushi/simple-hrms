import Users from "../../models/Users";
import Authorize from "../library/authorize";
import Permission from "../library/permission";

export default async (req, res) => {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);

		await new Promise((resolved, reject) => {
			Users.findByIdAndDelete(req.params.id, (err, data) => {
				if (err) return reject(err);
				resolved(data);
			});
		});

		return res.status(204).send();
	} catch (err) {
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		return res.status(401).send("Unauthorized");
	}
};
