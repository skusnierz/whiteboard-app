import React, { useContext } from "react";
import { Context } from "../../context/appContext";
import "./canvas.scss";

export function Canvas() {
    const [{ color }] = useContext(Context);
    return <div className="canvas" style={{ backgroundColor: color }}></div>;
}
