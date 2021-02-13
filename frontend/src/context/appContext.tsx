import { Socket } from "dgram";
import { stat } from "fs";
import React, { MutableRefObject, ReactElement, useReducer, useRef } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "http://192.168.0.97:8080";
interface UserContextProps {
    children: ReactElement;
}

interface AppStateInterface {
    name: string;
    color: string;
    pointerSize: number;
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    contextRef: MutableRefObject<CanvasRenderingContext2D>;
    socket: Socket;
}

type actionType =
    | { type: "SET_NAME"; name: string }
    | { type: "SET_COLOR"; color: string }
    | { type: "SET_POINTER_SIZE"; pointerSize: number }
    | { type: "CLEAR_CANVAS" }
    | { type: "CLEAR_LINES" };

type AppContextInterface = [AppStateInterface, React.Dispatch<actionType>];

const reducer = (state: AppStateInterface, action: actionType) => {
    switch (action.type) {
        case "SET_NAME":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({ name: action.name, color: state.color })
            );
            return { ...state, name: action.name };
        case "SET_COLOR":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({ name: state.name, color: action.color })
            );
            return { ...state, color: action.color };
        case "SET_POINTER_SIZE":
            return { ...state, pointerSize: action.pointerSize };
        case "CLEAR_CANVAS":
            const { canvasRef } = state;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                context.fillStyle = "white";
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            return { ...state, canvasRef };
        case "CLEAR_LINES":
            state.socket.emit("clearLines", state.name);
            return state;
        default:
            return state;
    }
};

let appInitialContext = JSON.parse(sessionStorage.getItem("APP_CONTEXT") as string) || {
    name: "",
    color: "black"
};
appInitialContext.pointerSize = 1;
appInitialContext.socket = io(SERVER_URL);

export const Context = React.createContext<AppContextInterface>([appInitialContext, () => null]);

export default function AppContext({ children }: UserContextProps) {
    appInitialContext.canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    appInitialContext.contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const [context, dispatch] = useReducer(reducer, appInitialContext);
    return <Context.Provider value={[context, dispatch]}> {children} </Context.Provider>;
}
