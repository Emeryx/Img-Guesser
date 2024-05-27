import { Socket, io } from "socket.io-client";
class PlayerSocket {
    
    backendURL = 'http://localhost:3000'
    private socket: Socket;
    
    constructor() {
        this.socket = io(this.backendURL);
    }

    // Client emitted messages
    handleJoinRoom(roomCode: string){
        console.log('Client emitting connect-to-room...')
        this.socket.emit('connect-to-room', {roomCode}) // {roomCode} is a JS shorthand for {roomCode: roomCode}
    }

    handleLeaveRooms(){
        console.log('Client emitting leave-all-rooms...')
        this.socket.emit('leave-all-rooms')
    }

    getSocket(){
        return this.socket;
    }

}

export const client = new PlayerSocket();