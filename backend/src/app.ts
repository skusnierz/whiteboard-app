import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { initializeDb } from "./db/configuration/database";
import { router } from './routes/index';
import { linesEvents, messageEvents, roomEvents } from './socket';

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
    messageEvents(socket);
    roomEvents(socket, io);
    linesEvents(socket)
});

server.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`);
});