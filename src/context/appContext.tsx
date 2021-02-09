import React, { ReactElement, useReducer } from "react";

interface UserContextProps {
    children: ReactElement;
}

interface AppStateInterface {
    name: string;
    color: string;
    pointerSize: number;
}

type actionType =
    | { type: "SET_NAME"; name: string }
    | { type: "SET_COLOR"; color: string }
    | { type: "SET_POINTER_SIZE"; pointerSize: number };

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
        default:
            return state;
    }
};

let appInitialContext = JSON.parse(sessionStorage.getItem("APP_CONTEXT") as string) || {
    name: "",
    color: ""
};
appInitialContext.pointerSize = 1;

export const Context = React.createContext<AppContextInterface>([appInitialContext, () => null]);

export default function AppContext({ children }: UserContextProps) {
    const [context, dispatch] = useReducer(reducer, appInitialContext);
    return <Context.Provider value={[context, dispatch]}> {children} </Context.Provider>;
}
