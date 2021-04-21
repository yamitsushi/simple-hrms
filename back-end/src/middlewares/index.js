import express from "express";
import cors from "cors";

const middleware = express.Router();

middleware.use(cors());

export default middleware;
