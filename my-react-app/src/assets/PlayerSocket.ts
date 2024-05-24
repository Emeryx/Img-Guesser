import { Socket, io } from "socket.io-client";
export class playerSocket {
    
    backendURL = 'http://localhost:3000'
    private socket: Socket;
    
    constructor() {
        this.socket = io(this.backendURL);
    }

    // Client emitted messages
    handleJoinRoom(roomCode: string){
        this.socket.emit('connect-to-room', {roomCode}) // {roomCode} is a JS shorthand for {roomCode: roomCode}
    }

    handleLeaveRoom(roomCode: string){
        this.socket.emit('leave-room', {roomCode})
    }
    
}