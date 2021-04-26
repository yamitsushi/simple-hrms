import Authorize from "./libs/authorize";
import Permission from "./libs/permission";

async function Process(req, res, next) {
	try {
		await Authorize(req.session.user);
		await Permission(req.session.user);
		return next();
	} catch (err) {
		if (err === "Forbidden")
			return res.status(403).json({
				title: "403 Forbidden",
				message: "Not authorized to continue",
			});
		return res.status(401).send("Unauthorized");
	}
}

export default {
	before: Process,
};
