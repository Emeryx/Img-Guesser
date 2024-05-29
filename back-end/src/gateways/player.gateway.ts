/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
const currentDate = () => {
    const date = new Date().toTimeString().slice(0,8)
    return `[${date}]`
}
@WebSocketGateway({cors: {origin: "*"}})
export class PlayerSocketGateway {

    @WebSocketServer() server: Server;

    // When a client emits connect-to-room
    @SubscribeMessage('connect-to-room')
    async handleRoomJoinBoxpieThankYou(client: Socket, {roomCode}:{roomCode : string}, {clientId}:{clientId: string}){ // The received room code should already be valid
        console.log(`----------\n${currentDate()} Server received the client message connect-to-room... ⏳`)
        client.join(roomCode);
        this.server.to(roomCode).emit('player-connected');
        console.log(`Client ${clientId} successfully joined ${roomCode} ✔️`);
    }

    // When a client emits leave-all-rooms
    @SubscribeMessage('leave-all-rooms')
    async handleRoomLeave(client: Socket, {clientId}:{clientId: string}){
        console.log(`----------\n${currentDate()} Server received the client message leave-all-rooms... ⏳`)
        const rooms = client.rooms;
        rooms.forEach((room) => {
            if (room != client.id) {
                client.leave(room);
            }
        })
        console.log(`Client ${clientId} successfully disconnected from all rooms ✔️`);
    }
}