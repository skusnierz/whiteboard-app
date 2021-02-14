import { createToken } from './../auth/index';
import { registerUser, loginUser, getUsernameFromDb } from './../db/User/index';
import { RequestHandler, Response } from 'express';

const REGISTER_SUCCESSFUL_MESSAGE: string = "Added new user!";
const LOGIN_SUCCESSFUL_MESSAGE: string = "Login successful!";

const sendError = (res: Response, errorMessage: string) => {
    res.statusCode = 400;
    res.send({message: errorMessage});
};

export const register: RequestHandler = async (req, res): Promise<void> => {
    try {
        await registerUser(req.body);
    } catch(e) {
        console.log(e);
        sendError(res, e.message);
        return;
    }
    res.statusCode = 200;
    res.send({message: REGISTER_SUCCESSFUL_MESSAGE})
}

export const login: RequestHandler = async (req, res): Promise<void> => {
    try {
        await loginUser(req.body);
        res.statusCode = 200;
        res.send({message: LOGIN_SUCCESSFUL_MESSAGE, token: await createToken(req.body.email)});
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