import { NewMessageType } from '../../model/Message';
import mongoose from "mongoose";
import {MessageSchema} from "../../model/Message";

const Message = mongoose.model('Messages', MessageSchema);
export const getMessagesFromDb = (roomName: string) => {
    return Message.find({roomName})
        .then(messages => messages)
        .catch(err => console.log(err));
};

export const addNewMessageToDb = (message: NewMessageType) => {
    const newMessage = new Message({
        ...message,
        date: new Date(),
    });

    newMessage.save();
};

export const deleteMessages = async (roomName: string) => {
    await Message.deleteMany({roomName});
}