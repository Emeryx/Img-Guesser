/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query, BadRequestException } from "@nestjs/common";
import { GameCreationService } from "src/services/gameSessionCreation.service";
import { GameSessionDto } from "src/dto/gameSession.dto";
import { RetrieveGameSessionsService } from "src/services/retrieveGameSessions.service";
import { RetrieveOneGameSessionService } from "src/services/retrieveOneGameSession.service";
import { GameSession } from "src/schemas/gamesession.schema";
import { JoinGameSessionService } from "src/services/joinGameSession.service";
import { PlayerJoinDto } from "src/dto/playerJoin.dto";
import { PlayerNameValidationService } from "src/services/playerNameValidation.service";
import { PlayerUidValidation } from "src/services/playerUidValidation.service";

const currentDate = () => {
    const date = new Date().toTimeString().slice(0,8)
    return `[${date}]`
}

@Controller('game-sessions')
export class GameSessionController {
    
    constructor(private readonly gameCreationService: GameCreationService,
        private readonly retrieveGameSessionsService: RetrieveGameSessionsService,
        private readonly retrieveOneGameSessionService: RetrieveOneGameSessionService,
        private readonly joinGameSessionService: JoinGameSessionService,
        private readonly playerNameValidationService: PlayerNameValidationService,
        private readonly playerUidValidation: PlayerUidValidation
    ) {}

    @Post('create') // A POST request to localhost:3000/game-sessions/create triggers this operation 
    // The @Body() decorator allows to extract data from the body of an incoming HTTP request
    async createGameSession (@Body() gameSessionDto: GameSessionDto) {
        console.log(currentDate()+' POST /game-sessions/create request received... ⏳')
        const {hostName, hostImage, roundTime, roundAmount, hostUid} = gameSessionDto;
        await this.playerNameValidationService.validatePlayerName(hostName);
        console.log(currentDate()+' POST /game-sessions/create request accepted, New game and host are now in database ✔️')
        return this.gameCreationService.createGameSession(hostName, hostImage, roundTime, roundAmount, hostUid);
    }

    @Post('join')
    async joinGameSession (@Body() playerJoinDto: PlayerJoinDto){
        console.log(currentDate()+' POST /game-sessions/join request received... ⏳')
        const {roomCode, playerDisplayName, randomImage, uid} = playerJoinDto;
        await this.playerNameValidationService.validatePlayerName(playerDisplayName);
        const gameSession: GameSession = await this.retrieveOneGameSessionService.retrieveOneGameSession(roomCode);
        if(!gameSession){
            throw new BadRequestException('Room not found')
        }
        if(gameSession.players.length >=8){
            throw new BadRequestException('Room is full')
        }
        if(gameSession.gameState.lobbyPhase === false){
            throw new BadRequestException('Game is in session')
        }
        const isReconnecting: boolean = await this.playerUidValidation.isReconnecting(uid, gameSession);
        if(isReconnecting){
            console.log(currentDate()+' POST /game-sessions/join request accepted, Returning player reconnected ✔️');
        }
        else{
            this.joinGameSessionService.joinGameSession(roomCode, playerDisplayName, randomImage, uid);
            console.log(currentDate()+' POST /game-sessions/join request accepted, New player is now in database ✔️');
        }
    }

    @Get('retrieve-all')
    async retrieveGameSessions () {
        console.log(currentDate()+' GET /game-sessions/retrieve-all request received... ⏳')
        return this.retrieveGameSessionsService.retrieveGameSessions();
    }

    @Get('retrieve-one')
    async retrieveOneGameSession (@Query('roomCode') roomCode: string) : Promise<GameSession> {
        console.log(currentDate()+' GET /game-sessions/retrieve-one request received... ⏳')
        return this.retrieveOneGameSessionService.retrieveOneGameSession(roomCode);
    }

}