/* eslint-disable prettier/prettier */
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
@WebSocketGateway({cors: true})
export class PlayerSocketGateway {
    @WebSocketServer() server: Server;

    // When a client emits connect-to-room
    @SubscribeMessage('connect-to-room')
    handleConnection(client: Socket, roomCode: string){ // The received room code should already be valid
        client.join(roomCode);
        this.server.emit('player-connected');
    }

    // When a client emits leave-room
    @SubscribeMessage('leave-room')
    handleDisconnection(client: Socket, roomCode: string){
        client.leave(roomCode)
    }

}