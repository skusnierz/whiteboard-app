import { Button, makeStyles, Paper, Link, Typography } from "@material-ui/core";
import { Input } from "./Input";
import LockIcon from "@material-ui/icons/Lock";
import React, { useContext, useState } from "react";
import "./login.scss";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/appContext";

const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "linear-gradient(to right, #011f4b, #2a9df4)"
    },

    header: {
        fontSize: "20px",
        textAlign: "center",
        marginBottom: 10
    },

    button: {
        marginTop: 25,
        marginBottom: 15,
        width: "90%"
    },

    link: {
        fontSize: 12,
        display: "block",
        float: "left",
        marginLeft: "5%",
        marginBottom: 10
    }
});

export function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [, dispatch] = useContext(Context);
    const onClick = () => {
        history.push("/white-board");
        dispatch({ type: "SET_NAME", name: email });
    };

    console.log(password);
    console.log(email);

    return (
        <div className={classes.container}>
            <Paper className="paper" elevation={5}>
                <div>
                    <Typography className={classes.header}>Sing In </Typography>
                    <LockIcon color="primary"/>
                </div>
                <form className="form">
                    <Input onChange={setEmail} label={"Email"} />
                    <Input onChange={setPassword} label={"Password"} />
                    <Button variant="contained" color="primary" className={classes.button}>
                        Sing In
                    </Button>
                    <Link className={classes.link}>Don't have an account? Sign Up</Link>
                </form>
            </Paper>
        </div>
    );
}
