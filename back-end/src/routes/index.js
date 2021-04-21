import express from "express";
import User from "../models/Users";

const routes = express.Router();

routes.get("/", (__request, response) => {
	response.send("Hello World");
});

routes.post("/login", async (request, response) => {
	const user = await User.findOne({
		username: request.body.username,
		password: request.body.password,
	});
	if (user) response.json(user);
	response.status(401).send("Authentication Failed");
});

export default routes;
