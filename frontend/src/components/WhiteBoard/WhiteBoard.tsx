import React, { useContext, useEffect, useState } from "react";
import { Canvas } from "../Canvas/Canvas";
import { Chat } from "../Chat/Chat";
import { Toolbox } from "../Toolbox/Toolbox";
import "./whiteboard.scss";
import { Context } from "../../context/appContext";

export interface Message {
    author: string;
    date: Date;
    message: string;
}

export function WhiteBoard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [{ socket }] = useContext(Context);
    useEffect(() => {
        socket.on("messages", (messages: Message[]) => {
            setMessages(messages);
        });
    });

    useEffect(() => {
        socket.emit("getMessages");
    }, [socket]);

    return (
        <div className="grid-container">
            <div className="Toolbox">
                <Toolbox />
            </div>
            <div className="Canvas">
                <Canvas />
            </div>
            <div className="Chat">
                <Chat messages={messages} setMessages={setMessages} />
            </div>
        </div>
    );
}
