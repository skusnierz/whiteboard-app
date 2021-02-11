import { NewMessageType } from './../model/Message';
import mongoose from "mongoose";
import {MessageSchema} from "../model/Message";

const Message = mongoose.model('Messages', MessageSchema);

export const getMessagesFromDb = () => {
    return Message.find({})
        .then(messages => messages)
        .catch(err => console.log(err));
};

export const addNewMessageToDb = (message: NewMessageType) => {
    const newMessage = new Message({
        author: message.author,
        date: new Date(),
        message: message.message
    });

    newMessage.save((err) => console.log(err));
};