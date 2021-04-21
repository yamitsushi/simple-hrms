import Express from "express";
import Middlewares from "./middlewares";

const server = Express();

server.use(Express.json());

server.use(Middlewares);

export default server;
