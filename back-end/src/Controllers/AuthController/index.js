import { Router } from "express";

import getCurrentUser from "./getCurrentUser";
import postChangePassword from "./postChangePassword";
import postLogin from "./postLogin";
import postLogout from "./postLogout";

const Routes = Router();

Routes.get("/", getCurrentUser);
Routes.post("/login", postLogin);
Routes.post("/change_password", postChangePassword);
Routes.post("/logout", postLogout);

export default Routes;
