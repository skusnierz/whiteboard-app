import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    id: String,
    email: String,
    username: String,
    password: String
});

export interface User extends Document {
    email: string;
    username: string;
    password: string;
};

export type UserLoginInput = Omit<User, "username">;
export type UsernameInput = Omit<User, "username" | "password">;