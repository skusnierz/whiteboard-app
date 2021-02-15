import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../context/appContext";
import { Message } from "../../model/message";
import { Canvas } from "../Canvas/Canvas";
import { Chat } from "../Chat/Chat";
import { Navbar } from "../Navbar/Navbar";
import { Toolbox } from "../Toolbox/Toolbox";
import "./whiteboard.scss";

export function WhiteBoard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [
        {
            sessionStorageContext: { roomName },
            socket
        }
    ] = useContext(Context);
    useEffect(() => {
        socket.on("messages", (messages: Message[]) => {
            setMessages(messages);
        });
    });

    useEffect(() => {
        socket.emit("getMessages", roomName);
    }, [socket, roomName]);

    return (
        <>
            <div className="grid-container">
                <Navbar />
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
        </>
    );
}
