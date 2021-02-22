import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../context/appContext";
import { Message } from "../../model/model";
import { socketProvider } from "../../services/socket";
import { Canvas } from "../Canvas/Canvas";
import { Chat } from "../Chat/Chat";
import { Navbar } from "../Navbar/Navbar";
import { Toolbox } from "../Toolbox/Toolbox";
import "./Whiteboard.scss";

export function WhiteBoard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [
        {
            sessionStorageData: { roomName }
        }
    ] = useContext(Context);
    useEffect(() => {
        socketProvider.socket.on("messages", (messages: Message[]) => {
            setMessages(messages);
        });

        return () => {
            socketProvider.socket.off("messages");
        };
    });

    useEffect(() => {
        socketProvider.socket.emit("joinRoom", roomName);
        socketProvider.socket.emit("getMessages", roomName);

        return () => {
            socketProvider.socket.emit("leaveRoom", roomName);
        };
    }, [roomName]);

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
