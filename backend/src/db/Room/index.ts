import { RoomSchema, Room } from './../../model/Room';
import mongoose from "mongoose";

const ROOM_NOT_EXIST_ERROR: string = "Room doesn't exist";
const ROOM_EXIST_ERROR: string = "Room already exists";

const Room = mongoose.model<Room>('Rooms', RoomSchema);
export const getRoomsFromDb = () => {
    return Room.find({})
        .then(rooms => rooms)
        .catch(err => console.log(err));
};

export const addRoomToDb = async (room: Room) => {
    const roomExist = await Room.findOne({name: room.name});
    if(roomExist) {
        throw new Error(ROOM_EXIST_ERROR);
    }

    const newRoom = new Room({
        name: room.name,
        username: room.username,
        email: room.email
    });

    await newRoom.save();
};

export const deleteRoomFromDb = async (room: Room) => {
    await Room.deleteOne({name: room.name}, {}, (err) => {
        if(err)  throw new Error(err.message);
    });
}


export const getRoomFromDb = async (name: string) => {
    const room = await Room.findOne({name});
    if(!room) {
        throw new Error(ROOM_NOT_EXIST_ERROR);
    }
    return room;
}