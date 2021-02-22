import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import Moment from "react-moment";

import { Context } from "../../context/appContext";
import { Message } from "../../model/model";
import { socketProvider } from "../../services/socket";
import "./Chat.scss";

interface ChatProps {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export function Chat({ messages, setMessages }: ChatProps) {
    const [
        {
            sessionStorageData: { username, roomName }
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
        socketProvider.socket.emit("newMessage", {
            author: username,
            date: new Date(),
            message,
            roomName
        });
        setMessage("");
    };

    return (
        <>
            <ul className="ul">
                {messages.map((message, idx: number) =>
                    idx !== messages.length ? (
                        <li ref={lastMessageRef} key={idx} className="ul__li">
                            <p className="ul__li--title">
                                {message.author} <Moment date={message.date} format="HH:mm:ss" />
                            </p>
                            {message.message}
                        </li>
                    ) : (
                        <li className="ul__li">
                            <p className="ul__li--title">
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
