import { addNewMessageToDb, getMessagesFromDb } from './../db/Message/index';
import { Response, Request } from 'express';

const sendError = (res: Response, errorMessage: string) => {
    res.statusCode = 400;
    res.send({message: errorMessage});
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await getMessagesFromDb();
        res.statusCode = 200;
        res.send(messages);
    } catch(e: any) {
        res.statusCode = 400;
        throw new Error(e.message);
    }
}

export const addNewMessage = async (req: Request, res: Response) => {
    if (req.body.author === undefined) {
        sendError(res, "Error! Author parameter missing!")
        return;
    }
    if (req.body.message === undefined) {
        sendError(res, "Error! Message parameter missing!")
        return;
    }

    try {
        await addNewMessageToDb({
            author: req.body.author,
            message: req.body.message
        })
        res.statusCode = 200;
        res.send("Added new message");
    } catch(e: any) {
        res.statusCode = 400;
        throw new Error(e.message);
    }
}
