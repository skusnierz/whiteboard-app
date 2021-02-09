import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/appContext";
import "./chat.scss";
import Moment from "react-moment";

const initialMessages = [
    { author: "mietek", date: new Date(), message: "Elo siema jestem mietek" },
    { author: "jacek", date: new Date(), message: "Elo siema jestem jacek" },
    { author: "maciek", date: new Date(), message: "Elo siema jestem maciek" }
];

export function Chat() {
    const [{ name }] = useContext(Context);
    const [messages, setMessages] = useState(initialMessages);
    const [message, setMessage] = useState<string>("");
    const test = useRef() as MutableRefObject<HTMLLIElement>;

    useEffect(() => {
        console.log("kurwa");
        test?.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [messages]);

    const onClick = () => {
        setMessages([
            ...messages,
            {
                author: name,
                date: new Date(),
                message
            }
        ]);
        setMessage("");
    };

    return (
        <>
            <ul>
                {messages.map((message, idx: number) =>
                    idx !== messages.length ? (
                        <li ref={test}>
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
