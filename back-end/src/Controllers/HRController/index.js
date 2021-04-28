import { Router } from "express";

import getUsers from "./getUsers";
import createUser from "./createUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

const Route = Router();

Route.get("/staffs", getUsers);
Route.post("/staffs", createUser);
Route.patch("/staffs/:id", updateUser);
Route.delete("/staffs/:id", deleteUser);

export default Route;
