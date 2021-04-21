import Express from "express";

const server = Express();

server.get("/", (__request, response) => {
	response.send("Hello World");
});

export default server;
