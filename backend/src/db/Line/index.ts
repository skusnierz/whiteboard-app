import { LineSchema, LineType } from './../../model/Line';
import mongoose from "mongoose";

const Line = mongoose.model<LineType>('Lines', LineSchema);

export const addNewLineToDb = async (line: LineType): Promise<void> => {
    const newLine = new Line(line);
    newLine.save((err) => {
        if(err) console.log(err);
    });
}

export const deleteUserLines = async (username: string, roomName: string): Promise<void> => {
    await Line.deleteMany({user: username, roomName}, {}, (err: any) => {
        if(err) console.log(err);
    });
}

export const deleteAllLines = async (roomName: string): Promise<void> => {
    await Line.deleteMany({roomName}, {}, (err: any) => {
        if(err) console.log(err);
    });
}

export const getLinesFromDb = async (roomName: string): Promise<LineType[]> => {
    return await Line.find({roomName}, (err) => {
        if(err) console.log(err);
    });
}