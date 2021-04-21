import Express from "express";
import Routes from "./routes";
import Middlewares from "./middlewares";

const server = Express();

server.use(Express.json());

server.use(Middlewares);
server.use(Routes);

export default server;
