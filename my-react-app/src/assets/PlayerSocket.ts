import { Socket, io } from "socket.io-client";

export class playerSocket {

    private socket: Socket;
    
    constructor(backendURL: string = 'http://localhost:3000') {
        this.socket = io(backendURL);
    }

    // Client emitted messages
    handleJoinRoom(roomCode: string){
        this.socket.emit('connect-to-room', {roomCode}) // {roomCode} is a JS shorthand for {roomCode: roomCode}
    }

    handleLeaveRoom(roomCode: string){
        this.socket.emit('leave-room', {roomCode})
    }
    
}