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

@Controller('game-sessions')
export class GameSessionController {
    
    constructor(private readonly gameCreationService: GameCreationService,
        private readonly retrieveGameSessionsService: RetrieveGameSessionsService,
        private readonly retrieveOneGameSessionService: RetrieveOneGameSessionService,
        private readonly joinGameSessionService: JoinGameSessionService,
        private readonly playerNameValidationService: PlayerNameValidationService
    ) {}

    @Post('create') // A POST request to localhost:3000/game-sessions/create triggers this operation 
    // The @Body() decorator allows to extract data from the body of an incoming HTTP request
    async createGameSession (@Body() gameSessionDto: GameSessionDto) {
        console.log('POST /game-sessions/create request received... ⏳')
        const {hostName, hostImage, roundTime, roundAmount} = gameSessionDto;
        await this.playerNameValidationService.validatePlayerName(hostName);
        console.log('POST /game-sessions/create request accepted, New game and host are now in database ✔️')
        return this.gameCreationService.createGameSession(hostName, hostImage, roundTime, roundAmount);
    }

    @Post('join')
    async joinGameSession (@Body() playerJoinDto: PlayerJoinDto){
        console.log('POST /game-sessions/join request received... ⏳')
        const {roomCode, playerDisplayName, randomImage} = playerJoinDto;
        await this.playerNameValidationService.validatePlayerName(playerDisplayName);
        const gameSession: GameSession = await this.retrieveOneGameSessionService.retrieveOneGameSession(roomCode);
        if(!gameSession){
            throw new BadRequestException('Room not found')
        }
        if(gameSession.players.length >=8){
            throw new BadRequestException('Room is full')
        }
        console.log('POST /game-sessions/join request accepted, New player is now in database ✔️')
        return this.joinGameSessionService.joinGameSession(roomCode, playerDisplayName, randomImage);
    }

    @Get('retrieve-all')
    async retrieveGameSessions () {
        console.log('GET /game-sessions/retrieve-all request received... ⏳')
        return this.retrieveGameSessionsService.retrieveGameSessions();
    }

    @Get('retrieve-one')
    async retrieveOneGameSession (@Query('roomCode') roomCode: string) : Promise<GameSession> {
        console.log('GET /game-sessions/retrieve-one request received... ⏳')
        return this.retrieveOneGameSessionService.retrieveOneGameSession(roomCode);
    }

}