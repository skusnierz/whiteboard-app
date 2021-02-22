import { Server, Socket } from "socket.io";
import { addNewLineToDb, deleteAllLines, deleteUserLines, getLinesFromDb } from "./db/Line";
import { addNewMessageToDb, getMessagesFromDb } from "./db/Message";
import { addRoomToDb, deleteRoomFromDb } from "./db/Room";
import { LineType } from "./model/Line";
import { NewMessageType } from "./model/Message";
import { Room } from "./model/Room";

export const messageEvents = (socket: Socket) => {
    socket.on("getMessages", async (roomName: string) => {
        socket.emit("messages", await getMessagesFromDb(roomName));
    });

    socket.on("newMessage", async (msg: NewMessageType) => {
        await addNewMessageToDb(msg);
        socket.to(msg.roomName).emit("messages", await getMessagesFromDb(msg.roomName));
    });
}

export const roomEvents = (socket: Socket, io: Server) => {
    socket.on("leaveRoom", async (roomName: string) => {
        socket.leave(roomName);
    });

    socket.on("joinRoom", async (roomName: string) => {
        socket.join(roomName);
    });

    socket.on("createRoom", async (room: Room) => {
        await addRoomToDb(room);
        io.sockets.emit("newRoom", room);
    });

    socket.on("deleteRoom", async (room: Room) => {
        await deleteRoomFromDb(room);
    });
}

export const linesEvents = (socket: Socket) => {
    socket.on("newLine", async (line: LineType) => {
        await addNewLineToDb(line);
        socket.to(line.roomName).emit("drawNewLine", line);
    });

    socket.on("clearLines", async (username: string, roomName: string) => {
        await deleteUserLines(username, roomName);
        socket.to(roomName).emit("repaint", await getLinesFromDb(roomName));
        socket.emit("repaint", await getLinesFromDb(roomName));
    });

    socket.on("clearAllLines", async (roomName: string) => {
        await deleteAllLines(roomName);
        socket.to(roomName).emit("repaint", await getLinesFromDb(roomName));
        socket.emit("repaint", await getLinesFromDb(roomName));
    });
}