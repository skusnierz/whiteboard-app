import { addRoomToDb, deleteRoomFromDb, getRoomFromDb, getRoomsFromDb, getUserRoomsFromDb, roomExistInDb } from "./../db/Room/index";
import { RequestHandler } from "express";
import { errorHandler, sendError } from "../utils/error";

const ADDED_NEW_ROOM_MESSAGE: string = "Added new room!";
const DELETED_ROOM_MESSAGE: string = "Deleted room!";

export const addNewRoom: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            await addRoomToDb(req.body);
            res.statusCode = 200;
            res.send({message: ADDED_NEW_ROOM_MESSAGE})
        }, res, 400
    );
}

export const getRooms: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            const rooms = await getRoomsFromDb();
            res.statusCode = 200;
            res.send(rooms);
        }, res, 400
    );
}

export const getUserRooms: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            const rooms = await getUserRoomsFromDb(req.body.email);
            res.statusCode = 200;
            res.send(rooms);
        }, res, 400
    );
}

export const deleteRoom: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            const room = await getRoomFromDb(req.body.name);
            if(room.email !== req.body.email || room.username !== req.body.username) {
                sendError(res, "Unauthorized", 401);
                return;
            }
            await deleteRoomFromDb(req.body);
            res.statusCode = 200;
            res.send({message: DELETED_ROOM_MESSAGE});
        }, res, 400
    );
}

export const roomExist: RequestHandler = async (req, res) => {
    errorHandler(
        async () => {
            const roomExist: boolean = await roomExistInDb(req.params.name);
            res.statusCode = 200;
            res.send({roomExist});
        }, res, 400
    );
}