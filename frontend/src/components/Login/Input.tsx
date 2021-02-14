import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    input: {
        width: "90%",
        fontSize: 15,
        marginTop: 15
    },

    label: {
        fontSize: 15,
        transform: "translate(10px, 13.5px) scale(1)"
    }
});

interface InputProps {
    label: string;
    name: string;
    error: boolean;
    errorMessage: (label: string) => string | undefined;
}

export const Input = React.forwardRef(({ label, name, error, errorMessage }: InputProps, ref) => {
    const classes = useStyles();

    return (
        <TextField
            error={error}
            name={name}
            helperText={errorMessage(label) || ""}
            inputRef={ref}
            label={label}
            type={label === "Password" || label === "Confirm Password" ? "password" : ""}
            variant="outlined"
            className={classes.input}
            InputLabelProps={{
                classes: {
                    root: classes.label
                }
            }}
            inputProps={{
                style: {
                    padding: "10px 10px"
                }
            }}
        />
    );
});
