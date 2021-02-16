import { addRoomToDb, deleteRoomFromDb } from './db/Room/index';
import { addNewLineToDb, deleteAllLines, deleteUserLines, getLinesFromDb } from './db/Line/index';
import { LineType } from './model/Line';
import { addNewMessageToDb, getMessagesFromDb } from './db/Message/index';
import { NewMessageType } from './model/Message';
import cors from 'cors';
import { router } from './routes/index';
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { initializeDb } from "./db/configuration/database";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Room } from './model/Room';

dotenv.config();

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

initializeDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(router);

io.on('connection', async (socket: Socket) => {
    socket.on("getMessages", async (roomName: string) => {
        socket.emit("messages", await getMessagesFromDb(roomName));
    });

    socket.on("leaveRoom", async (roomName: string) => {
        socket.leave(roomName);
        console.log(`User leaved a room: ${roomName}!`);
    });

    socket.on("joinToRoom", async (roomName: string) => {
        socket.join(roomName);
        console.log(`User joined to room: ${roomName}!`);
    });

    socket.on("newMessage", async (msg: NewMessageType) => {
        await addNewMessageToDb(msg);
        socket.to(msg.roomName).emit("messages", await getMessagesFromDb(msg.roomName));
        console.log("Added new message to DB");
    });

    socket.on("newLine", async (line: LineType) => {
        await addNewLineToDb(line);
        socket.to(line.roomName).emit("drawNewLine", line);
    });

    socket.on("clearLines", async (username: string, roomName: string) => {
        await deleteUserLines(username, roomName);
        socket.to(roomName).emit("repaint", await getLinesFromDb(roomName));
        socket.emit("repaint", await getLinesFromDb(roomName));
        console.log("Delete lines");
    });

    socket.on("clearAllLines", async (roomName: string) => {
        await deleteAllLines(roomName);
        socket.to(roomName).emit("repaint", await getLinesFromDb(roomName));
        socket.emit("repaint", await getLinesFromDb(roomName));
        console.log(`Delete all lines from ${roomName} room!`);
    })

    socket.on("addRoom", async (room: Room) => {
        await addRoomToDb(room);
        io.sockets.emit("newRoom", room);
    });

    socket.on("deleteRoom", async (room: Room) => {
        await deleteRoomFromDb(room);
    });

});

server.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`);
});