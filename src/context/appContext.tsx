import React, { ReactElement, useReducer } from "react";

interface UserContextProps {
    children: ReactElement;
}

interface AppStateInterface {
    name: string;
    color: string;
}

type actionType = { type: "SET_NAME"; name: string } | { type: "SET_COLOR"; color: string };

type AppContextInterface = [AppStateInterface, React.Dispatch<actionType>];

const reducer = (state: AppStateInterface, action: actionType) => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.name };
        case "SET_COLOR":
            return { ...state, color: action.color };
        default:
            return state;
    }
};

const appInitialContext = {
    name: "",
    color: ""
};

export const Context = React.createContext<AppContextInterface>([appInitialContext, () => null]);

export default function AppContext({ children }: UserContextProps) {
    const [context, dispatch] = useReducer(reducer, appInitialContext);
    return <Context.Provider value={[context, dispatch]}> {children} </Context.Provider>;
}
