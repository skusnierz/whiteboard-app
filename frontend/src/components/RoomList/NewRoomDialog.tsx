import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },

        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

const useStyles = makeStyles({
    input: {
        width: "90%",
        fontSize: 15,
        marginTop: 15
    },

    label: {
        fontSize: 15,
        transform: "translate(10px, 13.5px) scale(1)"
    },

    addButton: {
        backgroundColor: "#2a9df4",
        color: "white",
        "&:hover, &:focus": {
            backgroundColor: "#187bcd"
        }
    }
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        paddingLeft: "10%"
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

interface NewRoomDialogProps {
    open: boolean;
    setOpen: (state: boolean) => void;
}

export function NewRoomDialog({ open, setOpen }: NewRoomDialogProps) {
    const [roomName, setRoomName] = useState("");
    const [submit, setSubmit] = useState(false);
    const classes = useStyles();

    console.log(roomName);

    return (
        <Dialog
            onClose={() => setOpen(false)}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={"sm"}>
            <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                Add new room
            </DialogTitle>
            <DialogContent dividers>
                <Typography>If you want add new room, fill out form below.</Typography>
                <TextField
                    error={submit && roomName === ""}
                    onChange={(e) => setRoomName(e.target.value)}
                    helperText={submit && roomName === "" && "Name is required"}
                    label="Room name"
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
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => {
                        setSubmit(true);
                        roomName !== "" && setOpen(false) && setRoomName("") && setSubmit(false);
                    }}
                    className={classes.addButton}
                    variant="contained">
                    Add
                </Button>
                <Button
                    autoFocus
                    onClick={() => {
                        setOpen(false);
                        setSubmit(false);
                        setRoomName("");
                    }}
                    variant="contained"
                    color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
