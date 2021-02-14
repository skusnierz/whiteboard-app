import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
    author: String,
    date: Date,
    message: String
});

export interface Message {
    author: string;
    date: Date;
    message: string;
};

export type NewMessageType = Omit<Message, "date">;