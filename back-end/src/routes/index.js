import express from "express";

import AuthController from "../Controllers/AuthController";
import HRController from "../Controllers/HRController";
import JobsController from "../Controllers/JobsController";

import OpeningController from "../Controllers/OpeningController";
import RecruitController from "../Controllers/RecruitController";

import MessageController from "../Controllers/MessageController";

const Route = express.Router();

Route.use("/", AuthController);

Route.use("/", HRController);

Route.use("/", JobsController);

Route.use("/", OpeningController);

Route.use("/", RecruitController);

Route.use("/", MessageController);

export default Route;
