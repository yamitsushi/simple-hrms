import { io } from "socket.io-client";

const instance = io(process.env.REACT_APP_BACKEND_URL, {
  withCredentials: true,
});

let socket;

instance.on("connection", (connection) => {
  socket = connection;
});

export default socket;
