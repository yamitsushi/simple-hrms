import User from "../models/Users";

import bcrypt from "bcrypt";

function postRegister(request, response) {
	const user = new User({
		username: request.body.username,
	});
	bcrypt.hash(request.body.password, 10, (_err, hash) => {
		user.password = hash;
		user.save();
		return response.send(user);
	});
}

function postLogin(request, response) {
	User.findOne({ username: request.body.username })
		.then((user) => {
			bcrypt.compare(request.body.password, user.password, (_error, result) => {
				if (result) return response.json(user);
				return response.status(401).json({
					title: "Login Failed",
					message: "Incorrect Password",
				});
			});
		})
		.catch((_err) => {
			return response.status(401).json({
				title: "Login Failed",
				message: "Incorrect Login Credentials",
			});
		});
}

export { postRegister, postLogin };
