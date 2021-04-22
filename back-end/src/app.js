import Express from "express";
import cors from "cors";
import Routes from "./routes";
import Middlewares from "./middlewares";
import session from "./plugins/session";

const server = Express();

server.use(cors());
server.set("trust proxy", 1);
server.use(session);

server.use(Express.json());

server.use(Middlewares);
server.use(Routes);

export default server;
