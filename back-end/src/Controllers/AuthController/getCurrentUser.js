import pluckUserData from "./lib/pluckUserData";

export default (req, res) => {
	if (req.session.user)
		return res.status(200).json(pluckUserData(req.session.user));
	return res.status(401).send("Unauthorized");
};
