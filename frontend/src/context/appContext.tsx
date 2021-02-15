import React, { MutableRefObject, ReactElement, useReducer, useRef } from "react";
import { Socket } from "socket.io-client";

import { socketProvider } from "../services/socket";

interface UserContextProps {
    children: ReactElement;
}

interface SessionStorageContext {
    username: string;
    email: string;
    roomName: string;
    color: string;
}

interface AppStateInterface {
    sessionStorageContext: SessionStorageContext;
    pointerSize: number;
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    contextRef: MutableRefObject<CanvasRenderingContext2D>;
    socket: Socket;
}

type actionType =
    | { type: "SET_USERNAME"; username: string }
    | { type: "SET_ROOM_NAME"; roomName: string }
    | { type: "SET_EMAIL"; email: string }
    | { type: "SET_COLOR"; color: string }
    | { type: "SET_POINTER_SIZE"; pointerSize: number }
    | { type: "CLEAR_CANVAS" }
    | { type: "CLEAR_LINES" }
    | { type: "LOGOUT" };

type AppContextInterface = [AppStateInterface, React.Dispatch<actionType>];

const reducer = (state: AppStateInterface, action: actionType) => {
    switch (action.type) {
        case "SET_USERNAME":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageContext,
                    username: action.username
                })
            );
            return {
                ...state,
                sessionStorageContext: {
                    ...state.sessionStorageContext,
                    username: action.username
                }
            };
        case "SET_ROOM_NAME":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageContext,
                    roomName: action.roomName
                })
            );
            return {
                ...state,
                sessionStorageContext: {
                    ...state.sessionStorageContext,
                    roomName: action.roomName
                }
            };
        case "SET_EMAIL":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageContext,
                    email: action.email
                })
            );
            return {
                ...state,
                sessionStorageContext: {
                    ...state.sessionStorageContext,
                    email: action.email
                }
            };
        case "SET_COLOR":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageContext,
                    color: action.color
                })
            );
            return {
                ...state,
                sessionStorageContext: {
                    ...state.sessionStorageContext,
                    color: action.color
                }
            };
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
            state.socket.emit("clearLines", state.sessionStorageContext.username);
            return state;
        case "LOGOUT":
            sessionStorage.removeItem("APP_CONTEXT");
            return { ...state, username: "", color: "black" };
        default:
            return state;
    }
};

let appInitialContext = {} as AppStateInterface;

appInitialContext.sessionStorageContext = JSON.parse(
    sessionStorage.getItem("APP_CONTEXT") as string
) || {
    username: "",
    color: "black",
    email: "",
    roomName: ""
};
appInitialContext.pointerSize = 1;
appInitialContext.socket = socketProvider.socket;

export const Context = React.createContext<AppContextInterface>([appInitialContext, () => null]);

export default function AppContext({ children }: UserContextProps) {
    appInitialContext.canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    appInitialContext.contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const [context, dispatch] = useReducer(reducer, appInitialContext);
    return <Context.Provider value={[context, dispatch]}> {children} </Context.Provider>;
}
