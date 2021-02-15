import { UNAUTHORIZED_ERROR } from '../auth/index';
import { RequestHandler, Response } from "express";
import { verifyToken } from "../auth";

const sendError = (res: Response, errorMessage: string) => {
    res.statusCode = 400;
    res.send({message: errorMessage});
};

export const authMiddleware: RequestHandler = (req, res, next) => {
    if(!req.headers.authorization) {
        sendError(res, UNAUTHORIZED_ERROR);
        return;
    }
    try {
        const {email, username} = verifyToken(req.headers.authorization);
        req.body.email = email;
        req.body.username = username;
        next();
    } catch(e) {
        sendError(res, e.message);
    }
}