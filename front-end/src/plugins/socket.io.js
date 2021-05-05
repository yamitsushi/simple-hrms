import socket from "socket.io-client";

const instance = socket(process.env.REACT_APP_BACKEND_URL, {
  withCredentials: true,
});

export default instance;
