import { io } from "socket.io-client";

const instance = io.connect(process.env.REACT_APP_BACKEND_URL, {
  withCredentials: true,
});

export default instance;
