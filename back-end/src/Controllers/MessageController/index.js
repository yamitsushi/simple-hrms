import { Router } from "express";

import getList from "./getList";
import getUserList from "./getUserList";
import createMessage from "./createMessage";
import getMessages from "./getMessages";

const Route = Router();

Route.get("/messages", getList);
Route.get("/messages/users", getUserList);
Route.post("/messages", createMessage);
Route.get("/messages/:id", getMessages);

export default Route;
