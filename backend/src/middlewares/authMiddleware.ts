import { TokenInfo } from './../model/Token';
import { UNAUTHORIZED_ERROR } from '../auth/index';
import { RequestHandler, Response } from "express";
import { verifyToken } from "../auth";
import { sendError } from '../utils/error';

export const authMiddleware: RequestHandler = (req, res, next) => {
    if(!req.headers.authorization) {
        sendError(res, UNAUTHORIZED_ERROR, 401);
        return;
    }
    try {
        const {email, username} = verifyToken(req.headers.authorization) as TokenInfo;
        req.body.email = email;
        req.body.username = username;
        next();
    } catch(e) {
        sendError(res, e.message, 401);
    }
}