import { sendError } from './../utils/error';
import { LineType } from './../model/Line';
import { RequestHandler } from "express";
import { getLinesFromDb } from "../db/Line";

export const getLines: RequestHandler = async (req, res): Promise<void> => {
    try {
        const lines = await getLinesFromDb(req.params.roomName);
        res.statusCode = 200;
        res.send(lines);
    } catch (e) {
        sendError(res, e);
    }
}