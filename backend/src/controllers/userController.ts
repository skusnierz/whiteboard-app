import { createToken } from './../auth/index';
import { registerUser, loginUser, getUsernameFromDb } from './../db/User/index';
import { RequestHandler, Response } from 'express';
import { sendError } from "../utils/error";

const REGISTER_SUCCESSFUL_MESSAGE: string = "Added new user!";
const LOGIN_SUCCESSFUL_MESSAGE: string = "Login successful!";

export const register: RequestHandler = async (req, res): Promise<void> => {
    try {
        await registerUser(req.body);
        res.statusCode = 200;
        res.send({message: REGISTER_SUCCESSFUL_MESSAGE})
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}

export const login: RequestHandler = async (req, res): Promise<void> => {
    try {
        const user = await loginUser(req.body);
        res.statusCode = 200;
        res.send({message: LOGIN_SUCCESSFUL_MESSAGE, token: await createToken(user.email, user.username), username: user.username});
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}

export const getUsername: RequestHandler = async (req, res): Promise<void> => {
    try {
        const username = await getUsernameFromDb(req.body);
        res.statusCode = 200;
        res.send({username});
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
    }
}