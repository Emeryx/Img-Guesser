/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RetrieveOneGameSessionService } from "src/services/retrieveOneGameSession.service";
import { LeaveGameSessionService } from "src/services/leaveGameSession.service";
import { GameHostFunctions } from "src/services/gameHostFunctions.service";

const currentDate = () => {
    const date = new Date().toTimeString().slice(0,8)
    return `[${date}]`
}
@WebSocketGateway({cors: {origin: "*"}})
export class PlayerSocketGateway {

    constructor(private readonly retrieveOneGameSessionService: RetrieveOneGameSessionService,
        private readonly leaveGameSessionService: LeaveGameSessionService,
        private readonly gameHostFunctions: GameHostFunctions,
    ) {}

    @WebSocketServer() server: Server;

    // When a client emits connect-to-room
    @SubscribeMessage('connect-to-room')
    async handleRoomJoinBoxpieThankYou(client: Socket, payload: {clientId: string; roomCode: string}){ // The received room code should already be valid
        console.log(`----------\n${currentDate()} Server received the client message connect-to-room... ⏳`)
        const {clientId, roomCode} = payload;
        await client.join(roomCode);
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
        console.log(`${currentDate()} Client ${clientId} successfully disconnected from all rooms ✔️`);
    }

    @SubscribeMessage('ready-up')
    async handleReadyUp(client: Socket, payload: {clientId: string; roomCode: string}){
        console.log(`----------\n${currentDate()} Server received the client message ready-up... ⏳`)
        const {clientId, roomCode} = payload;
        await this.retrieveOneGameSessionService.retrieveAndUpdatePlayerReadyState(roomCode, clientId);
        this.server.to(roomCode).emit('player-ready');
        console.log(`${currentDate()} Client ${clientId} successfully finished toggling their ready state ✔️`);
    }

    @SubscribeMessage('leave-game-room')
    async handleOneRoomLeave(client: Socket, payload: {clientId: string, roomCode: string}){
        console.log(`----------\n${currentDate()} Server received the client message leave-game-room... ⏳`)
        const {clientId, roomCode} = payload;
        await this.leaveGameSessionService.leaveGameSession(clientId, roomCode);
        client.leave(roomCode);
        this.server.to(roomCode).emit('player-left');
        console.log(`${currentDate()} Client ${clientId} successfully left room ${roomCode} ✔️`);
    }

    @SubscribeMessage('host-leave-game-room')
    async handleHostLeaveRoom(client: Socket, payload: {clientId: string, roomCode: string}){
        console.log(`----------\n${currentDate()} Server received the client message leave-game-room... ⏳`)
        const {clientId, roomCode} = payload;
        await this.leaveGameSessionService.hostLeaveGameSession(clientId, roomCode);
        this.server.to(roomCode).emit('host-left');
        console.log(`${currentDate()} Client ${clientId} successfully left room ${roomCode} as the host ✔️`);
    }

    @SubscribeMessage('start-game')
    async handleStartGame(client: Socket, payload: {clientId: string, roomCode: string}){
        console.log(`----------\n${currentDate()} Server received the client message start-game... ⏳`)
        const {clientId, roomCode} = payload;
        await this.gameHostFunctions.startGame(clientId, roomCode);
        this.server.to(roomCode).emit('game-started');
        console.log(`${currentDate()} Client ${clientId} successfully started game ${roomCode} ✔️`);
    }
}