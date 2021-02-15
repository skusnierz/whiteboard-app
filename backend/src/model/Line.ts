import { Schema } from "mongoose";

export interface Position {
    x: number;
    y: number;
}

export interface LineType {
    user: string;
    startPosition: Position;
    endPosition: Position;
    color: string;
    pointerSize: string;
    roomName: string;
}

export const LineSchema = new Schema({
    user: String,
    startPosition: {
        x: Number,
        y: Number
    },
    endPosition: {
        x: Number,
        y: Number
    },
    color: String,
    pointerSize: String,
    roomName: String
});