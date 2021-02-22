import { createToken } from './../auth/index';
import { registerUser, loginUser, getUsernameFromDb } from './../db/User/index';
import { RequestHandler, Response } from 'express';
import { errorHandler, sendError } from "../utils/error";

const REGISTER_SUCCESSFUL_MESSAGE: string = "Added new user!";
const LOGIN_SUCCESSFUL_MESSAGE: string = "Login successful!";

export const register: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            await registerUser(req.body);
            res.statusCode = 200;
            res.send({message: REGISTER_SUCCESSFUL_MESSAGE})
        }, res, 400
    );
}

export const login: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            const user = await loginUser(req.body);
            res.statusCode = 200;
            res.send({message: LOGIN_SUCCESSFUL_MESSAGE, token: await createToken(user.email, user.username), username: user.username});
        }, res, 400
    );
}

export const getUsername: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            const username = await getUsernameFromDb(req.body);
            res.statusCode = 200;
            res.send({username});
        }, res, 400
    );
}