import React, { useContext } from "react";

import { Context } from "../../context/appContext";
import "./toolbox.scss";

const colorers: string[] = [
    "black",
    "lime",
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
                    key={color}
                    className="color"
                    style={{ backgroundColor: color }}
                    onClick={() => dispatch({ type: "SET_COLOR", color })}
                />
            ))}
            {[1, 2, 3].map((pointerSize: number) => (
                <button
                    key={pointerSize}
                    className="line"
                    onClick={() => dispatch({ type: "SET_POINTER_SIZE", pointerSize })}>
                    <hr className={"hr" + pointerSize} />
                </button>
            ))}
            <button
                className="line"
                onClick={() => {
                    dispatch({ type: "CLEAR_CANVAS" });
                    dispatch({ type: "CLEAR_LINES" });
                }}>
                Clear
            </button>
            <button
                className="line"
                onClick={() => {
                    dispatch({ type: "CLEAR_CANVAS" });
                    dispatch({ type: "CLEAR_ALL_LINES" });
                }}>
                Clear All
            </button>
        </div>
    );
}
