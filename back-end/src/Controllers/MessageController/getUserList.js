import Users from "../../models/Users";

export default async (req, res) => {
	const users = await Users.find().select("name");

	res.json(users);
};
