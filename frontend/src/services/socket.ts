import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.0.97:8080";
const socket: Socket = io(SOCKET_SERVER_URL);

const emit = (event: string, data: any) => {
    socket.emit(event, data);
};

export const socketProvider = {
    socket,
    emit
};
