import User from "../../models/Users";
import pluckUserData from "./lib/pluckUserData";
import comparePassword from "./lib/comparePassword";

function blockRequest({ username, password }) {
	if (username && password) return false;
	return true;
}

async function findUser({ username }) {
	return await User.findOne({ username }).select("+password").exec();
}

export default async (req, res) => {
	if (blockRequest(req.body))
		return res.status(401).json({
			title: "Authentication Failed",
			message: "Account Lookup Failed",
		});

	try {
		let user = await findUser(req.body);
		await comparePassword(req.body.password, user.password);

		req.session.user = pluckUserData(user);

		return res.status(200).json(pluckUserData(user));
	} catch (err) {
		console.log(err);
		return res.status(401).json({
			title: "Authentication Failed",
			message: "Incorrect Login Credentials",
		});
	}
};
