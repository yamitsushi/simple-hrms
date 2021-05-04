import { Router } from "express";

import getList from "./getList";
import createMessage from "./createMessage";

const Route = Router();

Route.get("/messages", getList);
Route.post("/messages", createMessage);

export default Route;
