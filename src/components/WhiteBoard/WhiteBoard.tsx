import React, { useContext } from "react";
import { Context } from "../../context/appContext";

export function WhiteBoard() {
    const [context, dispatch] = useContext(Context);
    console.log(context);
    console.log(dispatch);
    return <>{context.name}</>;
}
