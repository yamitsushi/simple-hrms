import express from "express";

import AuthController from "../Controllers/AuthController";
import HRController from "../Controllers/HRController";
import JobsController from "../Controllers/JobsController";

const Route = express.Router();

Route.use("/", AuthController);

Route.use("/", HRController);

Route.use("/", JobsController);

export default Route;
