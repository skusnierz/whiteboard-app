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

import { Context } from "../../context/appContext";
import { Room } from "../../model/room";
import { apiProvider } from "../../services/api";
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
    const [{ socket }] = useContext(Context);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [apiErrorMessage, setAprErrorMessage] = useState<string>("");

    useEffect(() => {
        socket.on("newRoom", (room: Room) => {
            setRooms([...rooms, room]);
        });
    }, [rooms, socket]);

    useEffect(() => {
        const getRooms = async () => {
            apiProvider
                .getRooms()
                .then((rooms) => setRooms(rooms))
                .catch((err) => setAprErrorMessage(err));
        };

        getRooms();
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
                                    <Button variant="contained" className={classes.joinInButton}>
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
