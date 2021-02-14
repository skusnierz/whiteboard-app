import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";

import { Context } from "../../context/appContext";
import "./canvas.scss";

interface Position {
    x: number;
    y: number;
}

interface Line {
    user: string;
    startPosition: Position;
    endPosition: Position;
    pointerSize: number;
    color: string;
}

export function Canvas() {
    const [{ color, pointerSize, canvasRef, contextRef, socket, username }, dispatch] = useContext(
        Context
    );
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const divRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [lines, setLines] = useState<Line[]>([]);
    const [prevPosition, setPrevPosition] = useState<Position>({ x: 0, y: 0 });

    const sendNewLine = (line: Line) => {
        socket.emit("newLine", line);
    };

    const drawLine = (line: Line) => {
        const { startPosition, endPosition, pointerSize, color } = line;
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = pointerSize;
        contextRef.current.beginPath();
        contextRef.current.moveTo(startPosition.x, startPosition.y);
        contextRef.current.lineTo(endPosition.x, endPosition.y);
        contextRef.current.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = divRef.current.offsetWidth - 2;
        canvas.height = divRef.current.offsetHeight;

        canvas.style.width = `${divRef.current.offsetWidth - 2}px`;
        canvas.style.height = `${divRef.current.offsetHeight}px`;
    }, []);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        socket.on("drawNewLine", (line: Line) => {
            drawLine(line);
        });

        socket.on("repaint", (lines: Line[]) => {
            dispatch({ type: "CLEAR_CANVAS" });
            lines.forEach((line: Line) => {
                drawLine(line);
            });
        });

        if (context) {
            context.lineCap = "round";
            context.strokeStyle = color;
            context.lineWidth = pointerSize;
            contextRef.current = context;
        }
    }, [pointerSize, color, canvasRef, contextRef]);

    const startDrawing = ({ nativeEvent }: { nativeEvent: any }) => {
        const { offsetX, offsetY } = nativeEvent;
        setPrevPosition({ x: offsetX, y: offsetY });
        setIsDrawing(true);
    };

    const startTouch = ({ nativeEvent }: { nativeEvent: TouchEvent }) => {
        const { pageX, pageY } = nativeEvent.touches[0];
        contextRef.current.beginPath();
        contextRef.current.moveTo(pageX - 80, pageY);
        setPrevPosition({ x: pageX, y: pageY });
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
        document.body.style.cursor = "pointer";
        if (isDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            const newLine: Line = {
                user: username,
                startPosition: prevPosition,
                endPosition: { x: offsetX, y: offsetY },
                color,
                pointerSize
            };
            // setLines([...lines, newLine]);
            drawLine(newLine);
            sendNewLine(newLine);
            setPrevPosition({ x: offsetX, y: offsetY });
        }
    };

    const touch = ({ nativeEvent }: { nativeEvent: TouchEvent }) => {
        if (isDrawing) {
            const { pageX, pageY } = nativeEvent.touches[0];
            contextRef.current.lineTo(pageX - 80, pageY);
            contextRef.current.stroke();
        }
    };

    return (
        <div className="canvas" ref={divRef}>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onTouchStart={startTouch}
                onTouchEnd={finishDrawing}
                onTouchMove={touch}
                ref={canvasRef}
                style={{ cursor: "display: none" }}
            />
        </div>
    );
}
