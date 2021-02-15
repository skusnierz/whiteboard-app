import { Button, Link, makeStyles, Paper, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Alert } from "@material-ui/lab";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/appContext";
import { apiProvider } from "../../services/api";
import { errorMessage } from "../../utils/errorMessage";
import { Input } from "./Input";
import "./login.scss";

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
        marginBottom: 10,
        fontWeight: 600
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
        marginBottom: 10,
        cursor: "pointer"
    },

    error: {
        width: "85%",
        marginLeft: "5%",
        marginTop: 10
    }
});

interface FormData {
    email: string;
    password: string;
}

export function Login() {
    const classes = useStyles();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm<FormData>();
    const [apiErrorMessage, setAprErrorMessage] = useState<string>("");
    const [, dispatch] = useContext(Context);

    const signIn = ({ email, password }: FormData) => {
        apiProvider
            .loginUser({ email, password })
            .then(async (username) => {
                dispatch({ type: "SET_USERNAME", username });
                dispatch({ type: "SET_EMAIL", email });
                history.push("/room-list");
            })
            .catch((err) => setAprErrorMessage(err));
    };

    return (
        <div className={classes.container}>
            <Paper className="paper" elevation={5}>
                <div>
                    <Typography className={classes.header}>Sing In </Typography>
                    <LockIcon color="primary" />
                </div>
                <form className="form" onSubmit={handleSubmit(signIn)}>
                    <Input
                        error={errors.email !== undefined}
                        errorMessage={(label: string) => errorMessage(label, errors.email)}
                        ref={register({
                            required: true,
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                        })}
                        label={"Email"}
                        name={"email"}
                    />
                    <Input
                        error={errors.password !== undefined}
                        errorMessage={(label: string) => errorMessage(label, errors.password)}
                        ref={register({
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                        label={"Password"}
                        name={"password"}
                    />

                    {apiErrorMessage !== "" && (
                        <Alert severity="error" className={classes.error}>
                            {apiErrorMessage}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Sing In
                    </Button>
                    <Link className={classes.link} onClick={() => history.push("/register")}>
                        Don't have an account? Sign Up
                    </Link>
                </form>
            </Paper>
        </div>
    );
}
