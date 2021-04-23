import User from "../models/Users";

import bcrypt from "bcrypt";

function checkUser(request, response) {
	response.json(request.session.user);
}

function postLogin(request, response) {
	if (!request.body.username)
		return response.status(401).json({
			title: "Username missing",
			message: "Please Input Username",
		});

	User.findOne({ username: request.body.username })
		.then((user) => {
			bcrypt.compare(request.body.password, user.password, (_error, result) => {
				if (result) {
					request.session.user = user.id;
					return response.json(user);
				}
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

function postLogout(request, response) {
	request.session.destroy();
	return response.json({ message: "logout successful" });
}

function postChangePassword(request, response) {
	if (request.body.password != request.body.confirm_password)
		return response
			.status(409)
			.json({ message: "confirm password do not match" });

	User.findById(request.session.user)
		.then((user) => {
			bcrypt.compare(
				request.body.old_password,
				user.password,
				(_error, result) => {
					if (result) {
						bcrypt.hash(request.body.password, 10, (_err, hash) => {
							User.findByIdAndUpdate(
								request.session.user,
								{ password: hash },
								(err) => {
									if (err) return res.status(500).send(err);
									return response
										.status(200)
										.json({ message: "Change password successfully" });
								}
							);
						});
					} else {
						return response.status(401).json({
							title: "Login Failed",
							message: "Incorrect Password",
						});
					}
				}
			);
		})
		.catch((_err) => {
			return response.status(401).json({
				title: "Login Failed",
				message: "Incorrect Login Credentials",
			});
		});
}

export { postLogin, checkUser, postLogout, postChangePassword };
