import express from "express";

import {
	postLogin,
	checkUser,
	postChangePassword,
	postLogout,
} from "../controllers/AuthController";

const Route = express.Router();

Route.get("/", checkUser);
Route.post("/login", postLogin);
Route.post("/change-password", postChangePassword);
Route.post("/logout", postLogout);

export default Route;
