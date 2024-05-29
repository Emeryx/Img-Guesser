import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
class PlayerSocket {
    
    backendURL = 'http://localhost:3000'
    private socket: Socket;
    private clientId: string;

    constructor() {
        this.clientId = this.retrieveClientId();
        this.socket = io(this.backendURL, {
            query: {clientId: this.clientId}
        });
    }

    private generateClientId = () => {
        const clientId = uuidv4();
        localStorage.setItem('ClientId', clientId);
        return clientId;
    }

    private retrieveClientId = () => {
        const clientId = localStorage.getItem('ClientId');
        if(clientId){
            return clientId;
        }
        else return this.generateClientId();
    }

    // Client emitted messages
    handleJoinRoom(roomCode: string){
        console.log('Client emitting connect-to-room...')
        this.socket.emit('connect-to-room', {clientId: this.clientId, roomCode: roomCode}) // {roomCode} is a JS shorthand for {roomCode: roomCode}
    }

    handleLeaveRooms(){
        console.log('Client emitting leave-all-rooms...')
        this.socket.emit('leave-all-rooms', {clientId: this.clientId})
    }

    getSocket(){
        return this.socket;
    }

    getSocketId(){
        return this.clientId;
    }

}

export const client = new PlayerSocket();