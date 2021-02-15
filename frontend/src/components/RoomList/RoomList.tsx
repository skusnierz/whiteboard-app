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
import React, { useState } from "react";

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
    }
});

const roomList = [
    { owner: "Maciek", name: "Klasa 5" },
    { owner: "Jacek", name: "Klasa 2" },
    { owner: "Jakub", name: "TEST" }
];

export function RoomList() {
    const [rooms, setRooms] = useState(roomList);
    const [openDialog, setOpenDialog] = useState(false);

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
                            <TableRow>
                                <TableCell className={classes.countCell}>{idx + 1}</TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>{room.owner}</TableCell>
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
        </>
    );
}
