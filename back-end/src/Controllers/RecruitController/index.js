import { Router } from "express";

import getJobs from "./getJobs";
import getApplicants from "./getApplicants";
import updateApplicant from "./updateApplicant";
import deleteApplicant from "./deleteApplicant";

const Route = Router();

Route.get("/recruitments", getJobs);
Route.get("/recruitments/:job/applicants", getApplicants);
Route.patch("/recruitments/applicants/:id", updateApplicant);
Route.delete("/recruitments/applicants/:id", deleteApplicant);

export default Route;
