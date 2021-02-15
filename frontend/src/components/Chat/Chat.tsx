import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import Moment from "react-moment";

import { Context } from "../../context/appContext";
import { Message } from "../../model/message";
import "./chat.scss";

interface ChatProps {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export function Chat({ messages, setMessages }: ChatProps) {
    const [
        {
            sessionStorageContext: { username, roomName },
            socket
        }
    ] = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const lastMessageRef = useRef() as MutableRefObject<HTMLLIElement>;

    useEffect(() => {
        lastMessageRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });
    }, [messages, setMessages]);

    const onClick = () => {
        setMessages([
            ...messages,
            {
                author: username,
                date: new Date(),
                message,
                roomName
            }
        ]);
        socket.emit("newMessage", {
            author: username,
            date: new Date(),
            message,
            roomName
        });
        setMessage("");
    };

    return (
        <>
            <ul>
                {messages.map((message, idx: number) =>
                    idx !== messages.length ? (
                        <li ref={lastMessageRef} key={idx}>
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
