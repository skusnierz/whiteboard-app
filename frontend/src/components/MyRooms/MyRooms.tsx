import {
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { Room } from "../../model/model";
import { apiProvider } from "../../services/api";
import { Navbar } from "../Navbar/Navbar";

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: "#2a9df4"
    },

    table: {
        width: "60%",
        marginLeft: "20%",
        marginTop: 100
    },

    error: {
        width: "58.5%",
        marginLeft: "20%",
        marginTop: 10
    }
});

export function MyRooms() {
    const classes = useStyles();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [apiErrorMessage, setAprErrorMessage] = useState<string>("");

    useEffect(() => {
        apiProvider
            .getUserRooms()
            .then((rooms) => setRooms(rooms))
            .catch((err) => setAprErrorMessage(err));
    }, []);

    return (
        <>
            <Navbar />
            <TableContainer className={classes.table}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>L.P.</TableCell>
                            <TableCell style={{ color: "white" }}>Room Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            setRooms(rooms.filter((el) => el.name !== room.name));
                                            apiProvider
                                                .deleteRoom(room.name)
                                                .catch((err) => setAprErrorMessage(err));
                                        }}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {apiErrorMessage !== "" && (
                <Alert severity="error" className={classes.error}>
                    {apiErrorMessage}
                </Alert>
            )}
        </>
    );
}
