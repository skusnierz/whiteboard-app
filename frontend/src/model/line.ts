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
