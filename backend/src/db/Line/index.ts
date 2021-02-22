import { errorCb } from './../../utils/error';
import { LineSchema, LineType } from './../../model/Line';
import mongoose from "mongoose";

const Line = mongoose.model<LineType>('Lines', LineSchema);

export const addNewLineToDb = async (line: LineType): Promise<void> => {
    const newLine = new Line(line);
    newLine.save(errorCb);
}
export const deleteUserLines = async (username: string, roomName: string): Promise<void> => {
    await Line.deleteMany({user: username, roomName}, {}, errorCb);
}

export const deleteAllLines = async (roomName: string): Promise<void> => {
    await Line.deleteMany({roomName}, {}, errorCb);
}

export const getLinesFromDb = async (roomName: string): Promise<LineType[]> => {
    return await Line.find({roomName}, errorCb);
}