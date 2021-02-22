import { RoomSchema, Room } from './../../model/Room';
import mongoose from "mongoose";
import { deleteMessages } from '../Message';
import { deleteAllLines } from '../Line';
import { errorCb } from '../../utils/error';

const ROOM_NOT_EXIST_ERROR: string = "Room doesn't exist";
const ROOM_EXIST_ERROR: string = "Room already exists";

const Room = mongoose.model<Room>('Rooms', RoomSchema);

export const getRoomsFromDb = async (): Promise<Room[]> => {
    return await Room.find({}, errorCb);
};

export const addRoomToDb = async (room: Room): Promise<void> => {
    const roomExist = await Room.findOne({name: room.name});
    if(roomExist) {
        throw new Error(ROOM_EXIST_ERROR);
    }

    const newRoom = new Room({...room});
    await newRoom.save();
};

export const deleteRoomFromDb = async (room: Room): Promise<void> => {
    await Room.deleteOne({...room}, {}, errorCb);
    await deleteMessages(room.name);
    await deleteAllLines(room.name);
}

export const getRoomFromDb = async (name: string): Promise<Room>  => {
    const room = await Room.findOne({name}, {}, {}, errorCb);
    if(!room) {
        throw new Error(ROOM_NOT_EXIST_ERROR);
    }
    return room;
}

export const roomExistInDb = async (name: string): Promise<boolean> => {
    const room = await Room.findOne({name}, {}, {}, errorCb);
    return room !== null;
}

export const getUserRoomsFromDb = async (email: string) => {
    return await Room.find({email}, errorCb);
}
