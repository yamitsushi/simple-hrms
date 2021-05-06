import { Router } from "express";
import multer from "multer";
import path from "path";

import getList from "./getList";
import getUserList from "./getUserList";
import createMessage from "./createMessage";
import getMessages from "./getMessages";
import postMessage from "./postMessage";
import updateMessage from "./updateMessage";
import postFile from "./postFile";

const Route = Router();

Route.get("/messages", getList);
Route.get("/messages/users", getUserList);
Route.post("/messages", createMessage);
Route.get("/messages/:id", getMessages);
Route.post("/messages/:id", postMessage);
Route.post(
	"/messages/:id/file",
	multer({
		fileFilter: (_req, file, cb) => {
			if (path.extname(file.originalname).toLowerCase() === ".pdf")
				return cb(null, true);
			return cb(new Error("Only pdfs allowed"));
		},
		dest: "public/chat/",
	}).single("document"),
	postFile
);
Route.patch("/messages/:id", updateMessage);

export default Route;
