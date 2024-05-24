/* eslint-disable prettier/prettier */
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
@WebSocketGateway()
export class PlayerSocketGateway {
    @WebSocketServer() server: Server;

    // When a client emits connect-to-room
    @SubscribeMessage('connect-to-room')
    handleConnection(@MessageBody() roomCode: string, @ConnectedSocket() client: Socket){ // The received room code should already be valid
        client.join(roomCode);
    }

    // When a client emits leave-room
    @SubscribeMessage('leave-room')
    handleDisconnection(@MessageBody() roomCode: string, @ConnectedSocket() client: Socket){
        client.leave(roomCode)
    }
    
}