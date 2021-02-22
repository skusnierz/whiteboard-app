export interface Position {
    x: number;
    y: number;
}

export interface Line {
    user: string;
    startPosition: Position;
    endPosition: Position;
    pointerSize: number;
    color: string;
    roomName: string;
}

export interface Message {
    author: string;
    date: Date;
    message: string;
    roomName: string;
}

export interface Room {
    name: string;
    username: string;
    email: string;
}

export interface User {
    username: string;
    email: string;
    password: string;
}

export interface userLoginInput {
    email: string;
    password: string;
}
