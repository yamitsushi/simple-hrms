import express from "express";

import { postLogin, checkUser } from "../controllers/AuthController";

const routes = express.Router();

routes.get("/", checkUser);

routes.post("/login", postLogin);

export default routes;
