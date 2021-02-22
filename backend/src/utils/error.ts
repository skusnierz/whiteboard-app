import { Response } from 'express';

export const sendError = (res: Response, errorMessage: string, statusCode: number) => {
    res.statusCode = statusCode;
    res.send({message: errorMessage});
};

export const errorCb = (err: any) => {
    if(err) throw new Error(err);
}

export const errorHandler = (cb: () => void, res: Response, errorStatusCode: number) => {
    try {
        cb();
    } catch(e) {
        console.log(e);
        sendError(res, e, errorStatusCode);
    }
}