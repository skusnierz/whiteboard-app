import { Schema, Document } from 'mongoose';

export const MessageSchema = new Schema({
    author: String,
    date: Date,
    message: String,
    roomName: String,
});

export interface MessageType extends Document {
    author: string;
    date: Date;
    message: string;
    roomName: string
};

export type NewMessageType = Omit<MessageType, "date">;