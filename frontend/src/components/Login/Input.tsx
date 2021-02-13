import { makeStyles, TextField } from "@material-ui/core";

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
    onChange: (value: string) => void;
}

export function Input({ label, onChange }: InputProps) {
    const classes = useStyles();

    return (
        <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            onChange={(e) => onChange(e.target.value)}
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
}
