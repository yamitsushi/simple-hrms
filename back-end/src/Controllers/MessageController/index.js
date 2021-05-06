import { Router } from "express";

import getList from "./getList";
import getUserList from "./getUserList";
import createMessage from "./createMessage";
import getMessages from "./getMessages";
import postMessage from "./postMessage";
import updateMessage from "./updateMessage";

const Route = Router();

Route.get("/messages", getList);
Route.get("/messages/users", getUserList);
Route.post("/messages", createMessage);
Route.get("/messages/:id", getMessages);
Route.post("/messages/:id", postMessage);
Route.patch("/messages/:id", updateMessage);

export default Route;
