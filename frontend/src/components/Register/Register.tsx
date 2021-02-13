import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { Input } from "../Login/Input";
import LockIcon from "@material-ui/icons/Lock";
import "./register.scss";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorMessage } from "../../utils/errorMessage";

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
        width: "40%"
    },

    link: {
        fontSize: 12,
        display: "block",
        float: "left",
        marginLeft: "5%",
        marginBottom: 10,
        cursor: "pointer"
    }
});

interface FormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export function Register() {
    const classes = useStyles();
    const history = useHistory();
    const { register, errors, handleSubmit, watch } = useForm<FormData>();

    const signIn = ({ email, username, password, confirmPassword }: FormData) => {
        console.log(username);
        console.log(email);
        console.log(confirmPassword);
        console.log(password);
    };

    return (
        <div className={classes.container}>
            <Paper className="paper" elevation={5}>
                <div>
                    <Typography className={classes.header}>Sing Up </Typography>
                    <LockIcon color="primary" />
                </div>
                <form className="form" onSubmit={handleSubmit(signIn)}>
                    <Input
                        errorMessage={(label: string) => errorMessage(label, errors.email)}
                        error={errors.email !== undefined}
                        ref={register({
                            required: true,
                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
                        })}
                        label={"Email"}
                        name={"email"}
                    />

                    <Input
                        errorMessage={(label: string) => errorMessage(label, errors.username)}
                        error={errors.username !== undefined}
                        ref={register({
                            required: true
                        })}
                        label={"Username"}
                        name={"username"}
                    />

                    <Input
                        errorMessage={(label: string) => errorMessage(label, errors.password)}
                        error={errors.password !== undefined}
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

                    <Input
                        errorMessage={(label: string) =>
                            errorMessage(label, errors.confirmPassword)
                        }
                        error={errors.confirmPassword !== undefined}
                        ref={register({
                            required: true,
                            validate: (value) => {
                                return value === watch("password1");
                            }
                        })}
                        label={"Confirm Password"}
                        name={"confirmPassword"}
                    />
                    <div className="buttons">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Sing Up
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => history.push("/")}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}
