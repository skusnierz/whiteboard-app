import React, { useContext } from "react";
import { Context } from "../../context/appContext";
import "./toolbox.scss";

const colorers: string[] = [
    "white",
    "black",
    "red",
    "yellow",
    "green",
    "purple",
    "brown",
    "gold",
    "pink",
    "orange",
    "cyan",
    "gray"
];

export function Toolbox() {
    const [, dispatch] = useContext(Context);
    return (
        <div className="toolbox">
            {colorers.map((color: string) => (
                <button
                    style={{ backgroundColor: color }}
                    onClick={() => dispatch({ type: "SET_COLOR", color })}
                />
            ))}
        </div>
    );
}
