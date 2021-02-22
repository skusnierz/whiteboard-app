import { sendError, errorHandler } from './../utils/error';
import { RequestHandler } from "express";
import { getLinesFromDb } from "../db/Line";

export const getLines: RequestHandler = async (req, res): Promise<void> => {
    errorHandler(
        async () => {
            const lines = await getLinesFromDb(req.params.roomName);
            res.statusCode = 200;
            res.send(lines);
        }, res, 400
    );
}