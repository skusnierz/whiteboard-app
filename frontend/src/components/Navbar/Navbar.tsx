import { makeStyles, Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/appContext";

const useStyles = makeStyles({
    button: {
        marginLeft: 20
    }
});

export function Navbar() {
    const classes = useStyles();
    const [, dispatch] = useContext(Context);
    const history = useHistory();
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" onClick={() => history.push("/room-list")}>
                    All Rooms
                </Button>
                <Button color="inherit" className={classes.button}>
                    My Rooms
                </Button>
                <Button
                    color="inherit"
                    onClick={() => {
                        dispatch({ type: "LOGOUT" });
                        history.push("/");
                    }}
                    className={classes.button}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
