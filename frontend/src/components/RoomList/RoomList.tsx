import {
    Table,
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    makeStyles,
    TableBody,
    Button,
    IconButton
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Context } from "../../context/appContext";
import { Room } from "../../model/model";
import { apiProvider } from "../../services/api";
import { socketProvider } from "../../services/socket";
import { Navbar } from "../Navbar/Navbar";
import { NewRoomDialog } from "./NewRoomDialog";

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: "#2a9df4"
    },
    table: {
        width: "80%",
        marginLeft: "10%",
        marginTop: 100
    },
    joinInButton: {
        width: "100%",
        color: "white",
        backgroundColor: "#2a9df4",
        "&:hover, &:focus": {
            backgroundColor: "#187bcd"
        }
    },
    countCell: {
        paddingLeft: 35
    },
    error: {
        width: "78.5%",
        marginLeft: "10%",
        marginTop: 10
    }
});

export function RoomList() {
    const [, dispatch] = useContext(Context);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [apiErrorMessage, setAprErrorMessage] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        socketProvider.socket.on("newRoom", (room: Room) => {
            setRooms([...rooms, room]);
        });

        return () => {
            socketProvider.socket.off("newRoom");
        };
    }, [rooms]);

    useEffect(() => {
        apiProvider
            .getRooms()
            .then((rooms) => setRooms(rooms))
            .catch((err) => setAprErrorMessage(err));
    }, []);

    const classes = useStyles();
    return (
        <>
            <Navbar />
            <TableContainer className={classes.table}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>
                                <IconButton onClick={() => setOpenDialog(true)}>
                                    <Add style={{ color: "white" }} />
                                </IconButton>
                            </TableCell>
                            <TableCell style={{ color: "white" }}>Room Name</TableCell>
                            <TableCell style={{ color: "white" }}>Owner</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room, idx) => (
                            <TableRow key={idx}>
                                <TableCell className={classes.countCell}>{idx + 1}</TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>{room.username}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        className={classes.joinInButton}
                                        onClick={() => {
                                            dispatch({
                                                type: "SET_ROOM_NAME",
                                                roomName: room.name
                                            });
                                            history.push("/white-board");
                                        }}>
                                        Join In
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <NewRoomDialog open={openDialog} setOpen={setOpenDialog} />
            {apiErrorMessage !== "" && (
                <Alert severity="error" className={classes.error}>
                    {apiErrorMessage}
                </Alert>
            )}
        </>
    );
}
