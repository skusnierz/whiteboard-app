import React from "react";
import { Canvas } from "../Canvas/Canvas";
import { Chat } from "../Chat/Chat";
import { Toolbox } from "../Toolbox/Toolbox";
import "./whiteboard.scss";

export function WhiteBoard() {
    return (
        <div className="grid-container">
            <div className="Toolbox">
                <Toolbox />
            </div>
            <div className="Canvas">
                <Canvas />
            </div>
            <div className="Chat">
                <Chat />
            </div>
        </div>
    );
}
