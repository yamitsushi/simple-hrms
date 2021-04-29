import { Router } from "express";
import multer from "multer";

import getJobs from "./getJobs";
import createJob from "./createJob";
import updateJob from "./updateJob";
import getJobDetail from "./getJobDetail";

const Route = Router();

Route.get("/jobs", getJobs);
Route.post("/jobs", multer().none(), createJob);
Route.patch("/jobs/:id", multer().none(), updateJob);
Route.get("/jobs/:id", getJobDetail);

export default Route;
