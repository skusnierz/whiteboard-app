import { addNewMessageToDb, getMessagesFromDb } from './db/Message/index';
import { NewMessageType } from './db/model/Message';
import cors from 'cors';
import { router } from './routes/index';
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { initializeDb } from "./db/configuration/database";
import bodyParser from "body-parser";

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
    console.log("Connected new user");
    socket.emit("messages", await getMessagesFromDb());
    await socket.on("getMessages", async () => {
        io.sockets.emit("messages", await getMessagesFromDb());
    });

    await socket.on("newMessage", async (msg: NewMessageType) => {
        await addNewMessageToDb(msg);
        io.sockets.emit("messages", await getMessagesFromDb());
    });
});

server.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`);
});