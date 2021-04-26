import express from "express";

import AuthController from "../controllers/AuthController";

const Route = express.Router();

Route.use("/", AuthController);

export default Route;
