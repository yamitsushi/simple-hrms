import User from "../../models/Users";
import comparePassword from "./lib/comparePassword";

async function findCurrentUser({ id }) {
	return await User.findById(id).select("+password").exec();
}

function passwordNotMatch({ password, confirm_password }) {
	if (password != confirm_password) return true;
	return false;
}

export default async (req, res) => {
	if (passwordNotMatch(req.body))
		return res.status(409).json({
			title: "Password Mismatch",
			message: "Please Confirm Password",
		});
	try {
		if (!req.session.user) return res.status(401).send("Unauthorized");

		let user = await findCurrentUser(req.session.user);

		await comparePassword(req.body.old_password, user.password);

		user.password = req.body.password;

		await user.save();

		return res.status(204).send();
	} catch (err) {
		return res.status(409).json({
			title: "Change Password Failed",
			message: "Incorrect Current Password",
		});
	}
};
