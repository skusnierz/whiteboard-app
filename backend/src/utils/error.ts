import { Response } from 'express';

export const sendError = (res: Response, errorMessage: string) => {
    res.statusCode = 400;
    res.send({message: errorMessage});
};
