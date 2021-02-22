import { MessageType, NewMessageType } from '../../model/Message';
import mongoose from "mongoose";
import {MessageSchema} from "../../model/Message";
import { errorCb } from "../../utils/error";

const Message = mongoose.model<MessageType>('Messages', MessageSchema);

export const getMessagesFromDb = async (roomName: string): Promise<MessageType[]>  => {
    return await Message.find({roomName}, {}, {}, errorCb);
};

export const addNewMessageToDb = async (message: NewMessageType): Promise<void> => {
    const newMessage = new Message({
        ...message,
        date: new Date(),
    });

    await newMessage.save();
};

export const deleteMessages = async (roomName: string): Promise<void> => {
    await Message.deleteMany({roomName}, {}, errorCb);
}