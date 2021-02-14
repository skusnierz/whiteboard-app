import { LineSchema, LineType } from './../../model/Line';
import mongoose from "mongoose";

const Line = mongoose.model('Lines', LineSchema);

export const addNewLineToDb = async (line: LineType): Promise<void> => {
    const newLine = new Line(line);
    newLine.save((err) => {
        if(err) console.log(err);
    });
}

export const deleteLines = async (name: string): Promise<void> => {
    await Line.deleteMany({user: name}, {}, (err: any) => {
        if(err) console.log(err);
    });
}

export const getLines = async (): Promise<any[]> => {
    return await Line.find({}, (err) => {
        if(err) console.log(err);
    });
}