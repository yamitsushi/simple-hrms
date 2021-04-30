import { Router } from "express";
import multer from "multer";
import path from "path";

import getAvailableJobs from "./getAvailableJobs";
import submitApplication from "./submitApplication";

const Route = Router();

Route.get("/openings", getAvailableJobs);
Route.post(
	"/jobs/:id",
	multer({
		fileFilter: (_req, file, cb) => {
			if (path.extname(file.originalname).toLowerCase() === ".pdf")
				return cb(null, true);
			return cb(new Error("Only pdfs allowed"));
		},
		dest: "public/bios/",
	}).single("bio"),
	submitApplication
);

export default Route;
