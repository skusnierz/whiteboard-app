import React, { MutableRefObject, ReactElement, useReducer, useRef } from "react";

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
    sessionStorageData: SessionStorageContext;
    pointerSize: number;
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    contextRef: MutableRefObject<CanvasRenderingContext2D>;
}

type actionType =
    | { type: "SET_USERNAME"; username: string }
    | { type: "SET_ROOM_NAME"; roomName: string }
    | { type: "SET_EMAIL"; email: string }
    | { type: "SET_COLOR"; color: string }
    | { type: "SET_POINTER_SIZE"; pointerSize: number }
    | { type: "CLEAR_CANVAS" }
    | { type: "CLEAR_LINES" }
    | { type: "CLEAR_ALL_LINES" }
    | { type: "LOGOUT" };

type AppContextInterface = [AppStateInterface, React.Dispatch<actionType>];

const reducer = (state: AppStateInterface, action: actionType) => {
    switch (action.type) {
        case "SET_USERNAME":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageData,
                    username: action.username
                })
            );
            return {
                ...state,
                sessionStorageData: {
                    ...state.sessionStorageData,
                    username: action.username
                }
            };
        case "SET_ROOM_NAME":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageData,
                    roomName: action.roomName
                })
            );
            return {
                ...state,
                sessionStorageData: {
                    ...state.sessionStorageData,
                    roomName: action.roomName
                }
            };
        case "SET_EMAIL":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageData,
                    email: action.email
                })
            );
            return {
                ...state,
                sessionStorageData: {
                    ...state.sessionStorageData,
                    email: action.email
                }
            };
        case "SET_COLOR":
            sessionStorage.setItem(
                "APP_CONTEXT",
                JSON.stringify({
                    ...state.sessionStorageData,
                    color: action.color
                })
            );
            return {
                ...state,
                sessionStorageData: {
                    ...state.sessionStorageData,
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
            socketProvider.socket.emit(
                "clearLines",
                state.sessionStorageData.username,
                state.sessionStorageData.roomName
            );
            return state;
        case "CLEAR_ALL_LINES":
            socketProvider.socket.emit("clearAllLines", state.sessionStorageData.roomName);
            return state;
        case "LOGOUT":
            sessionStorage.removeItem("APP_CONTEXT");
            return {
                ...state,
                sessionStorageData: {
                    username: "",
                    color: "black",
                    email: "",
                    roomName: ""
                }
            };
        default:
            return state;
    }
};

let appInitialContext = {} as AppStateInterface;

appInitialContext.sessionStorageData = JSON.parse(
    sessionStorage.getItem("APP_CONTEXT") as string
) || {
    username: "",
    color: "black",
    email: "",
    roomName: ""
};
appInitialContext.pointerSize = 1;

export const Context = React.createContext<AppContextInterface>([appInitialContext, () => null]);

export default function AppContext({ children }: UserContextProps) {
    appInitialContext.canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    appInitialContext.contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;
    const [context, dispatch] = useReducer(reducer, appInitialContext);
    return <Context.Provider value={[context, dispatch]}> {children} </Context.Provider>;
}
