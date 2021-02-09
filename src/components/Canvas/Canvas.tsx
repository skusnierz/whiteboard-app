import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/appContext";
import "./canvas.scss";

export function Canvas() {
    const [{ color, pointerSize }] = useContext(Context);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const divRef = useRef() as MutableRefObject<HTMLDivElement>;
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    const contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = divRef.current.offsetWidth;
        canvas.height = divRef.current.offsetHeight;

        canvas.style.width = `${divRef.current.offsetWidth}px`;
        canvas.style.height = `${divRef.current.offsetHeight}px`;

        const context = canvas.getContext("2d");
        if (context) {
            context.lineCap = "round";
            context.strokeStyle = color;
            context.lineWidth = pointerSize;
            contextRef.current = context;
        }
    }, [pointerSize, color]);

    const startDrawing = ({ nativeEvent }: { nativeEvent: any }) => {
        console.log("start");
        const { offsetX, offsetY } = nativeEvent;
        console.log(nativeEvent);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const startTouch = ({nativeEvent}: {nativeEvent: TouchEvent}) => {
        const { pageX, pageY } = nativeEvent.touches[0];
        contextRef.current.beginPath();
        contextRef.current.moveTo(pageX-80, pageY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        console.log("end");
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
        console.log("move");
        document.body.style.cursor = "pointer";
        if (isDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    };

    const touch = ({nativeEvent}: {nativeEvent: TouchEvent})  => {
        if (isDrawing) {
            const { pageX, pageY } = nativeEvent.touches[0];
            contextRef.current.lineTo(pageX-80, pageY);
            contextRef.current.stroke();
        }
    }

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
                style={{ cursor: 'display: none' }}
            />
        </div>
    );
}
