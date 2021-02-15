import {
    Button,
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
import React, { useState } from "react";

import { Navbar } from "../Navbar/Navbar";

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: "#2a9df4"
    },
    table: {
        width: "60%",
        marginLeft: "20%",
        marginTop: 100
    }
});

const roomList = [
    { owner: "Maciek", name: "Klasa 5" },
    { owner: "Jacek", name: "Klasa 2" },
    { owner: "Jakub", name: "TEST" }
];

export function MyRooms() {
    const classes = useStyles();
    const [rooms, setRooms] = useState(roomList);

    return (
        <>
            <Navbar />
            <TableContainer className={classes.table}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>L.P.</TableCell>
                            <TableCell style={{ color: "white" }}>Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room, idx) => (
                            <TableRow>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
