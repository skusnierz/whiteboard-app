import { Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import "./login.scss";
import Typing from "react-typing-animation";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/appContext";

export function Login() {
    const history = useHistory();
    const [name, setName] = useState<string>("");
    const [, dispatch] = useContext(Context);
    const onClick = () => {
        history.push("/white-board");
        dispatch({ type: "SET_NAME", name: name });
    };

    return (
        <div className="container">
            <Paper className="paper" elevation={5}>
                <Typing className="inscription" speed={30}>
                    Before we start, enter your name in the form below.
                </Typing>
                <div className="form">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && name !== "" && onClick()}
                    />
                    <button className="button" disabled={name === ""} onClick={onClick}>
                        Submit!
                    </button>
                </div>
            </Paper>
        </div>
    );
}
