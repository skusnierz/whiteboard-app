import { addRoomToDb, deleteRoomFromDb, getRoomFromDb, getRoomsFromDb, getUserRoomsFromDb, roomExistInDb } from "./../db/Room/index";
import { RequestHandler } from "express";
import { sendError } from "../utils/error";

const ADDED_NEW_ROOM_MESSAGE: string = "Added new room!";
const DELETED_ROOM_MESSAGE: string = "Deleted room!";

export const addNewRoom: RequestHandler = async (req, res): Promise<void> => {
    try {
        await addRoomToDb(req.body);
        res.statusCode = 200;
        res.send({message: ADDED_NEW_ROOM_MESSAGE})
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}

export const getRooms: RequestHandler = async (req, res): Promise<void> => {
    try {
        const rooms = await getRoomsFromDb();
        res.statusCode = 200;
        res.send(rooms);
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}

export const getUserRooms: RequestHandler = async (req, res): Promise<void> => {
    try {
        const rooms = await getUserRoomsFromDb(req.body.email);
        res.statusCode = 200;
        res.send(rooms);
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}

export const deleteRoom: RequestHandler = async (req, res): Promise<void> => {
    try {
        const room = await getRoomFromDb(req.body.name);
        if(room.email !== req.body.email || room.username !== req.body.username) {
            sendError(res, "Unauthorized");
            return;
        }
        await deleteRoomFromDb(req.body);
        res.statusCode = 200;
        res.send({message: DELETED_ROOM_MESSAGE});
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}

export const roomExist: RequestHandler = async (req, res) => {
    const roomExist: boolean = await roomExistInDb(req.params.name);
    res.statusCode = 200;
    res.send({roomExist});
}