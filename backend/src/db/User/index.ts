import { hashPassword, verifyPassword } from './../../auth/index';
import { User, UserSchema, UserLoginInput, UsernameInput } from './../../model/User';
import mongoose from "mongoose";

const USER_EXIST_ERROR: string = "User already exist!";
const USER_NOT_EXIST_ERROR: string = "User doesn't exist!";
const INVALID_PASSWORD_ERROR: string = "Invalid password!";

const User = mongoose.model<User>('User', UserSchema);

export const registerUser = async ({email, username, password}: User) => {
    const user = await User.findOne({email: email});

    if (user) {
        throw new Error(USER_EXIST_ERROR)
    }

    const newUser = new User({
        email: email,
        username: username,
        password: await hashPassword(password)
    });

    newUser.save();
}

export const loginUser = async ({email, password}: UserLoginInput) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error(USER_NOT_EXIST_ERROR);
    }

    if (!await verifyPassword(password, user.password)) {
        throw new Error(INVALID_PASSWORD_ERROR);
    }
}

export const getUsernameFromDb = async ({email}: UsernameInput) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error(USER_NOT_EXIST_ERROR);
    }

    return user.username;
}