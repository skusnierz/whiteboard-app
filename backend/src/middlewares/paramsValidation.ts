import { NextFunction, Request, Response } from 'express';


export const validParams = ( reqParams: string[]) => {
    return (req: Request, res: Response, next:NextFunction) => {
        for(let param of reqParams) {
            if(!req.body[param]) {
                res.statusCode = 400;
                res.send({message: "Missing request parameter "+param+"!"})
            }
        };
        next();
    }
}