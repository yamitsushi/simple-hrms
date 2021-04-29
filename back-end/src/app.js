import Express from "express";
import cors from "./plugins/cors";
import Routes from "./routes";
import Middlewares from "./middlewares";
import session from "./plugins/session";

const server = Express();
server.set("trust proxy", 1);
server.use(session);
server.use(cors);
server.use(Express.json());

server.use("/public", Express.static("public"));

server.use(Middlewares);
server.use(Routes);

export default server;
