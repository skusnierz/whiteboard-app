import { Schema, Document } from 'mongoose';

export const RoomSchema = new Schema({
    id: String,
    name: String,
    username: String,
    email: String,
});

export interface Room extends Document {
    name: string;
    username: string;
    email: string;
};