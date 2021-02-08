import React, { useContext } from "react";
import { Context } from "../../context/appContext";
import { Canvas } from "../Canvas/Canvas";
import { Chat } from "../Chat/Chat";
import { Toolbox } from "../Toolbox/Toolbox";
import "./whiteboard.scss";

export function WhiteBoard() {
    const [context, dispatch] = useContext(Context);
    console.log(context);
    console.log(dispatch);
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
