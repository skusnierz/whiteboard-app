import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/appContext";
import "./chat.scss";
import Moment from "react-moment";
import { Message } from "../WhiteBoard/WhiteBoard";

interface ChatProps {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export function Chat({ messages, setMessages }: ChatProps) {
    const [{ name, socket }] = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const test = useRef() as MutableRefObject<HTMLLIElement>;

    useEffect(() => {
        test?.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [messages, setMessages]);

    const onClick = () => {
        setMessages([
            ...messages,
            {
                author: name,
                date: new Date(),
                message
            }
        ]);
        socket.emit("newMessage", {
            author: name,
            date: new Date(),
            message
        });
        setMessage("");
    };

    return (
        <>
            <ul>
                {messages.map((message, idx: number) =>
                    idx !== messages.length ? (
                        <li ref={test} key={idx}>
                            <p>
                                {message.author} <Moment date={message.date} format="HH:mm:ss" />
                            </p>
                            {message.message}
                        </li>
                    ) : (
                        <li>
                            <p>
                                {message.author} <Moment date={message.date} format="HH:mm:ss" />
                            </p>
                            {message.message}
                        </li>
                    )
                )}
            </ul>
            <input
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && message !== "" && onClick()}
            />
        </>
    );
}
