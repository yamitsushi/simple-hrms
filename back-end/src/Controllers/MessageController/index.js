import { Router } from "express";

import getList from "./getList";
import getUserList from "./getUserList";
import createMessage from "./createMessage";

const Route = Router();

Route.get("/messages", getList);
Route.get("/messages/users", getUserList);
Route.post("/messages", createMessage);

export default Route;
