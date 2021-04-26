import express from "express";

import AuthController from "../Controllers/AuthController";
import HRController from "../Controllers/HRController";

const Route = express.Router();

Route.use("/", AuthController);

Route.use("/", HRController);

export default Route;
