import { Router } from "express";
import Resource from "resourcejs";
import Users from "../../models/Users";

import getUsers from "./getUsers";
import createUser from "./createUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

const Route = Router();

Resource(Route, "", "staffs", Users)
	.index({ ...getUsers })
	.post({ ...createUser })
	.patch({ ...updateUser })
	.delete({ ...deleteUser });

export default Route;
