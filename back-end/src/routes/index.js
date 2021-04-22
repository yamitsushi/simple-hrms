import express from "express";

import { postLogin, postRegister } from "../controllers/AuthController";

const routes = express.Router();

routes.get("/", postRegister);

routes.post("/login", postLogin);

export default routes;
